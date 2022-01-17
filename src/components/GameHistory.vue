// Component to show game data from the API
<template>
  <v-container>
    <v-card>
      <v-card-title
        >Game history
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details=""
        >
        </v-text-field>
      </v-card-title>
      <v-data-table
        v-if="history"
        :headers="headers"
        :items="history"
        :items-per-page="10"
        :search="search"
      >
        <!-- Make the player names clickable -->
        <template v-slot:[`item.playerA.name`]="{ item }">
          <span class="clickable" v-on:click="showPlayer(item.playerA.name)">{{
            item.playerA.name
          }}</span>
        </template>
        <template v-slot:[`item.playerB.name`]="{ item }">
          <span class="clickable" v-on:click="showPlayer(item.playerB.name)">{{
            item.playerB.name
          }}</span>
        </template>
        <v-alert slot="no-results" :value="true" color="error"
          >Your search for "{{ search }}" found no results.</v-alert
        >
      </v-data-table>
      <p v-else>Loading...</p>
    </v-card>

    <!-- Sheet to show PlayerData component when a player name is clicked -->
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center">
        <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
          close
        </v-btn>
        <PlayerData :player="selectedPlayer" />
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import { formatDate, checkWinner } from '../helpers.js';
import PlayerData from './PlayerData.vue';

export default {
  name: 'GameHistory',
  components: {
    PlayerData,
  },
  data() {
    return {
      API_URL: 'https://bad-api-assignment.reaktor.com/rps/history',
      // Headers for v-data-table
      search: '',
      sheet: false,
      selectedPlayer: null,
      headers: this.$store.state.tableHeaders,
    };
  },
  computed: {
    history() {
      return this.$store.state.history;
    },
  },
  created: function () {
    // Check if history has already been loaded (in case user refreshes page) and clear it to prevent errors
    if (history) {
      this.$store.commit('CLEAR_HISTORY');
    }
    fetch(this.API_URL, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // Transform timestamps to human readable format and check which player won
        for (let i = 0; i < data.data.length; i++) {
          data.data[i].t = formatDate(data.data[i].t);
          data.data[i].status = checkWinner(
            data.data[i].playerA.played,
            data.data[i].playerB.played
          );
        }
        this.$store.commit('SET_HISTORY', data.data);
      });
  },
  methods: {
    showPlayer(player) {
      this.sheet = true;
      this.selectedPlayer = player;
    },
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>
