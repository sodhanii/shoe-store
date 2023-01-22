json.extract! store_inventory, :id, :quantity, :store_id, :model_id, :created_at, :updated_at
json.url store_inventory_url(store_inventory, format: :json)
