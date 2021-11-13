require 'rails_helper'

RSpec.describe Word, type: :model do
  let(:section) { create(:section) }
  let(:sentence) { create(:sentence, section: section) }

  it 'creates' do
    expect { create(:word, sentence: sentence) }.to change(described_class, :count).by(1)
  end

  it 'is invalid without sentence_id' do
    model = build_stubbed(:word)
    expect(model).to be_invalid
  end

  it 'is invalid without english' do
    model = build_stubbed(:word, english: nil)
    expect(model).to be_invalid
  end

  it 'is invalid without japanese' do
    model = build_stubbed(:word, japanese: nil)
    expect(model).to be_invalid
  end
end
