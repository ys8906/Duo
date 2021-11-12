module Types
  class QueryType < Types::BaseObject
    description 'Query'

    field :sentences, [Types::Objects::SentenceType], null: false do
      description 'Sentence index page'
      argument :attributes, Types::Inputs::SentenceSearchAttributes, 'Filering with the search box', required: true
    end

    # なぜキーワード引数が必要なのか？
    def sentences(attributes:)
      Sentence.preload(:words)
              .filter_by_section_id(attributes[:section_id_min], attributes[:section_id_max])
              .filter_by_id(attributes[:id_min], attributes[:id_max])
              .filter_by_keywords(attributes[:keywords])
    end
  end
end
