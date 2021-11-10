class Sentence < ApplicationRecord
  belongs_to :section
  has_many :words, dependent: :destroy
  validates :english, presence: true
  validates :japanese, presence: true
end
