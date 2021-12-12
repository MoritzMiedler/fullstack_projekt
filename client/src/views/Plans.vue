<template>
  <div><Plans :plans="plans"></Plans></div>
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
};
</script>

<style lang="css" scoped></style>
