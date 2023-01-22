class ImportInventoryDataJob < ApplicationJob
  queue_as :default

  def perform(data)

    store_name = data["store"]
    model_name = data["model"]
    quantity = data["inventory"]

    store = Store.find_or_create_by(name: store_name)
    model = Model.find_or_create_by(name: model_name)

    inventory = StoreInventory.find_or_create_by(store_id: store.id, model_id: model.id)
    inventory.update(:quantity => quantity)
    if ( inventory.sale_quantity > 0 )
      Sale.create(
        :store_id => store.id,
        :model_id => model.id,
        :quantity => inventory.sale_quantity
      )
    end




  end
end
