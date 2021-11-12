FactoryBot.define do
  factory :word do
    sentence { nil }
    sequence(:english) { |n| "word_english_#{n}" }
    sequence(:japanese) { |n| "word_japanese_#{n}" }
  end
end
