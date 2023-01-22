require 'json'
require 'eventmachine'
require 'faye/websocket'

class ReadInventoryDataJob < ApplicationJob
  queue_as :default

  def perform(*args)
    Thread.new do
      EM.run {
      ws = Faye::WebSocket::Client.new('ws://localhost:8080/')
      ws.on :message do |event|
        data = JSON.parse(event.data)
        ImportInventoryDataJob.perform_later(data)
      end
     }
    end
  end

end
