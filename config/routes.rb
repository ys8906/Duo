Rails.application.routes.draw do
  # GraphQL
  post "/graphql", to: "graphql#execute"
  if Rails.env.development?
    get '/graphiql', to: "graphiql#index"
  end

  root to: "home#index"
end
