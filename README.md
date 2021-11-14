# Duojo
英単語帳のDuo3.0をブラウザで一覧できます。
※下記の技術練習用です。

https://user-images.githubusercontent.com/58162637/141689499-1cf1522b-d393-457d-83ac-4f5c8162c776.mov


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
