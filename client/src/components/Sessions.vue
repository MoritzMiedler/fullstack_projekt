<template>
  <div>
    <v-data-table :headers="headers" :items="sessions" :items-per-page="10" class="elevation-1">
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sessions: [],
      headers: [
        { text: "Gebucht von", align: "start", sortable: true, value: "user_firstname" },
        { text: "Gebuchtes Datum", align: "start", sortable: true, value: "session_date" },
        { text: "Dauer", align: "start", sortable: false, value: "session_period" },
        { text: "Gebuchter Plan", align: "start", sortable: true, value: "plan_title" },
        { text: "Angenommen", align: "start", sortable: false, value: "accepted" },
        {},
      ],
    };
  },
  components: {},
  methods: {
    async getSessions() {
      const sessions = await axios({ method: "get", url: "http://localhost:3000/sessions" });
      //   console.log(sessions);
      this.sessions = sessions.data;
      this.sessions.forEach((el) => {
        //Namen zusammenfügen
        el.user_firstname += ` ${el.user_lastname}`;
      });

      this.sessions.forEach((el) => {
        //Datum fixen
        const year = el.session_date.slice(0, 4);

        const month = el.session_date.slice(5, 7);

        const day = el.session_date.slice(8, 10);

        el.session_date = `${day}.${month}.${year}`;
      });

      this.sessions.forEach((el) => {
        //Dauer fixen
        const stunden = el.session_period.hours;
        console.log(stunden);
        const minuten = el.session_period.minutes;
        console.log(minuten);

        if (stunden === undefined) {
          el.session_period = `${minuten} Minuten`;
        } else if (minuten === undefined) {
          el.session_period = `${stunden} Stunden`;
        } else if (stunden === 1) {
          el.session_period = `${stunden} Stunde und ${minuten} Minuten`;
        } else {
          el.session_period = `${stunden} Stunden und ${minuten} Minuten`;
        }
      });
    },
  },
  created() {
    this.getSessions();
  },
};
</script>

<style lang="css" scoped></style>
