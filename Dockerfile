FROM google/cloud-sdk:slim as builder
WORKDIR /app
COPY . /app
ARG firebaseServiceAccount
ARG env
COPY /credentials/f /app/credentials
COPY .env /app/.env

FROM node
WORKDIR /app
COPY --from=builder /app /app
RUN npm install
EXPOSE 8080
CMD node src/server.js

