class Sentence < ApplicationRecord
  belongs_to :section
  has_many :words, dependent: :destroy
  validates :english, presence: true
  validates :japanese, presence: true

  scope :filter_by_section_id, lambda { |min, max|
    if min.present? && max.present?
      where(section_id: min..max)
    elsif min.present?
      where(section_id: min..nil)
    elsif max.present?
      where(section_id: nil..max)
    end
  }

  scope :filter_by_id, lambda { |min, max|
    if min.present? && max.present?
      where(id: min..max)
    elsif min.present?
      where(id: min..nil)
    elsif max.present?
      where(id: nil..max)
    end
  }

  scope :filter_by_keywords, lambda { |keywords|
    if keywords.present?
      each_keyword = keywords.split
      columns = [
        'sentences.english',
        'sentences.japanese',
        'words.english',
        'words.japanese'
      ]

      # キーワード数に応じて可変長配列にする
      queries = columns.map { |column| (["#{column} LIKE ?"] * each_keyword.length).join(' OR ') }
      first_where = eager_load(:words).where(queries[0], *each_keyword.map { |word| "%#{word}%" })
      queries.drop(1).inject(first_where) do |self_object, query|
        self_object.or(eager_load(:words).where(query, *each_keyword.map { |word| "%#{word}%" }))
      end
    end
  }

  scope :filter_by_my_list_id, lambda { |my_list_id|
    where(id: MyList.find(my_list_id).sentences.ids) unless my_list_id.zero?
  }
end
