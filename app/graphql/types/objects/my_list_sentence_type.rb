module Types
  module Objects
    class MyListSentenceType < Types::BaseObject
      description 'Each sentence of my list'

      field :id, ID, 'ID', null: false
      field :my_list_id, ID, 'ID', null: false
      field :sentence_id, ID, 'ID', null: false
    end
  end
end
