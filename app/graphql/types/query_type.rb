module Types
  class QueryType < Types::BaseObject
    description 'Query'

    field :sentences, Types::Objects::SentencesType, null: false do
      description 'Sentence index page'
      argument :attributes, Types::Inputs::SentenceSearchAttributes, 'Filering with the search box', required: true
    end

    # なぜキーワード引数が必要なのか？
    def sentences(attributes:)
      result = Sentence.preload(:words)
                       .filter_by_section_id(attributes[:section_id_min], attributes[:section_id_max])
                       .filter_by_id(attributes[:id_min], attributes[:id_max])
                       .filter_by_keywords(attributes[:keywords])
                       .page(attributes[:current_page])
      {
        current_user: context[:current_user],
        page_info: page_info(result),
        sentences: result,
      }
    end

    private

    def page_info(result)
      {
        total_pages: result.total_pages,
        current_page: result.current_page
      }
    end
  end
end
