require 'rails_helper'

RSpec.describe 'CreateMyListSentence', type: :request do
  subject do
    post graphql_path(format: :json), params: { query: query, variables: variables }
    JSON.parse(response.body)['data']
  end

  let(:user) { create(:user) }
  let(:section) { create(:section) }
  let(:sentence) { create(:sentence, section: section) }
  let(:my_list) { create(:my_list, user: user) }
  let(:json_response) do
    {
      'createMyListSentence' => {
        'myListSentence' => {
          'id' => MyListSentence.last.id.to_param,
          'myListId' => MyListSentence.last.my_list_id.to_param,
          'sentenceId' => MyListSentence.last.sentence_id.to_param
        }
      }
    }
  end

  before { sign_in user }
  it { is_expected.to include json_response }

  private

  def query
    <<~GQL
      mutation CreateMyListSentence($input: CreateMyListSentenceInput!) {
        createMyListSentence(input: $input) {
          myListSentence {
            id
            sentenceId
            myListId
          }
        }
      }
    GQL
  end

  def variables
    {
      'input' => {
        'myListId' => my_list.id,
        'sentenceId' => sentence.id
      }
    }.to_json
  end
end
