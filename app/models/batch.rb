class Batch < ApplicationRecord
  PERCENTAGE = 10

  def bid
    return false unless self.open?
    self.bid_count += 1
    self.current_bid += calc_percent_bid
    self.status = get_status

    save
  end

  def open?
    self.status == 'open'
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
