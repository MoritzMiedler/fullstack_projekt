<template>
  <!-- <v-app>
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
      <v-btn to="/Blog" text active-class="amber--text darken-3 " class="mr-3">
        <span class="mx-auto">Blog</span>
      </v-btn>
      <v-btn to="/Login" text active-class="amber--text darken-3 " class="mr-3">
        <span class="mx-auto">Login</span>
      </v-btn>
    </v-app-bar>

    <v-main> -->
  <!-- <v-container>
        <v-layout wrap>
          <v-flex sm12 md6 offset-md3>
            <v-card elevation="4" light tag="section">
              <v-card-title>
                <v-layout align-center justify-space-between>
                  <h3 class="headline">
                    {{ platformName }}
                  </h3>
                  <v-flex>
                    <v-img
                      :alt="platformName"
                      class="ml-3"
                      contain
                      height="48px"
                      position="center right"
                      src="https://www.mobygames.com/images/i/12/25/1435075.png"
                    ></v-img>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p>Sign in with your username and password:</p>
                <v-form>
                  <v-text-field
                    outline
                    label="Username"
                    type="text"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    outline
                    hide-details
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
                <v-btn color="info" flat> Forgot password? </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info" :large="$vuetify.breakpoint.smAndUp">
                  <v-icon left>lock</v-icon>
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex sm12 md6 offset-md3>
            <v-layout align-center justify-space-between>
              <p class="caption my-3">
                <a href="#">Privacy Policy</a>
                |
                <a href="#">Terms of Service</a>
              </p>
              <p class="caption my-3">Powered by <a href="#">StaffCircle</a></p>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container> -->

  <!-- <router-view /> -->
  <!-- </v-main>
  </v-app> -->
  <div id="app">
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
        <v-btn to="/Blog" text active-class="amber--text darken-3 " class="mr-3">
          <span class="mx-auto">Blog</span>
        </v-btn>
        <v-btn to="/Login" text active-class="amber--text darken-3 " class="mr-3">
          <span class="mx-auto">Login</span>
        </v-btn>
      </v-app-bar>
      <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px" v-if="!loggedIn">
        <div>
          <v-tabs
            v-model="tab"
            show-arrows
            background-color="deep-purple accent-4"
            icons-and-text
            dark
            grow
          >
            <v-tabs-slider color="purple darken-4"></v-tabs-slider>
            <v-tab v-for="i in tabs" :key="i">
              <v-icon large>{{ i.icon }}</v-icon>
              <div class="caption py-1">{{ i.name }}</div>
            </v-tab>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form ref="loginForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginEmail"
                          :rules="loginEmailRules"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginPassword"
                          :append-icon="show1 ? 'eye' : 'eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn x-large block :disabled="!valid" color="success" @click="validate">
                          Login
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form ref="registerForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="firstName"
                          :rules="[rules.required]"
                          label="First Name"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="lastName"
                          :rules="[rules.required]"
                          label="Last Name"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          block
                          v-model="verify"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, passwordMatch]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Confirm Password"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                        <v-btn x-large block :disabled="!valid" color="success" @click="validate"
                          >Register</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import Vuetify from "vuetify/lib";

export default {
  el: "#app",
  vuetify: new Vuetify(),
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],
    valid: true,
    loggedIn: "false",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    emailRules: [(v) => !!v || "Required", (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],

    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
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
