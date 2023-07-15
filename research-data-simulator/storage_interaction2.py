import random
import time
from datetime import datetime
from azure.storage.blob import BlobServiceClient

# Azure Blob Storage connection string
connection_string = "DefaultEndpointsProtocol=https;AccountName=research56724;AccountKey=17dmb4uMuuVghyaSvCxdED8w5oMvv9cLE9Fl3Wuv4iY65aBuLyQKpWL+ZXfGicNwY6yJGr/k1iDi+AStHeHEoA==;EndpointSuffix=core.windows.net"

# Create a BlobServiceClient instance from the connection string
blob_service_client = BlobServiceClient.from_connection_string(connection_string)

# List of user containers to store the data
user_containers = ["user1"]

# Function to generate simulated data values in JSON format
def generate_data_values(serial_number, timestamp):
    data = {
        "SerialNumber": serial_number,
        "Timestamp": timestamp,
        "SPO2": round(random.uniform(90, 95), 2),
        "SBP": round(random.uniform(120, 130), 2),
        "DBP": round(random.uniform(80, 90), 2),
        "TEMP": round(random.uniform(96, 100), 1),
        "PR": round(random.uniform(60, 100), 2),
        "RR": round(random.uniform(18, 22), 2)
    }

    # Check if it's the 4th execution
    if serial_number == 66:
        data["SPO2"] = random.uniform(85, 90)  # Set SPO2 below critical value
    
    # Check if it's the 5th execution
    if serial_number == 67:
        data["SPO2"] = random.uniform(74, 75)  # Set SPO2 below critical value

    # Check if it's the 5th execution
    if serial_number == 70:
        data["SPO2"] = random.uniform(74, 75)  # Set SPO2 below critical value

    return data

# Main loop to generate and store simulated data
while True:
    # Get the current timestamp for each data entry
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Iterate over each user container
    for container_name in user_containers:
        # Get or create the container if it doesn't exist
        container_client = blob_service_client.get_container_client(container_name)
        try:
            container_client.create_container()
        except Exception as e:
            if "ContainerAlreadyExists" not in str(e):
                raise e

        # Retrieve existing blobs
        blobs = container_client.list_blobs()
        if blobs:
            # Find the maximum serial number from the existing blobs
            last_blob = max(blobs, key=lambda x: int(x.name.split("_")[1].split(".")[0]), default=None)
            if last_blob is not None:
                last_serial_number = int(last_blob.name.split("_")[1].split(".")[0])
            else:
                last_serial_number = 0
            counter = last_serial_number + 1
        else:
            counter = 0

        # Generate simulated data values
        data = generate_data_values(counter, timestamp)

        # Create a unique blob name based on the timestamp and serial number
        blob_name = f"data_{counter}.json"

        # Create the blob client and upload data to the blob
        blob_client = container_client.get_blob_client(blob_name)
        blob_client.upload_blob(
            str(data)
        )

        print(f"Simulated data uploaded: {container_name}/{blob_name}")

    # Wait for 120 seconds before generating and storing the next set of data
    time.sleep(5)
