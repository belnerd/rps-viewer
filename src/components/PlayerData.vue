// A component to show individual player data
<template>
  <v-container>
    <p>Player: {{ player }}</p>
    <p>Total games played: {{ games.length }}</p>
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
