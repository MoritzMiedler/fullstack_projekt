<template>
  <div>
    <v-card
      v-for="plan in plans"
      :key="plan.plan_id"
      class="ma-5 d-flex flex-column justify-end"
      style=""
    >
      <!-- <v-img :src="plan.image"></v-img> -->
      <div class="pa-3">
        <span class="text-h5">{{ plan.plan_title }}</span>
        <br />
        Type:
        <span class="font-weight-bold">{{ plan.plan_type }}</span>
        <br />
        Price:
        <span class="font-weight-bold">{{ plan.plan_price }}</span>
        <br />
        {{ plan.plan_desc }}
        <br />
        <v-btn class="amber darken-3 mt-2" @click="buttonClick()">Book Session</v-btn>
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

  methods: {
    async getPlans() {
      const plans = await axios({ method: "GET", url: "http://127.0.0.1:3000/plans" });
      console.log(plans.data);
      this.plans = plans.data;
    },
    // async buyCar(event) {
    //   event.title += " RESERVED!";
    //   await axios({
    //     method: "PATCH",
    //     url: "http://127.0.0.1:3000/cars/" + event.id,
    //     "content-type": "application/json",
    //     data: event,
    //   });
    // },
  },

  created() {
    this.getPlans();
  },
};
</script>

<style lang="css" scoped></style>
