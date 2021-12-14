<template>
  <div>
    <Plans :plans="plans" :loggedIn="loggedIn" :user_id="user_id" v-if="loggedIn"> </Plans>
    <div v-if="!loggedIn">
      <h2>Please log in before viewing your Plans</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Plans from "../components/Plans.vue";

export default {
  components: {
    Plans,
  },

  methods: {
    async getPlans() {
      const plans = await axios({ method: "GET", url: "http://127.0.0.1:3000/plans" });

      this.plans = plans.data;
    },
  },
  data() {
    return {
      plans: [],
    };
  },
  created() {
    this.getPlans();
  },
  props: {
    loggedIn: {
      type: Boolean,
    },
    user_id: {
      type: Number,
    },
  },
};
</script>

<style lang="css" scoped></style>
