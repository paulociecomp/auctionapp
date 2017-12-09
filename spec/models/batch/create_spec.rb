require 'rails_helper'

describe Batch, '#build' do
  let(:batch_params) { attributes_for(:batch, initial_bid: 100.0, ) }

  before do
    @batch = Batch.build(batch_params)
  end

  it { expect(@batch.current_bid).to eq 100.0 }

  it{ expect(@batch.bid_count).to eq 0 }

  it{ expect(@batch).to be_open }
end
