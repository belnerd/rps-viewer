# rps-viewer
Reaktor pre-assignment: https://www.reaktor.com/assignment-2022-developers/

What was used to create this app:
- Vue
- vuex store
- Vuetify
- JavaScript

# What is the app doing

The app is divided into three components

1. GameHistory
- Fetches data for past games from API through a CORS proxy
- Transforms the data: checks which player won and formats the timestamp
- Saves the transformed data to a vuex store
- Displays the data for the user

2. PlayerData
- Upon clicking a name on the game history table this component shows that player's past games and aggregated data.
- This component also checks which hand(s) the player has played the most

3. LiveData
- This component connects to a WebSocket and transforms the messages to match the historical data.
- Based on the message type the data is either displayed as ongoing game or pushed to historical data and displayed in GameHistory component

There is also module for helper functions that are used in several components.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
