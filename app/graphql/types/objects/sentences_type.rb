module Types
  module Objects
    class SentencesType < Types::BaseObject
      description 'Sentence'

      field :page_info, Types::PageInfoType, 'Pagination data', null: true
      field :sentences, [Types::Objects::SentenceType], 'Sentences', null: false
    end
  end
end
