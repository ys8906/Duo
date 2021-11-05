module Types
  class BookType < Types::BaseObject
    description 'Books'

    field :created_at, GraphQL::Types::ISO8601DateTime, 'created_at', null: false
    field :id, ID, 'id', null: false
    field :title, String, 'title', null: true
    field :updated_at, GraphQL::Types::ISO8601DateTime, 'updated_at', null: false
  end
end
