# TODO: generate with CI
#   rake graphql:export && yarn gql:codegen
#   https://dev.to/nilomiranda/ruby-grahql-generating-schema-definition-file-3k1c
#   https://egghead.io/blog/rails-graphql-typescript-react-apollo

require "graphql/rake_task"
require "rake"

GraphQL::RakeTask.new(
  load_schema: -> (_task) {
    require_relative '../../app/graphql/duojo_schema'
    DuojoSchema
  }
)

namespace :graphql do
  task export: :environment do
    Rake::Task["graphql:schema:dump"].invoke
  end
end