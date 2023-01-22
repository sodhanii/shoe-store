class Store < ApplicationRecord

    LOW_INVENTORY_THRESHOLD = 10

    after_update :broadcast_data

    def broadcast_data
        ActionCable.server.broadcast "stores_channel", { data: data }
    end

    def data
        Store.joins('LEFT OUTER JOIN store_inventories ON store_inventories.store_id = stores.id')
        .select(
            'stores.name',
            'stores.sales',
            'count(1) as low_products'
        )
        .where('store_inventories.quantity < ?', LOW_INVENTORY_THRESHOLD)
        .group('stores.name, stores.sales')
    end

end
