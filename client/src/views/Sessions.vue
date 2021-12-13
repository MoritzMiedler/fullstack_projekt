<template>
  <div>
    <Sessions :id="id" v-if="loggedIn" :loggedIn="loggedIn"> </Sessions>
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
    id: {
      type: Number,
    },
  },
  created() {
    console.log(this.loggedIn);
  },
};
</script>

<style lang="css" scoped></style>
