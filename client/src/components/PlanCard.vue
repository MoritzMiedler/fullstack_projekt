<template>
  <v-card>
    <!-- <v-img :src="plan.image"></v-img> -->

    <div class="pa-3">
      <span class="text-h5">{{ plan.plan_title }}</span>
      <br />
      Type:
      <span class="font-weight-bold">{{ plan.plan_type }}</span>
      <br />
      Price: <span class="font-weight-bold">{{ plan.plan_price }}</span>
      <br />

      <v-btn class="amber darken-3" :to="'/booksession/' + plan.plan_id + '/' + user_id"
        >Book Session</v-btn
      >
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    plan: {
      type: Object,
      default: () => {},
    },
    user_id: {
      type: Number,
    },
  },

};
</script>

<style lang="scss" scoped></style>
