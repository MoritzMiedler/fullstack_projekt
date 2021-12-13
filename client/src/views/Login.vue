<template>
  <div>
    <Login v-if="!loggedIn"></Login>
    <div v-if="loggedIn">You're already logged in</div>
  </div>
</template>

<script>
import Login from "../components/Login.vue";

export default {
  components: {
    Login,
  },
  props: {
    loggedIn: {
      type: Boolean,
    },
  },
};
</script>

<style lang="css" scoped></style>
