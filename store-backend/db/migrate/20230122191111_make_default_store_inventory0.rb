class MakeDefaultStoreInventory0 < ActiveRecord::Migration[7.0]
  def change
    change_column :store_inventories, :quantity, :integer, :default => 0
  end
end
