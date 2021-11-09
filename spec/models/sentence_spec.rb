require 'rails_helper'

RSpec.describe Sentence, type: :model do
  let(:section) { create(:section) }

  it 'creates' do
    expect { create(:sentence, section: section) }.to change(described_class, :count).by(1)
  end

  it 'is invalid without section_id' do
    sentence = build_stubbed(:sentence)
    expect(sentence).to be_invalid
  end

  it 'is invalid without english' do
    sentence = build_stubbed(:sentence, english: nil)
    expect(sentence).to be_invalid
  end

  it 'is invalid without japanese' do
    sentence = build_stubbed(:sentence, japanese: nil)
    expect(sentence).to be_invalid
  end
end
