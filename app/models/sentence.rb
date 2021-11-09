class Sentence < ApplicationRecord
  belongs_to :section
  validates :english, presence: true
  validates :japanese, presence: true
end
