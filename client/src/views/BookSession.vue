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
      <div class="d-flex mx-5 mb-3">
        <v-btn class="grey" to="/plans">Go back</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="amber darken-3" @click="bookSession">Book Session</v-btn>
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
    };
  },
  props: {
    id: {
      type: String,
    },
  },

  computed: {
    filterPlan() {
      const a = this.plans.find((el) => el.plan_id == this.id);
      console.log(this.plans);
      return a;
    },
  },
  methods: {
    async getPlans() {
      const response = await axios({ method: "GET", url: "http://127.0.0.1:3000/plans" });

      this.plans = response.data;
    },
    bookSession() {
      console.log(this.filterPlan);
    },
  },
  created() {
    this.getPlans();
  },
};
</script>

<style lang="css" scoped></style>
