require "test_helper"

class SalesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @sale = sales(:one)
  end

  test "should get index" do
    get sales_url, as: :json
    assert_response :success
  end

  test "should create sale" do
    assert_difference("Sale.count") do
      post sales_url, params: { sale: { model_id: @sale.model_id, quantity: @sale.quantity, sale_time: @sale.sale_time, store_id: @sale.store_id } }, as: :json
    end

    assert_response :created
  end

  test "should show sale" do
    get sale_url(@sale), as: :json
    assert_response :success
  end

  test "should update sale" do
    patch sale_url(@sale), params: { sale: { model_id: @sale.model_id, quantity: @sale.quantity, sale_time: @sale.sale_time, store_id: @sale.store_id } }, as: :json
    assert_response :success
  end

  test "should destroy sale" do
    assert_difference("Sale.count", -1) do
      delete sale_url(@sale), as: :json
    end

    assert_response :no_content
  end
end
