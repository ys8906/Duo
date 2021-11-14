module Types
  class MutationType < Types::BaseObject
    description 'Mutation'

    field :create_my_list, description: 'create_my_list', mutation: Mutations::CreateMyList
    field :create_my_list_sentence, description: 'create_my_list_sentence', mutation: Mutations::CreateMyListSentence
    field :delete_my_list, description: 'delete_my_list', mutation: Mutations::DeleteMyList
    field :delete_my_list_sentence, description: 'delete_my_list_sentence', mutation: Mutations::DeleteMyListSentence
  end
end
