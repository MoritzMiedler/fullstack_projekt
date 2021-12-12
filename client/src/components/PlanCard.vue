<template>
  <v-card>
    <!-- <v-img :src="cardata.image"></v-img> -->

    <div class="pa-3">
      <span class="text-h5">{{ plans.plan_title }}</span>
      <br />

      Typ: <span class="font-weight-bold">{{ plans.plan_type }}</span>
      <br />
      Price: <span class="font-weight-bold">{{ plans.plan_price }}$ </span>
      <br />

      {{ plan.plan_desc }}
      <br />
      <!-- <v-btn class="red darken-3 mt-2 white--text"
      @click="buttonClick()">Book Session</v-btn> -->
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    plans: {
      type: Array,
      default: () => {},
    },
  },
  methods: {
    // buttonClick() {
    //   this.$emit("bookSession", this.cardata);
    // },
  },
};
</script>

<style lang="css" scoped></style>
