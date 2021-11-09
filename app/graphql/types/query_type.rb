module Types
  class QueryType < Types::BaseObject
    description 'Query'

    field :sentences, [Types::SentenceType], 'Returns all sentences', null: false
    def sentences
      Sentence.all
    end
  end
end
