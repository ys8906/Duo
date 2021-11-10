class Section < ApplicationRecord
  has_many :sentences, dependent: :destroy
end
