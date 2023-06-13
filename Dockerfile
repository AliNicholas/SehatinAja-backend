FROM node
WORKDIR /app
COPY . /app
COPY /credentials/firebaseServiceAccount.json /app/credentials/firebaseServiceAccount.json
COPY /credentials/cloud-storage.json /app/credentials/cloud-storage.json
RUN npm install
EXPOSE 8080
CMD node src/server.js

