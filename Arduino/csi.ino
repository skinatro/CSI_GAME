const int buttonPins[10] = {13, 12, 11, 10, 9, 8, 7, 6, 5, 4}; // Pins for buttons
int buttonStates[10];  // To store current button states
int lastButtonStates[10]; // To store last button states (for edge detection)

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 10; i++) {
    pinMode(buttonPins[i], INPUT_PULLUP);  // Using internal pull-up resistors
    lastButtonStates[i] = HIGH; // Initial state (not pressed)
  }
}

void loop() {
  for (int i = 0; i < 10; i++) {
    buttonStates[i] = digitalRead(buttonPins[i]);

    // Detect button press (falling edge detection)
    if (lastButtonStates[i] == HIGH && buttonStates[i] == LOW) {
      Serial.println(i);  // Print number when button is pressed
      delay(100);         // Debounce delay
    }

    lastButtonStates[i] = buttonStates[i];
  }
}
