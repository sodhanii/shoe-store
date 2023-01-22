class Sale < ApplicationRecord
  belongs_to :model
  belongs_to :store

  after_create :broadcast_sales_history
  after_create :update_model_sales
  after_create :update_store_sales

  def broadcast_sales_history
    ActionCable.server.broadcast "sales_channel", { data: sales_history }
  end

  def sales_history
      Sale.order(Arel.sql("date_trunc('minute', sale_time)"))
      .group(Arel.sql("date_trunc('minute', sale_time)"))
      .select(Arel.sql("date_trunc('minute', sale_time) as time, sum(quantity) as qty"))
  end

  def update_model_sales
    model.update(:sales => model.sales + quantity)
  end

  def update_store_sales
    store.update(:sales => store.sales + quantity)
  end

end
