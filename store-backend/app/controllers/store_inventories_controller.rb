class StoreInventoriesController < ApplicationController
  before_action :set_store_inventory, only: %i[ show update destroy ]

  # GET /store_inventories
  # GET /store_inventories.json
  def index
    @store_inventories = StoreInventory.all
  end

  # GET /store_inventories/1
  # GET /store_inventories/1.json
  def show
  end

  # POST /store_inventories
  # POST /store_inventories.json
  def create
    @store_inventory = StoreInventory.new(store_inventory_params)

    if @store_inventory.save
      render :show, status: :created, location: @store_inventory
    else
      render json: @store_inventory.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /store_inventories/1
  # PATCH/PUT /store_inventories/1.json
  def update
    if @store_inventory.update(store_inventory_params)
      render :show, status: :ok, location: @store_inventory
    else
      render json: @store_inventory.errors, status: :unprocessable_entity
    end
  end

  # DELETE /store_inventories/1
  # DELETE /store_inventories/1.json
  def destroy
    @store_inventory.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_store_inventory
      @store_inventory = StoreInventory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def store_inventory_params
      params.require(:store_inventory).permit(:quantity, :store_id, :model_id)
    end
end
