require 'rails_helper'

RSpec.describe Section, type: :model do
  it 'creates' do
    expect { create(:section) }.to change(described_class, :count).by(1)
  end
end
