<template>
  <div class="d-flex justify-center">
    <v-card class="ma-5 d-flex flex-column justify-end" style="width: 500px">
      <!-- <v-img :src="filterPlan.image"></v-img> -->
      <div class="text-h4 my-2 d-flex justify-center">
        {{ filterPlan.plan_title }}
      </div>
      <v-simple-table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ filterPlan.plan_type }}</td>
            <td>{{ filterPlan.plan_price }}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <p class="mx-5">{{ filterPlan.plan_desc }}</p>
      <template>
        <v-row justify="center">
          <v-date-picker v-model="date" color="amber darken-3"></v-date-picker>
        </v-row>
      </template>
      <v-time-picker
        ampm-in-title
        format="24hr"
        color="amber darken-3"
        v-model="time"
      ></v-time-picker>
      <div class="d-flex mx-5 mb-3">
        <v-btn class="grey" to="/plans">Go back</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="amber darken-3" to="/sessions" @click="bookSession">Book Session</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      plans: [],
      date: "2021-12-15",
      time: "18:45",
      session_period: "0.5h",
      accepted: false,
    };
  },
  props: {
    id: {
      type: String,
    },
    user_id: {
      type: String,
    },
  },

  computed: {
    filterPlan() {
      const a = this.plans.find((el) => el.plan_id == this.id);
      return a;
    },
  },
  methods: {
    async getPlans() {
      const response = await axios({ method: "GET", url: "http://127.0.0.1:3000/plans" });

      this.plans = response.data;
    },
    async bookSession() {
      await axios({
        method: "post",
        url: "http://127.0.0.1:3000/sessions",
        "content-type": "application/json",
        data: {
          session_period: this.session_period,
          session_date: `${this.date} ${this.time}`,
          plan_id: this.id,
          user_id: this.user_id,
          accepted: this.accepted,
        },
      });
    },
  },
  created() {
    this.getPlans();
  },
};
</script>

<style lang="css" scoped></style>
