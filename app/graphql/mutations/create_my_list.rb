module Mutations
  class CreateMyList < Mutations::BaseMutation
    description 'CreateMyList'

    argument :name, String, 'Creating my list', required: true

    field :errors, [String], description: 'errors', null: false
    field :my_list, Types::Objects::MyListType, 'my_list', null: true

    def resolve(name:)
      my_list = context[:current_user].my_lists.build(name: name)
      if my_list.save
        {
          my_list: my_list,
          errors: []
        }
      else
        {
          my_list: nil,
          errors: my_list.errors.full_messages
        }
      end
    end
  end
end
