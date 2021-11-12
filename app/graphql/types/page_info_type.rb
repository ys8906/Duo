module Types
  class PageInfoType < Types::BaseObject
    description 'Pagination data'

    field :current_page, Int, 'Kaminari method current_page', null: false
    field :total_pages, Int, 'Kaminari method total_pages', null: false
  end
end
