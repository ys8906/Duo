module Mutations
  class DeleteMyList < Mutations::BaseMutation
    description 'DeleteMyList'

    argument :id, ID, 'Deleting my list', required: true

    field :errors, [String], 'errors', null: false
    field :my_list, Types::Objects::MyListType, 'my_list', null: true

    def resolve(id:)
      my_list = context[:current_user].my_lists.find(id)
      if my_list.destroy
        {
          my_list: nil,
          errors: []
        }
      else
        {
          my_list: my_list,
          errors: my_list.errors.full_messages
        }
      end
    end
  end
end
