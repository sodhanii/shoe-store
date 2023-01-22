json.extract! sale, :id, :quantity, :model_id, :store_id, :sale_time, :created_at, :updated_at
json.url sale_url(sale, format: :json)
