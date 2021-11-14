require 'rails_helper'

RSpec.describe 'Sentences', type: :request do
  subject do
    post graphql_path(format: :json), params: { query: query, variables: variables }
    JSON.parse(response.body)['data']
  end

  let(:section) { create(:section) }
  let(:sentence) { create(:sentence, section: section) }
  let!(:word) { create(:word, sentence: sentence) }
  let(:json_response) do
    {
      'sentences' => {
        'currentUser' => nil,
        'pageInfo' => {
          'currentPage' => 1,
          'totalPages' => 1
        },
        'sentences' => [
          {
            'id' => sentence.id.to_param,
            'sectionId' => sentence.section_id,
            'english' => sentence.english,
            'japanese' => sentence.japanese,
            'words' => [
              {
                'id' => word.id.to_param,
                'english' => word.english,
                'japanese' => word.japanese
              }
            ]
          }
        ]
      }
    }
  end

  it { is_expected.to include json_response }

  context 'when a user with his/her list logs in' do
    let(:user) { create(:user) }
    let!(:my_list) { create(:my_list, user: user) }
    let(:json_response_with_user) do
      {
        'sentences' => {
          'currentUser' => {
            'id' => user.id.to_param,
            'email' => user.email,
            'myLists' => [
              {
                'id' => my_list.id.to_param,
                'name' => my_list.name
              }
            ]
          },
          'pageInfo' => {
            'currentPage' => 1,
            'totalPages' => 1
          },
          'sentences' => [
            {
              'id' => sentence.id.to_param,
              'sectionId' => sentence.section_id,
              'english' => sentence.english,
              'japanese' => sentence.japanese,
              'words' => [
                {
                  'id' => word.id.to_param,
                  'english' => word.english,
                  'japanese' => word.japanese
                }
              ]
            }
          ]
        }
      }
    end

    before { sign_in user }
    it { is_expected.to include json_response_with_user }
  end

  private

  def query
    <<~GQL
      query allSentences($attributes: SentenceSearchAttributes!) {
        sentences(attributes: $attributes) {
          currentUser {
            id
            email
            myLists {
              id
              name
            }
          }
          pageInfo {
            currentPage
            totalPages
          }
          sentences {
            id
            sectionId
            english
            japanese
            words {
              id
              japanese
              english
            }
          }
        }
      }
    GQL
  end

  def variables
    {
      attributes: {
        currentPage: 1,
        idMin: sentence.id,
        idMax: sentence.id,
        sectionIdMin: nil,
        sectionIdMax: nil,
        keywords: nil
      }
    }.to_json
  end
end
