module Types
  module Objects
    class SectionType < Types::BaseObject
      description 'Section'

      field :created_at, GraphQL::Types::ISO8601DateTime, 'created_at', null: false
      field :id, ID, 'id', null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, 'updated_at', null: false
    end
  end
end
