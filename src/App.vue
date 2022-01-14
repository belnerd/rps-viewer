<template>
  <v-app>
    <v-container>
      <h2 class="text-center">ROCK, PAPER, SCISSORS GAMES</h2>
      <v-row>
        <v-col><GameHistory /></v-col>
        <v-col><LiveData /></v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import GameHistory from './components/GameHistory.vue';
import LiveData from './components/LiveData.vue';

export default {
  name: 'App',

  components: {
    GameHistory,
    LiveData,
  },
};
</script>
