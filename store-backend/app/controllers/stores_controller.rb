class StoresController < ApplicationController
  before_action :set_store, only: %i[ show update destroy ]

  # GET /stores
  # GET /stores.json
  def index

    @stores = Store.joins('LEFT OUTER JOIN store_inventories ON store_inventories.store_id = stores.id')
              .select(
                  'stores.id',
                  'stores.name',
                  'stores.sales',
                  'sum(case when (store_inventories.quantity <= 10) then 1 else 0 end) as low_products'
              )
              .group('stores.id, stores.name, stores.sales')
              .order("low_products DESC")

  end

  # GET /stores/1
  # GET /stores/1.json
  def show
  end

  # POST /stores
  # POST /stores.json
  def create
    @store = Store.new(store_params)

    if @store.save
      render :show, status: :created, location: @store
    else
      render json: @store.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /stores/1
  # PATCH/PUT /stores/1.json
  def update
    if @store.update(store_params)
      render :show, status: :ok, location: @store
    else
      render json: @store.errors, status: :unprocessable_entity
    end
  end

  # DELETE /stores/1
  # DELETE /stores/1.json
  def destroy
    @store.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_store
      @store = Store.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def store_params
      params.require(:store).permit(:name)
    end
end
