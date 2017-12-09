Rails.application.routes.draw do
  root 'home#index'

  resources :batches do
    resources :bids, only: :create
  end
end
