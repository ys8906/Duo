module Types
  module Inputs
    class SentenceSearchAttributes < Types::BaseInputObject
      description 'Attributes for filtering and sorting sentences'

      argument :current_page, Int, 'current_page', required: false
      argument :id_max, Int, 'id_max', required: false
      argument :id_min, Int, 'id_min', required: false
      argument :keywords, String, 'keywords', required: false
      argument :section_id_max, Int, 'section_id_max', required: false
      argument :section_id_min, Int, 'section_id_min', required: false
    end
  end
end
