import requests
import random
import time
import signal

server_url = "http://localhost:3050/data"

time.sleep(5)

running = True  # Flag to control loop execution

def signal_handler(sig, frame):
    global running
    running = False
    print("Interrupt received, stopping updates.")

signal.signal(signal.SIGINT, signal_handler)  # Register interrupt handler

while running:
    user_input = {"inp": random.randint(0, 8)}  # Randomize user input from 0 to 8

    # Send POST request
    response = requests.post(server_url, json=user_input)

    # Check for response
    if response.status_code == 200:
        print(f"Data sent successfully! (Value: {user_input['inp']})")
    else:
        print("Error sending data:", response.status_code)

    time.sleep(5)

print("Exiting...")
