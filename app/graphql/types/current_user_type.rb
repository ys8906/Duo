module Types
  class CurrentUserType < Types::BaseObject
    description 'Current user data'

    field :id, ID, 'User ID', null: false
    field :email, String, 'User email', null: false
    field :my_lists, [Types::Objects::MyListType], 'My lists', null: true
  end
end
