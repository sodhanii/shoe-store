class StoreInventory < ApplicationRecord
  belongs_to :store
  belongs_to :model
end
