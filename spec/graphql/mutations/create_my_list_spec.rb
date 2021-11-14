require 'rails_helper'

RSpec.describe 'CreateMyList', type: :request do
  subject do
    post graphql_path(format: :json), params: { query: query, variables: variables }
    JSON.parse(response.body)['data']
  end

  let(:user) { create(:user) }
  let(:section) { create(:section) }
  let(:sentence) { create(:sentence, section: section) }
  let!(:word) { create(:word, sentence: sentence) }
  let(:name) { 'my_list_name' }
  let(:json_response) do
    {
      'createMyList' => {
        'myList' => {
          'id' => MyList.last.id.to_param,
          'name' => name
        }
      }
    }
  end

  before { sign_in user }
  it { is_expected.to include json_response }

  private

  def query
    <<~GQL
      mutation CreateMyList($input: CreateMyListInput!) {
        createMyList(input: $input) {
          myList {
            id
            name
          }
        }
      }
    GQL
  end

  def variables
    {
      'input' => {
        'name' => name
      }
    }.to_json
  end
end
