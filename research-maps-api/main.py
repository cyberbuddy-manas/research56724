import time
import random
import requests

def get_travel_time(origin, destination, api_key):
    url = "https://maps.googleapis.com/maps/api/directions/json"

    params = {
        "origin": origin,
        "destination": destination,
        "key": api_key
    }

    response = requests.get(url, params=params)
    data = response.json()

    if data["status"] == "OK":
        route = data["routes"][0]
        legs = route["legs"][0]
        duration = legs["duration"]["text"]
        return duration
    else:
        return None

# Set your origin and destination addresses
origin_address = "Gian di lassi, Golden Temple Out Road, Gagar Mal Rd, opp. regent cinema, Katra Sher Singh, Amritsar, Punjab 143001"
destination_address = "Crystal Restaurant, Crystal Chowk, Queens Rd, Maharaja Ranjit Singh Nagar, Near, Company Bagh, Amritsar, Punjab 143001"

# Set your Google Maps API key
api_key = "AIzaSyBJWUCWTObV1XatnoYFYrKvn2S1Rtt6jPc"

while True:
    # Generate a random delay between 0 to 10 seconds
    delay = random.randint(0, 10)
    print(f"Waiting for {delay} seconds...")
    time.sleep(delay)

    # Get the travel time
    travel_time = get_travel_time(origin_address, destination_address, api_key)

    if travel_time:
        print(f"Estimated travel time: {travel_time}")
    else:
        print("Unable to get travel time. Please check your addresses and API key.")
