<template>
  <!-- <v-main>  -->

  <!-- <router-view /> -->
  <!-- </v-main> -->

  <div>
    <v-app>
      <v-app-bar app color="black--transparent" dark>
        <div class="d-flex align-center">
          <v-img
            alt="Logo"
            class="mr-2"
            contain
            src="/images/Logo.svg"
            transition="scale-transition"
            width="175"
          />
        </div>
        <v-spacer></v-spacer>

        <v-btn to="/" text active-class="amber--text darken-3 " class="mr-3">
          <span class="mx-auto">Home</span>
        </v-btn>
        <v-btn to="/Sessions" text active-class="amber--text darken-3 " class="mr-3">
          <span class="mx-auto">Sessions</span>
        </v-btn>
        <v-btn to="/Plans" text active-class="amber--text darken-3 " class="mr-3">
          <span class="mx-auto">Plans</span>
        </v-btn>
        <v-btn to="/Login" text active-class="amber--text darken-3 " v-if="!loggedIn" class="mr-3">
          <span class="mx-auto">Login</span>
        </v-btn>
      </v-app-bar>
      <v-main>
        <router-view :id="id" :user_id="id" :loggedIn="loggedIn" @login="loginplusid($event)" />
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false,
      id: Number,
    };
  },
  created() {},
  methods: {
    loginplusid(id) {
      console.log(id);
      this.id = id;
      this.loggedIn = true;
    },
  },
};
</script>
<style>
html::-webkit-scrollbar {
  width: 6px;
}
html::-webkit-scrollbar-thumb {
  background: rgb(255, 171, 60) 100%;
  border-radius: 5px;
}
html {
  scrollbar-width: thin;
  scrollbar-color: rgb(255, 171, 60) rgb(51, 51, 51);
}
.v-btn,
.v-card {
  border-radius: 4px;
}
.v-card__title {
  text-transform: uppercase;
}
</style>
