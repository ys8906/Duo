module Types
  module Objects
    class SentenceType < Types::BaseObject
      description 'Sentence'

      field :created_at, GraphQL::Types::ISO8601DateTime, 'created_at', null: false
      field :english, String, 'Sentence in English', null: false
      field :id, ID, 'id', null: false
      field :japanese, String, 'Sentence in Japanese', null: false
      field :section_id, Int, 'Section id', null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, 'updated_at', null: false
      field :words, [Types::Objects::WordType], 'Words in the sentence', null: false
    end
  end
end
