class StoresChannel < ApplicationCable::Channel
  def subscribed
    stream_from "stores_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
