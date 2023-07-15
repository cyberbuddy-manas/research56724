import random
import time
from datetime import datetime
from azure.storage.blob import BlobServiceClient

# Azure Blob Storage connection string
connection_string = "DefaultEndpointsProtocol=https;AccountName=research56724;AccountKey=17dmb4uMuuVghyaSvCxdED8w5oMvv9cLE9Fl3Wuv4iY65aBuLyQKpWL+ZXfGicNwY6yJGr/k1iDi+AStHeHEoA==;EndpointSuffix=core.windows.net"

# Create a BlobServiceClient instance from the connection string
blob_service_client = BlobServiceClient.from_connection_string(connection_string)

# List of user containers to store the data
user_containers = [ "user1", "user2", "user3", "user4", "user5",
  "user6", "user7", "user8", "user9", "user10",
  "user11", "user12", "user13", "user14", "user15",
  "user16", "user17", "user18", "user19", "user20",
  "user21", "user22", "user23", "user24", "user25",
  "user26", "user27", "user28", "user29", "user30",
  "user31", "user32", "user33", "user34", "user35",
  "user36", "user37", "user38", "user39", "user40",
  "user41", "user42", "user43", "user44", "user45",
  "user46", "user47", "user48", "user49", "user50",
  "user51", "user52", "user53", "user54", "user55",
  "user56", "user57", "user58", "user59", "user60",
  "user61", "user62", "user63", "user64", "user65",
  "user66", "user67", "user68", "user69", "user70",
  "user71", "user72", "user73", "user74", "user75",
  "user76", "user77", "user78", "user79", "user80",
  "user81", "user82", "user83", "user84", "user85",
  "user86", "user87", "user88", "user89", "user90",
  "user91", "user92", "user93", "user94", "user95",
  "user96", "user97", "user98", "user99", "user100" ]

# Function to generate simulated data values in JSON format
def generate_data_values(serial_number, timestamp):
    data = {
        "SerialNumber": serial_number,
        "Timestamp": timestamp,
        "SPO2": random.uniform(92, 96),
        "SBP": random.uniform(112, 130),
        "DBP": random.uniform(60, 90),
        "TEMP": round(random.uniform(96, 100), 1),
        "PR": random.uniform(60, 100),
        "RR": random.uniform(12, 20)
    }
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
    time.sleep(120)
