class SalesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "sales_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
