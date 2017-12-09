class BatchesController < ApplicationController
  def new

  end

  def create
    @batch = Batch.new batch_params
    @batch.current_bid = batch_params[:current_bid]
    @batch.status = :open

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
