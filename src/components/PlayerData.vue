// A component to show individual player data
<template>
  <v-container>
    <p>Player: {{ player }}</p>
    <p>Total games played: {{ games.length }}</p>
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
      headers: [
        {
          text: 'Time',
          align: 'start',
          sortable: true,
          value: 't',
        },
        {
          text: 'Player A',
          value: 'playerA.name',
        },
        {
          text: 'Played',
          value: 'playerA.played',
        },
        {
          text: 'Player B',
          value: 'playerB.name',
        },
        {
          text: 'Played',
          value: 'playerB.played',
        },
        {
          text: 'Winner',
          value: 'status',
        },
      ],
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
      }
      for (let i = 0; i < this.history.length; i++) {
        if (
          this.history[i].playerA.name === this.player ||
          this.history[i].playerB.name == this.player
        ) {
          this.games.push(this.history[i]);
        }
      }
    },
  },
};
</script>
