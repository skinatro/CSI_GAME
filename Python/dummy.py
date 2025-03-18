import requests
import random
import time
import signal

server_url = "http://localhost:3050/data"

time.sleep(5)

running = True  # Flag to control loop execution
count = 0  # Counter to track numbers sent

def signal_handler(sig, frame):
    global running
    running = False
    print("Interrupt received, stopping updates.")

signal.signal(signal.SIGINT, signal_handler)  # Register interrupt handler

while running:
    # Generate a single random number
    number = random.randint(0, 8)
    
    # Send single number in request
    user_input = {"inp": number}
    
    # Send POST request
    response = requests.post(server_url, json=user_input)
    
    # Check for response
    if response.status_code == 200:
        print(f"Data sent successfully! (Value: {number})")
        count += 1
        
        # After sending 9 numbers, sleep for 10 seconds
        if count % 9 == 0:
            print("Set of 9 numbers complete. Sleeping for 10 seconds...")
            time.sleep(10)
    else:
        print("Error sending data:", response.status_code)
    
    # Small delay between individual numbers
    time.sleep(0.5)

print("Exiting...")
