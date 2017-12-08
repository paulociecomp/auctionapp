FactoryBot.define do
  factory :batch do
    description "awesome batch"
    product "awesome product"
    initial_bid 10.0
    finish_bid 100.0
    bid_count 0
    current_bid 10.0
    status 'open'
  end
end
