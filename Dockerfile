FROM nodejs:latest

COPY server /server

WORKDIR /server

ENV MODEL_BASE_PATH=/models
ENV MODEL_NAME=SavedModel

CMD npm start
