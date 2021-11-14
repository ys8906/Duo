FactoryBot.define do
  factory :my_list do
    user { nil }
    sequence(:name) { |n| "name_#{n}" }
  end
end
