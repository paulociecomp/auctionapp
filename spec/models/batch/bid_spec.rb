require 'rails_helper'

describe Batch, '#bid' do
  describe 'increments 10% of current price' do
    let(:batch) { create(:batch) }

    context 'when bid count is 1' do
      before do
        batch.bid
      end

      it { expect(batch.current_bid).to eq 11.0 }
    end

    context 'when bid count is 2' do
      before do
        2.times { batch.bid }
      end

      it { expect(batch.current_bid).to eq 12.1 }
    end
  end

  describe 'exceeds the minimum finish bid' do
    context 'when current bid is less than finish bid' do
      let(:batch) { create(:batch, finish_bid: 20.0, current_bid: 19.5) }

      before do
        batch.bid
      end

      it { expect(batch.status).to eq 'sold' }
      it { expect(batch.current_bid).to eq 21.45 }
    end

    context 'when current bid is greater or equal to the finish bid' do
      let!(:batch) { create(:batch, finish_bid: 20.0, current_bid: 21.45, status: 'sold') }

      it { expect(batch.bid).to be false }
      it { expect(batch.current_bid).to eq 21.45 }
    end
  end
end
