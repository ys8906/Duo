module Types
  class QueryType < Types::BaseObject
    description 'Query'

    field :books, [Types::BookType], 'Returns all books', null: false
    def books
      Book.all
    end
  end
end
