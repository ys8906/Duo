module Mutations
  class DeleteMyListSentence < Mutations::BaseMutation
    description 'DeleteMyListSentence'

    argument :my_list_id, ID, 'my_list_id', required: true
    argument :sentence_id, ID, 'sentence_id', required: true

    field :errors, [String], 'errors', null: false
    field :my_list_sentence, Types::Objects::MyListSentenceType, 'my_list_sentence', null: true

    def resolve(my_list_id:, sentence_id:)
      my_list_sentence = MyListSentence.find_by!(my_list_id: my_list_id, sentence_id: sentence_id)
      if my_list_sentence.destroy
        {
          my_list_sentence: nil,
          errors: []
        }
      else
        {
          my_list_sentence: my_list_sentence,
          errors: my_list_sentence.errors.full_messages
        }
      end
    end
  end
end
