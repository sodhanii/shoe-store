class Model < ApplicationRecord

    after_update :broadcast_data

    def broadcast_data
        ActionCable.server.broadcast "models_channel", { data: data }
    end

    def data
        Model.all.select(
            :name,
            :sales
        )
    end



end
