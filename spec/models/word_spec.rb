require 'rails_helper'

RSpec.describe Word, type: :model do
  let(:section) { create(:section) }
  let(:sentence) { create(:sentence, section: section) }

  it 'creates' do
    expect { create(:word, sentence: sentence) }.to change(described_class, :count).by(1)
  end

  it 'is invalid without sentence_id' do
    word = build_stubbed(:word)
    expect(word).to be_invalid
  end

  it 'is invalid without english' do
    word = build_stubbed(:word, english: nil)
    expect(word).to be_invalid
  end

  it 'is invalid without japanese' do
    word = build_stubbed(:word, japanese: nil)
    expect(word).to be_invalid
  end
end
