class Batch < ApplicationRecord
  include ConvertDecimalAttributes
  include BatchStatus

  convert_decimal :initial_bid
  convert_decimal :finish_bid

  PERCENTAGE = 10

  def bid
    return false unless self.open?
    self.bid_count += 1
    self.current_bid += calc_percent_bid
    self.status = get_status

    save
  end

  def self.build(batch_params)
    batch = Batch.new batch_params
    batch.current_bid = batch.initial_bid
    batch.bid_count = 0
    batch.status = :open
    batch
  end

  private

  def calc_percent_bid
    self.current_bid * PERCENTAGE / 100
  end

  def get_status
    if self.current_bid >= self.finish_bid
      'sold'
    else
      'open'
    end
  end
end
