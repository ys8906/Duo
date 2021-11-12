module Types
  module Inputs
    class SentenceSearchAttributes < Types::BaseInputObject
      description 'Attributes for filtering and sorting sentences'

      argument :id_max, String, 'id_max', required: false
      argument :id_min, String, 'id_min', required: false
      argument :keywords, String, 'keywords', required: false
      argument :section_id_max, String, 'section_id_max', required: false
      argument :section_id_min, String, 'section_id_min', required: false
    end
  end
end
