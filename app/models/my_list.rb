class MyList < ApplicationRecord
  belongs_to :user
  has_many :my_list_sentences, dependent: :destroy
  has_many :sentences, through: :my_list_sentences

  validates :name, presence: true
  validates :user_id, presence: true
end
