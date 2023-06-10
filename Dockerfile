FROM google/cloud-sdk:slim as builder
WORKDIR /app
COPY . /app
RUN gsutil cp gs://sehatinaja-c7205/credentials/firebaseServiceAccount.json /app/credentials/firebaseServiceAccount.json
RUN gsutil cp gs://sehatinaja-c7205/.env /app/.env


FROM node
WORKDIR /app
COPY --from=builder /app /app
RUN npm install
EXPOSE 8080
CMD node src/server.js