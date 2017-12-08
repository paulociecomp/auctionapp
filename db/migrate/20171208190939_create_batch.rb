class CreateBatch < ActiveRecord::Migration[5.1]
  def change
    create_table :batches do |t|
      t.string  :description
      t.string  :product
      t.decimal :initial_bid, precision: 10, scale: 2
      t.decimal :finish_bid, precision: 10, scale: 2
      t.decimal :current_bid, precision: 10, scale: 2
      t.integer :bid_count
      t.string  :status

      t.timestamps
    end
  end
end
