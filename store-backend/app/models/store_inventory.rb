class StoreInventory < ApplicationRecord
  belongs_to :store
  belongs_to :model

  def sale_quantity
    [0, quantity_before_last_save - quantity].max();
  end

end
