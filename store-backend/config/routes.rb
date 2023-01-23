Rails.application.routes.draw do

  mount ActionCable.server => '/cable'

  get 'sales/history', :to => 'sales#history'
  resources :sales
  
  resources :store_inventories
  resources :models
  resources :stores

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
end
