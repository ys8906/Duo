# Dependencies
## Frontend
- React 17.0.2
- TypeScript 4.4.4
- Apollo Client 3.4.16

## Backend
- Ruby 3.0.2
- Rails 6.1.4
- PostgresSQL 14.0
- GraphQL Ruby 1.12.18

# Setup
Share credentials beforehand
```
$ docker-compose build
$ docker-compose up
$ docker-compose run web rake db:create
$ docker-compose run web rake db:migrate
```
