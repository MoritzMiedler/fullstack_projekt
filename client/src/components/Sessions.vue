<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="sessions"
      :items-per-page="10"
      class="elevation-1"
      show-select
      :single-select="singleSelect"
      v-model="selected"
      item-key="session_date"
    >
    </v-data-table>
    <v-btn x-large block color="amber darken-3" @click="deleteS()"> Delete selected</v-btn>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      singleSelect: true,
      selected: [],
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
      const sessions = await axios({
        method: "get",
        url: `http://localhost:3000/sessions/ ${this.id}`,
      });
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

        const minuten = el.session_period.minutes;

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
    async deleteSession(id) {
      await axios({ method: "DELETE", url: `http://localhost:3000/sessions/${id}` });
    },
    deleteS() {
      this.selected.forEach((element) => {
        this.deleteSession(element.session_id);
      });
      this.getSessions();
    },
  },
  created() {
    this.getSessions();
  },
  props: {
    id: {
      type: Number,
    },
  },
};
</script>

<style lang="css" scoped></style>
