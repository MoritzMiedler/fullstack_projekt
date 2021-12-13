<template>
  <div>
    <Sessions v-if="loggedIn"> </Sessions>
    <div v-if="!loggedIn">
      <h2>Please log in before viewing your Sessions</h2>
    </div>
  </div>
</template>

<script>
import Sessions from "../components/Sessions.vue";

export default {
  components: {
    Sessions,
  },
  props: {
    loggedIn: {
      type: Boolean,
    },
  },
  created() {
    console.log(this.loggedIn);
  },
};
</script>

<style lang="css" scoped></style>
