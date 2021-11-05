require 'rails_helper'

RSpec.describe Book, type: :model do
  it 'creates' do
    expect { create(:book) }.to change(described_class, :count).by(1)
  end
end
