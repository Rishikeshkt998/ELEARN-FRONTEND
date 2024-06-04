import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const DeleteFileFromS3Bucket = async (fileUrl: string) => {
    const accessKeyId =import.meta.env.VITE_S3BUCKET_ACCESS_KEY
    const secretAccessKey =import.meta.env.VITE_S3BUCKET_SECRET_ACCESS
    const region = "us-east-1";


    const urlParts = fileUrl.split("/");
    const bucketName = urlParts[2].split(".")[0];
    const key = urlParts.slice(3).join("/");


    const s3Client = new S3Client({
        region: region,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        },
    });

    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
    });

    try {
        const response = await s3Client.send(command);
        console.log("File deleted successfully:", response);

        return response;
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
};