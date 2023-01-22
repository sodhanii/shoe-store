class CreateStoreInventories < ActiveRecord::Migration[7.0]
  def change
    create_table :store_inventories do |t|
      t.integer :quantity
      t.references :store, null: false, foreign_key: true
      t.references :model, null: false, foreign_key: true

      t.timestamps
    end
  end
end
