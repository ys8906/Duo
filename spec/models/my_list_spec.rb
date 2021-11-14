require 'rails_helper'

RSpec.describe MyList, type: :model do
  let(:user) { create(:user) }

  it 'creates' do
    expect { create(:my_list, user: user) }.to change(described_class, :count).by(1)
  end

  it 'is invalid without user_id' do
    model = build_stubbed(:my_list, user: nil)
    expect(model).to be_invalid
  end

  it 'is invalid without name' do
    model = build_stubbed(:my_list, name: nil)
    expect(model).to be_invalid
  end
end
