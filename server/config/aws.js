const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const { unlink } = require("fs/promises");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const lambda = new AWS.Lambda({
  region: process.env.AWS_REGION,
});

const uploadToS3 = async (file) => {
  try {
    const fileContent = fs.readFileSync(file.path).toString("base64");

    const fileExtension = path.extname(file.originalname);

    const url = `dev-book-image/${Date.now()}${fileExtension}`;

    console.log("fileContent", fileContent);
    console.log("mimetype", file.mimetype);

    const params = {
      FunctionName: "upload-s3",
      Payload: Buffer.from(
        JSON.stringify({
          fileName: url,
          fileContent: fileContent,
          mimeType: file.mimetype,
        })
      ),
    };

    const result = await lambda.invoke(params).promise();
    console.log("result", result);

    // const uploadParams = {
    //   Bucket: process.env.S3_BUCKET_NAME,
    //   Key: url,
    //   Body: fileStream,
    //   ContentType: file.mimetype,
    // };

    // const data = await s3.upload(uploadParams).promise();
    // console.log("Uploaded LINKKKKKK", data.Location);
    await unlink(file.path);
    return url;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { uploadToS3 };
