// A component to show individual player data
<template>
  <v-container>
    <p>Player: {{ player }}</p>
    <p>Total games played: {{ games.length }}</p>
    <p>Games won: {{ gamesWon }} | Win ratio {{ (gamesWon / games.length).toFixed(2) }}</p>
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
      games: [],
      gamesWon: 0,
      headers: this.$store.state.tableHeaders
    };
  },
  computed: {
    history() {
      return this.$store.state.history;
    },
  },
  created: function () {
    this.findPlayerGames();
  },
  beforeUpdate: function () {
    this.findPlayerGames();
  },
  methods: {
    // Method to find all games the player has played and add them to a new array of objects
    findPlayerGames() {
      if (this.games) {
        this.games = [];
        this.gamesWon = 0;
      }
      for (let i = 0; i < this.history.length; i++) {
        if (
          this.history[i].playerA.name === this.player ||
          this.history[i].playerB.name == this.player
        ) {
          this.games.push(this.history[i]);
          // Check if player A the current player and is the winner
          if (this.history[i].playerA.name === this.player) {
            if (this.history[i].status === 'A') {
              this.gamesWon++;
            }
          }
          // Check if player B the current player and is the winner
          if (this.history[i].playerB.name === this.player) {
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
