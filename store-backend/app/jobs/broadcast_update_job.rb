class BroadcastUpdateJob < ApplicationJob
  queue_as :default

  def perform(*args)
    Thread.new do
      loop do
        if Rails.cache.exist?("sale_update")
          ActionCable.server.broadcast "sales_channel", { data: true }
        end
        sleep 10
      end
    end
  end
end
