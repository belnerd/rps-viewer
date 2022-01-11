// Component to show game data from the API
<template>
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
      <v-alert slot="no-results" :value="true" color="error"
        >Your search for "{{ search }}" found no results.</v-alert
      >
    </v-data-table>
    <p v-else>Loading...</p>
  </v-card>
</template>

<script>
import { formatDate } from '../helpers.js';

export default {
  name: 'GameHistory',
  data() {
    return {
      API_URL: 'https://bad-api-assignment.reaktor.com/rps/history',
      // Headers for v-data-table
      search: '',
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
          filterable: true,
        },
        {
          text: 'Played',
          value: 'playerA.played',
        },
        {
          text: 'Player B',
          value: 'playerB.name',
          filterable: true,
        },
        {
          text: 'Played',
          value: 'playerB.played',
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
    // Check if history has already been loaded (in case user refreshes page) and clear it to prevent errors
    if (history) {
      this.$store.commit('CLEAR_HISTORY');
    }
    fetch(this.API_URL)
      .then((res) => res.json())
      .then((data) => {
        // Transform timestamps to human readable format
        for (let i = 0; i < data.data.length; i++) {
          data.data[i].t = formatDate(data.data[i].t);
        }
        this.$store.commit('SET_HISTORY', data.data);
      });
  },
  methods: {
    showAlert() {
      alert('Alert');
    },
  },
};
</script>

<style>
.test {
  color: red;
}
</style>
