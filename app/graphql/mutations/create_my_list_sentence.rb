module Mutations
  class CreateMyListSentence < Mutations::BaseMutation
    description 'CreateMyListSentence'

    argument :my_list_id, ID, 'my_list_id', required: true
    argument :sentence_id, ID, 'sentence_id', required: true

    field :errors, [String], 'errors', null: false
    field :my_list_sentence, Types::Objects::MyListSentenceType, 'my_list_sentence', null: false

    def resolve(my_list_id:, sentence_id:)
      my_list_sentence = context[:current_user].my_lists.find(
        my_list_id
      ).my_list_sentences.build(
        sentence_id: sentence_id
      )

      if my_list_sentence.save
        {
          my_list_sentence: my_list_sentence,
          errors: []
        }
      else
        {
          my_list_sentence: nil,
          errors: my_list_sentence.errors.full_messages
        }
      end
    end
  end
end
