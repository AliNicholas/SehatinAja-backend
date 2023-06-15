const { Storage } = require("@google-cloud/storage");

const cloudStorageKey = require("../../credentials/cloud-storage.json");

const storage = new Storage({
  projectId: process.env.CS_PROJECT_ID,
  keyFilename: cloudStorageKey,
});

const bucketName = process.env.CS_BUCKET_NAME;

module.exports = {
  storage,
  bucketName,
};
