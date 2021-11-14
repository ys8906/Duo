require 'rails_helper'

RSpec.describe MyListSentence, type: :model do
  let(:user) { create(:user) }
  let(:my_list) { create(:my_list, user: user) }
  let(:section) { create(:section) }
  let(:sentence) { create(:sentence, section: section) }

  it 'creates' do
    expect { create(:my_list_sentence, my_list: my_list, sentence: sentence) }.to change(described_class, :count).by(1)
  end

  it 'is invalid without user_id' do
    model = build_stubbed(:my_list_sentence, my_list: nil)
    expect(model).to be_invalid
  end

  it 'is invalid without sentence_id' do
    model = build_stubbed(:my_list_sentence, sentence: nil)
    expect(model).to be_invalid
  end
end
