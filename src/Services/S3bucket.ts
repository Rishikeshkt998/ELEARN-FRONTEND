/* eslint-disable @typescript-eslint/no-explicit-any */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

export const UploadS3Bucket = async (file:any) => {
    try {
        console.log(file)
        // Create an S3 client
        const s3Client = new S3Client({
            region: "us-east-1",
            credentials: {
                accessKeyId:import.meta.env.VITE_S3BUCKET_ACCESS_KEY,             
                secretAccessKey:import.meta.env.VITE_S3BUCKET_SECRET_ACCESS
            },
        });

        const region = "us-east-1";
        const bucketName = "elearn-s3-bucket";
        const key = `${uuidv4()}_${file.name}`; // Generating a unique key using UUID

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: file,
        });

        // Send the PutObjectCommand to upload the file to S3 bucket
        const response = await s3Client.send(command);

        // Construct the URL of the uploaded file
        const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

        console.log("File uploaded successfully:", response);
        console.log("URL of the uploaded file:", url);

        return { response, url };
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};
