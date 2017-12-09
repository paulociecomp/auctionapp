class BidsController < ApplicationController
  def create
    @batch = Batch.find params[:batch_id]

    if @batch.bid
      render json: { batch: @batch, status: :ok }
    else
      render json: {
        batch: @batch,
        message: "O Leilão foi concluído"
      }, status: :unprocessable_entity
    end
  end
end
