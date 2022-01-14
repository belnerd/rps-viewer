// Component to show live game data from websocket API
<template>
  <v-container>
    <v-card>
      <v-card-title
        >Ongoing games - Live
        <!-- <v-btn @click="connection.close()">Stop</v-btn> -->
      </v-card-title>
      <v-simple-table v-if="gameData.length > 0">
        <thead>
          <th class="text-right">Player A</th>
          <th class="text-center">VS</th>
          <th class="text-left">Player B</th>
        </thead>
        <tbody>
          <tr v-for="(game, index) in gameData" :key="index">
            <td class="text-right px-0">{{ game.playerA.name }}</td>
            <td class="text-center">VS</td>
            <td class="text-left px-0">{{ game.playerB.name }}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-card-text v-else class="text-center">No ongoing games at the moment.</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { formatDate, checkWinner } from '../helpers.js';

export default {
  name: 'LiveData',
  data() {
    return {
      connection: null,
      wsURL: 'wss://bad-api-assignment.reaktor.com/rps/live',
      gameData: [],
    };
  },
  computed: {
    history() {
      return this.$store.state.history;
    },
  },
  created: function () {
    // View model to access Vue data object
    let vm = this;
    console.log('Starting connection to a WebSocket server');
    this.connection = new WebSocket(this.wsURL);

    this.connection.onmessage = function (event) {
      // Double JSON.parse incoming data to make an object
      let msg = new Object();
      msg = JSON.parse(event.data);
      msg = JSON.parse(msg);
      // Format timestamp to human readable format
      msg.t = formatDate(msg.t);
      if (msg.type === 'GAME_BEGIN') {
        // If the game just started push to live games array
        vm.gameData.push(msg);
      } else if (msg.type === 'GAME_RESULT') {
        // If the game is finished push the results to history and remove from live array
        msg.status = checkWinner(msg.playerA.played, msg.playerB.played);
        vm.$store.commit('PUSH_HISTORY', msg);
        vm.gameData = vm.gameData.filter((game) => game.gameId !== msg.gameId);
      }
    };

    this.connection.onopen = function (event) {
      console.log('Successfully connected to: ' + event.target.url);
    };
  },
};
</script>
