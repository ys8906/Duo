FactoryBot.define do
  factory :sentence do
    section { nil }
    sequence(:english) { |n| "sentence_english_#{n}" }
    sequence(:japanese) { |n| "sentence_japanese_#{n}" }
  end
end
