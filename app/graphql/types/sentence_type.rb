module Types
  class SentenceType < Types::BaseObject
    description 'Sentence'

    field :created_at, GraphQL::Types::ISO8601DateTime, 'created_at', null: false
    field :english, String, 'Sentence in English', null: false
    field :id, ID, 'id', null: false
    field :japanese, String, 'Sentence in Japanese', null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, 'updated_at', null: false
  end
end
