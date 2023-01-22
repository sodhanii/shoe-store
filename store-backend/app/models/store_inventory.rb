class StoreInventory < ApplicationRecord
  belongs_to :store
  belongs_to :model
  after_update :create_sales_record

  def sale_quantity
    [0, quantity_before_last_save - quantity].max();
  end

  def create_sales_record
    if ( sale_quantity > 0 )
      Sale.create(
        :store_id => store_id,
        :model_id => model_id,
        :quantity => sale_quantity
      )
    end
  end

end
