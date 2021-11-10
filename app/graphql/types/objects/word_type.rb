module Types
  module Objects
    class WordType < Types::BaseObject
      description 'Word'

      field :created_at, GraphQL::Types::ISO8601DateTime, 'created_at', null: false
      field :english, String, 'Word in English', null: false
      field :id, ID, 'id', null: false
      field :japanese, String, 'Word in Japanese', null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, 'updated_at', null: false
    end
  end
end
