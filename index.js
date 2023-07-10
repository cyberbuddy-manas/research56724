const express = require('express');
const cors = require('cors');
const app = express();
const { BlobServiceClient } = require("@azure/storage-blob");

// Azure Blob Storage connection string
const connection_string = "DefaultEndpointsProtocol=https;AccountName=research56724;AccountKey=17dmb4uMuuVghyaSvCxdED8w5oMvv9cLE9Fl3Wuv4iY65aBuLyQKpWL+ZXfGicNwY6yJGr/k1iDi+AStHeHEoA==;EndpointSuffix=core.windows.net";

// Create a BlobServiceClient instance from the connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(connection_string);

async function retrieveDataValues(containerClient) {
    try {
        const blobs = [];
        const blobItems = [];
        for await (const blob of containerClient.listBlobsFlat()) {
            blobItems.push(blob);
        }

        await Promise.all(
            blobItems.map(async (blob) => {
                const blobClient = containerClient.getBlobClient(blob.name);
                const downloadResponse = await blobClient.downloadToBuffer();
                let data = downloadResponse.toString();
                data = data.replace(/'/g, '"');

                const jsonData = JSON.parse(data);
                blobs.push(jsonData);
            })
        );

        return blobs;
    } catch (error) {
        console.error("Error retrieving data values:", error.message);
        throw error;
    }
}

// Function to fetch and display the latest data
async function fetchLatestData(containerClient) {
    try {
        const blobs = await retrieveDataValues(containerClient);
        // console.log("Retrieved data blobs:", blobs);

        // Perform any additional logic with the latest data here

    } catch (error) {
        console.error("Failed to retrieve data blobs:", error.message);
    }
}

// Example usage
const containerName = "user1";

// Get or create the container if it doesn't exist
const containerClient = blobServiceClient.getContainerClient(containerName);

// Fetch the latest data initially
fetchLatestData(containerClient);

// Enable CORS
app.use(cors());

app.get('/', async (req, res) => {
    res.json({ "msg": "It works!" });
})

// Route handler to retrieve data
app.get('/data', async (req, res) => {
    try {
        const blobs = await retrieveDataValues(containerClient);
        res.json(blobs);
    } catch (error) {
        console.error("Failed to retrieve data blobs:", error.message);
        res.status(500).json({ error: "Failed to retrieve data blobs" });
    }
});

const port = process.env.PORT || 8080; // Use the PORT environment variable, or default to 3000

// Start the server 
app.listen(port, () => {
    console.log('Server is running on port 3000: http://localhost:5000');
});
