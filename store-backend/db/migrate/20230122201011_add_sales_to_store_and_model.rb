class AddSalesToStoreAndModel < ActiveRecord::Migration[7.0]
  def change
    add_column :stores, :sales, :integer, :default => 0
    add_column :models, :sales, :integer, :default => 0
  end
end
