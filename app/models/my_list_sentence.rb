class MyListSentence < ApplicationRecord
  belongs_to :my_list
  belongs_to :sentence

  validates :my_list_id, presence: true
  validates :sentence_id, presence: true
end
