class ImportInventoryDataJob < ApplicationJob
  queue_as :default

  def perform(data)

    store_name = data["store"]
    model_name = data["model"]
    quantity = data["inventory"]

    store = Store.find_or_create_by(name: store_name)
    model = Model.find_or_create_by(name: model_name)

    StoreInventory.find_or_create_by(store_id: store.id, model_id: model.id).update(:quantity => quantity)

  end
end
