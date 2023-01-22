class ModelsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "models_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
