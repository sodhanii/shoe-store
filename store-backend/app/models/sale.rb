class Sale < ApplicationRecord
  belongs_to :model
  belongs_to :store

  after_create :update_model_sales
  after_create :update_store_sales
  after_create :updated_cache


  def update_model_sales
    model.update(:sales => model.sales + quantity)
  end

  def update_store_sales
    store.update(:sales => store.sales + quantity)
  end

  def updated_cache
    Rails.cache.write("sale_update", :expires_in => 10.seconds)
  end

end
