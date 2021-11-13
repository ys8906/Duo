require 'rails_helper'

RSpec.describe User, type: :model do
  it 'creates' do
    expect { create(:user) }.to change(described_class, :count).by(1)
  end

  it 'is invalid without name' do
    model = build_stubbed(:user, name: nil)
    expect(model).to be_invalid
  end

  it 'is invalid without email' do
    model = build_stubbed(:user, email: nil)
    expect(model).to be_invalid
  end

  it 'is invalid without password' do
    model = build_stubbed(:user, password: nil)
    expect(model).to be_invalid
  end

  it 'is invalid without password_confirmation' do
    model = build_stubbed(:user, password_confirmation: nil)
    expect(model).to be_invalid
  end
end
