class Word < ApplicationRecord
  belongs_to :sentence
  validates :english, presence: true
  validates :japanese, presence: true
end
