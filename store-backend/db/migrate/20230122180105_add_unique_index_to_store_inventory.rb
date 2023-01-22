class AddUniqueIndexToStoreInventory < ActiveRecord::Migration[7.0]
  def change
    add_index :store_inventories, [:model_id, :store_id], unique: true
  end
end
