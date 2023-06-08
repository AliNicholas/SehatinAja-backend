FROM nodejs:latest

COPY /src /src

WORKDIR /server

ENV MODEL_BASE_PATH=/models
ENV MODEL_NAME=SavedModel

# CMD npm install
CMD npm start
