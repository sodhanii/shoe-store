Rails.application.routes.draw do

  mount ActionCable.server => '/cable'

  resources :sales
  get 'sales/history', :to => 'sales#history'
  
  resources :store_inventories
  
  resources :models
  resources :stores



  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
