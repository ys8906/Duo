Rails.application.routes.draw do
  # Devise
  devise_for :users

  # GraphQL
  post "/graphql", to: "graphql#execute"
  if Rails.env.development?
    get '/graphiql', to: "graphiql#index"
  end

  # Pages
  root to: "home#index"
end
