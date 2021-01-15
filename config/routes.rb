Rails.application.routes.draw do
  resources :users
  get 'app', to: 'users#index'
  root to: 'index#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
