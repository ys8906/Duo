# ref: https://docs.docker.com/samples/rails/
# change
# - repository name
# - ruby version
# - install the latest yarn manually to avoid an error

# syntax=docker/dockerfile:1
FROM ruby:3.0.2
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y yarn nodejs postgresql-client vim
WORKDIR /duojo
ENV EDITOR "vim"
COPY Gemfile /duojo/Gemfile
COPY Gemfile.lock /duojo/Gemfile.lock
RUN bundle install

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]