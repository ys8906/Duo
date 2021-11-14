require 'rails_helper'

RSpec.describe 'CreateMyList', type: :request do
  subject do
    post graphql_path(format: :json), params: { query: query, variables: variables }
    JSON.parse(response.body)['data']
  end

  let(:user) { create(:user) }
  let(:section) { create(:section) }
  let(:sentence) { create(:sentence, section: section) }
  let(:my_list) { create(:my_list, user: user) }
  let!(:my_list_sentence) { create(:my_list_sentence, my_list: my_list, sentence: sentence) }
  let!(:my_list_sentence_count) { user.my_lists.count }
  let(:json_response) do
    {
      'deleteMyListSentence' => {
        'myListSentence' => nil
      }
    }
  end

  before { sign_in user }

  it 'deletes my_list' do
    expect(subject).to include json_response
    expect(my_list.my_list_sentences.count).to eq my_list_sentence_count - 1
  end

  private

  def query
    <<~GQL
      mutation DeleteMyListSentence($input: DeleteMyListSentenceInput!) {
        deleteMyListSentence(input: $input) {
          myListSentence {
            id
          }
        }
      }
    GQL
  end

  def variables
    {
      'input' => {
        'sentenceId' => sentence.id.to_param,
        'myListId' => my_list.id.to_param
      }
    }.to_json
  end
end
