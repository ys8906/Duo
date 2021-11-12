require 'rails_helper'

RSpec.describe 'Sentences', type: :request do
  subject do
    post graphql_path, params: { query: query, variables: variables }
    JSON.parse(response.body)['data']
  end

  let(:section) { create(:section) }
  let(:sentence) { create(:sentence, section: section) }
  let!(:word) { create(:word, sentence: sentence) }
  let(:json_response) do
    {
      'sentences' => [
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
      ]
    }
  end

  it { is_expected.to include json_response }

  private

  def query
    <<~GQL
      query allSentences($attributes: SentenceSearchAttributes!) {
        sentences(attributes: $attributes) {
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
    GQL
  end

  def variables
    {
      attributes: {
        idMin: sentence.id,
        idMax: sentence.id,
        sectionIdMin: '',
        sectionIdMax: '',
        keywords: ''
      }
    }
  end
end
