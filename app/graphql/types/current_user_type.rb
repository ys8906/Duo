module Types
  class CurrentUserType < Types::BaseObject
    description 'Current user data'

    field :email, String, 'User email', null: false
    field :id, ID, 'User ID', null: false
    field :my_lists, [Types::Objects::MyListType], 'My lists', null: true
  end
end
