// Component to show live game data from websocket API
<template>
<div>
  <div>LiveData</div>
  <div>{{ gameData.type }}</div>
</div>
</template>

<script>
export default {
  name: 'LiveData',
  data() {
    return {
      connection: null,
      wsURL: 'wss://bad-api-assignment.reaktor.com/rps/live',
      gameData: [],
    };
  },
  created: function () {
    console.log('Starting connection to a WebSocket server');
    this.connection = new WebSocket(this.wsURL);

    this.connection.onmessage = function (event) {
      console.log(event)
      this.gameData = event.data
    };

    this.connection.onopen = function (event) {
      //   console.log(event)
      console.log('Successfully connected to: ' + event.target.url);
    };
  },
};
</script>
