module Types
  module Objects
    class MyListType < Types::BaseObject
      description 'My list for sentences'
  
      field :id, ID, 'My list ID', null: false
      field :name, String, 'My list name', null: false
    end
  end
end
