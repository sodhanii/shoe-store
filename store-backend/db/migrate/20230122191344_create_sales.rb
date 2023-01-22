class CreateSales < ActiveRecord::Migration[7.0]
  def change
    create_table :sales do |t|
      t.integer :quantity, default: 0
      #Ex:- :default =>''
      t.datetime :sale_time, default: -> { 'CURRENT_TIMESTAMP' }

      t.references :model, null: false, foreign_key: true
      t.references :store, null: false, foreign_key: true

      t.timestamps
    end
  end
end
