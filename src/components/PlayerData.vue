// A component to show individual player data
<template>
  <v-container>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">Player</th>
          <th class="text-left">Games played</th>
          <th class="text-left">Games won</th>
          <th class="text-left">Win ratio</th>
          <th class="text-left">Most played</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">{{ player }}</td>
          <td class="text-left">{{ games.length }}</td>
          <td class="text-left">{{ gamesWon }}</td>
          <td class="text-left">{{ (gamesWon / games.length).toFixed(2) }}</td>
          <td class="text-left">
            <span v-for="(hand, index) in mostPlayed" :key="index">
              <span>{{ hand.toUpperCase() }}</span>
              <span v-if="index+1 < mostPlayed.length">, </span>
            </span>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-data-table
      v-if="games"
      :headers="headers"
      :items="games"
      :items-per-page="5"
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'PlayerData',
  props: {
    player: String,
  },
  data() {
    return {
      games: [], // Array of objects for player's games
      gamesWon: 0, // Number of games won by the player
      hands: { // Object for counting played hands
        rock: 0,
        paper: 0,
        scissors: 0
      },
      mostPlayed: [], // Array for most played hands
      headers: this.$store.state.tableHeaders, // Headers for the data table
    };
  },
  computed: {
    history() {
      return this.$store.state.history;
    },
  },
  created: function () {
    this.findPlayerGames();
    this.mostPlayed = this.getMax(this.hands)
  },
  beforeUpdate: function () {
    this.findPlayerGames();
    this.mostPlayed = this.getMax(this.hands)
  },
  methods: {
    // Method to update played hands object
    updateHands(hand) {
      switch (hand) {
        case 'ROCK':
          this.hands.rock++;
          break;
        case 'PAPER':
          this.hands.paper++;
          break;
        case 'SCISSORS':
          this.hands.scissors++;
          break;
      }
    },
    // Method to find max key(s)/value(s) in an object, returns an array of keys
    getMax(object) {
      return Object.keys(object).filter(x => {
        return object[x] == Math.max.apply(null, Object.values(object))
      })
    },
    // Method to find all games the player has played and add them to a new array of objects
    findPlayerGames() {
      // Reset if stuff exists
      if (this.games) {
        this.games = [];
        this.gamesWon = 0;
      }
      if (this.hands) {
        this.hands = {
          rock: 0,
          paper: 0,
          scissors: 0
        }
      }
      for (let i = 0; i < this.history.length; i++) {
        if (
          this.history[i].playerA.name === this.player ||
          this.history[i].playerB.name == this.player
        ) {
          this.games.push(this.history[i]);
          // Check if player A the current player, update played hands and is the winner
          if (this.history[i].playerA.name === this.player) {
            this.updateHands(this.history[i].playerA.played);
            if (this.history[i].status === 'A') {
              this.gamesWon++;
            }
          }
          // Check if player B the current player, update played hands and is the winner
          if (this.history[i].playerB.name === this.player) {
            this.updateHands(this.history[i].playerB.played);
            if (this.history[i].status === 'B') {
              this.gamesWon++;
            }
          }
        }
      }
    },
  },
};
</script>
