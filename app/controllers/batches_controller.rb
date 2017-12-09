class BatchesController < ApplicationController
  def index
    @batches = Batch.all
    render json: { batches: @batches, status: :ok }
  end

  def show
    @batch = Batch.find params[:id]

    respond_to do |format|
      format.html
      format.json { render json: { batch: @batch }, status: :ok }
    end
  end

  def new

  end

  def create
    @batch = Batch.build batch_params

    if @batch.save
      render json: @batch, status: :created
    else
      render json: @batch.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def batch_params
    params.require(:batch).permit(:description, :product, :initial_bid, :finish_bid)
  end
end
