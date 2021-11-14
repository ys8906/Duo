module Types
  module Inputs
    class CreateMyListInput < Types::BaseInputObject
      description 'Attributes for creating and editing my_list'

      argument :name, String, 'my_list name', required: false
    end
  end
end
