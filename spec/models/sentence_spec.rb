require 'rails_helper'

RSpec.describe Sentence, type: :model do
  it 'creates' do
    expect { create(:sentence, section: Section.first) }.to change(described_class, :count).by(1)
  end

  it 'is invalid without section_id' do
    model = build_stubbed(:sentence)
    expect(model).to be_invalid
  end

  it 'is invalid without english' do
    model = build_stubbed(:sentence, english: nil)
    expect(model).to be_invalid
  end

  it 'is invalid without japanese' do
    model = build_stubbed(:sentence, japanese: nil)
    expect(model).to be_invalid
  end

  describe 'scope' do
    context 'with filter_by_section_id' do
      subject { described_class.filter_by_section_id(min, max).count }

      let(:min) { nil }
      let(:max) { nil }

      it { is_expected.to eq described_class.count }

      context 'with min' do
        let(:min) { 2 }

        it { is_expected.to eq described_class.where(section_id: min..nil).count }
      end

      context 'with max' do
        let(:max) { 2 }

        it { is_expected.to eq described_class.where(section_id: nil..max).count }
      end

      context 'with min and max' do
        let(:min) { 2 }
        let(:max) { 4 }

        it { is_expected.to eq described_class.where(section_id: min..max).count }
      end
    end

    context 'with filter_by_id' do
      subject { described_class.filter_by_id(min, max).count }

      let(:min) { nil }
      let(:max) { nil }

      it { is_expected.to eq described_class.count }

      context 'with min' do
        let(:min) { 2 }

        it { is_expected.to eq described_class.where(id: min..nil).count }
      end

      context 'with max' do
        let(:max) { 2 }

        it { is_expected.to eq described_class.where(id: nil..max).count }
      end

      context 'with min and max' do
        let(:min) { 2 }
        let(:max) { 2 }

        it { is_expected.to eq described_class.where(id: min..max).count }
      end
    end

    context 'with filter_by_keywords' do
      subject { described_class.filter_by_keywords(keywords).count }

      let(:keywords) { nil }

      it { is_expected.to eq described_class.count }

      context 'with Sentence.first.english' do
        let(:keywords) { Sentence.first.english.split.first }

        it { is_expected.to eq Sentence.where('sentences.english LIKE ?', "%#{keywords}%").count }
      end

      context 'with Sentence.first.japanese' do
        let(:keywords) { Sentence.first.japanese.split.first }

        it { is_expected.to eq Sentence.where('sentences.japanese LIKE ?', "%#{keywords}%").count }
      end

      context 'with Word.first.english' do
        let(:keywords) { Word.first.english }

        it { is_expected.to eq Sentence.joins(:words).where('words.english LIKE ?', "%#{keywords}%").count }
      end

      context 'with Word.first.japanese' do
        let(:keywords) { Word.first.japanese }

        it { is_expected.to eq Sentence.joins(:words).where('words.japanese LIKE ?', "%#{keywords}%").count }
      end

      context 'with Word.first.japanese and Word.last.japanese' do
        let(:keywords) { "#{Word.first.japanese} #{Word.last.japanese}" }

        it { is_expected.to eq 2 }
      end
    end
  end
end
