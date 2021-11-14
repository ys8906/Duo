module Types
  module Objects
    class SentencesType < Types::BaseObject
      description 'Sentence'

      field :current_user, Types::CurrentUserType, 'Current user data', null: true
      field :page_info, Types::PageInfoType, 'Pagination data', null: true
      field :sentences, [Types::Objects::SentenceType], 'Sentences', null: false
    end
  end
end
