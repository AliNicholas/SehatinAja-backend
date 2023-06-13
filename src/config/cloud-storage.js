const { Storage } = require("@google-cloud/storage");

const cloudStorageKey = require("../../credentials/cloud-storage.json");

const storage = new Storage({
  projectId: process.env.CS_PROJECT_ID,
  keyFilename: cloudStorageKey,
});

const bucketName = process.env.CS_BUCKET_NAME;

const bucket = storage.bucket(bucketName); // my bucket name in the cloud

module.exports = {
  bucket,
  bucketName,
};
