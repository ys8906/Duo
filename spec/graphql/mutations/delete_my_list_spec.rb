require 'rails_helper'

RSpec.describe 'CreateMyList', type: :request do
  subject do
    post graphql_path(format: :json), params: { query: query, variables: variables }
    JSON.parse(response.body)['data']
  end

  let(:user) { create(:user) }
  let(:section) { create(:section) }
  let(:sentence) { create(:sentence, section: section) }
  let(:word) { create(:word, sentence: sentence) }
  let!(:my_list) { create(:my_list, user: user) }
  let!(:my_list_count) { user.my_lists.count }
  let(:json_response) do
    {
      'deleteMyList' => nil
    }
  end

  before { sign_in user }

  it 'deletes my_list' do
    expect(subject).to include json_response
    expect(user.my_lists.count).to eq my_list_count - 1
  end

  private

  def query
    <<~GQL
      mutation DeleteMyList($input: DeleteMyListInput!) {
        deleteMyList(input: $input) {
          myList {
            id
          }
        }
      }
    GQL
  end

  def variables
    {
      'input' => {
        'id' => my_list.id.to_param
      }
    }.to_json
  end
end
