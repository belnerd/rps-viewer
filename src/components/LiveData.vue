// Component to show live game data from websocket API
<template>
  <v-container>
    <div>LiveData</div>
    <v-btn @click="connection.close()">Stop</v-btn>
    <div>{{ gameData }}</div>
  </v-container>
</template>

<script>
export default {
  name: 'LiveData',
  data() {
    return {
      connection: null,
      wsURL: 'wss://bad-api-assignment.reaktor.com/rps/live',
      gameData: []
    };
  },
  created: function () {
    let gameData = this.gameData
    console.log('Starting connection to a WebSocket server');
    this.connection = new WebSocket(this.wsURL);

    this.connection.onmessage = function (event) {
      // Double JSON.parse incoming data to make an object
      let msg = JSON.parse(event.data);
      msg = JSON.parse(msg)
      gameData.push(msg)
      console.log(msg)
      // console.log(Object.prototype.hasOwnProperty.call(msg,'type'))
    };

    this.connection.onopen = function (event) {
      //  console.log(event)
      console.log('Successfully connected to: ' + event.target.url);
    };
  },
};
</script>
