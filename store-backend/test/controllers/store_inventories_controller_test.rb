require "test_helper"

class StoreInventoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @store_inventory = store_inventories(:one)
  end

  test "should get index" do
    get store_inventories_url, as: :json
    assert_response :success
  end

  test "should create store_inventory" do
    assert_difference("StoreInventory.count") do
      post store_inventories_url, params: { store_inventory: { model_id: @store_inventory.model_id, quantity: @store_inventory.quantity, store_id: @store_inventory.store_id } }, as: :json
    end

    assert_response :created
  end

  test "should show store_inventory" do
    get store_inventory_url(@store_inventory), as: :json
    assert_response :success
  end

  test "should update store_inventory" do
    patch store_inventory_url(@store_inventory), params: { store_inventory: { model_id: @store_inventory.model_id, quantity: @store_inventory.quantity, store_id: @store_inventory.store_id } }, as: :json
    assert_response :success
  end

  test "should destroy store_inventory" do
    assert_difference("StoreInventory.count", -1) do
      delete store_inventory_url(@store_inventory), as: :json
    end

    assert_response :no_content
  end
end
