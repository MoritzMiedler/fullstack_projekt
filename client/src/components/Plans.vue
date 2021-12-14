<template>
  <v-row class="d-flex flex-wrap"
    ><PlanCard
      class="ma-5 d-flex flex-column justify-end"
      style="width: 400px"
      v-for="(plan, i) in plans"
      :key="i"
      :plan="plan"
      :user_id="user_id"
    ></PlanCard
  ></v-row>
</template>

<script>
import PlanCard from "@/components/PlanCard.vue";

export default {
  data() {
    return {};
  },
  props: {
    plans: {
      type: Array,
    },
    user_id: {
      type: Number,
    },
  },
  components: {
    PlanCard,
  },
};
</script>

<style lang="scss" scoped></style>
