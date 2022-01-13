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
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">{{ player }}</td>
          <td class="text-left">{{ games.length }}</td>
          <td class="text-left">{{ gamesWon }}</td>
          <td class="text-left">{{ (gamesWon / games.length).toFixed(2) }}</td>
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
      games: [],
      gamesWon: 0,
      headers: this.$store.state.tableHeaders,
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
