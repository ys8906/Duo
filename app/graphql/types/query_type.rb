module Types
  class QueryType < Types::BaseObject
    description 'Query'

    field :sentences, [Types::Objects::SentenceType], 'Returns all sentences', null: false
    def sentences
      Sentence.preload(:words)
    end
  end
end
