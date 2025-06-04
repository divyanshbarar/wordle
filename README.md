# Wordle Clone - React Native (Expo)

## 📱 Overview
A Wordle game clone built with React Native and Expo that includes all the classic Wordle gameplay features plus daily challenges, statistics tracking, and social sharing.

## ✨ Features
- 🎯 Daily challenge mode with persistent game state
- 📊 Comprehensive game statistics
- 🔄 Sleek tile flip animations
- ⌨️ Virtual keyboard with color feedback
- 📤 Share results with emoji grid
- 🌙 Responsive design for all screen sizes

## 🛠️ Technologies Used
- React Native
- Expo
- AsyncStorage (for data persistence)
- React Native Share (for social sharing)
- React Native Animated (for animations)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or newer)
- Expo CLI (`npm install -g expo-cli`)
- Yarn or npm

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/your-username/wordle-react-native.git
   cd wordle-react-native
   ```

2. Install dependencies
   ```bash
   yarn install
   # or
   npm install
   ```

3. Start the development server
   ```bash
   expo start
   ```

### Running the App
- **iOS Simulator**: Press `i` in the Expo CLI
- **Android Emulator**: Press `a` in the Expo CLI
- **Physical Device**: Scan the QR code with the Expo Go app

## 📂 Project Structure
```
wordle-react-native/
├── assets/               # App icons and splash screen
├── App.js                # Main application file
├── app.json              # Expo configuration
├── package.json          # Project dependencies
└── README.md             # This file
```

## 🔧 Customization
### Changing the Word List
Edit the `WORD_LIST` array in `App.js` to add/remove words. All words must be:
- Uppercase
- Exactly 5 letters long
- No duplicates

### Styling
Modify the `StyleSheet` object in `App.js` to change colors, sizes, and layouts.

## 📱 Building for Production
### Android
```bash
expo build:android
```

### iOS
```bash
expo build:ios
```

## 📝 Notes
- The daily challenge word changes at midnight local time
- Game statistics persist between app sessions
- Share functionality works with any app that accepts text sharing

## 🤝 Contributing
Contributions are welcome! Please open an issue or pull request for any improvements.

## 📜 License
This project is licensed under the MIT License.
