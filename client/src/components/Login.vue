<template>
  <div>
    <div>
      <v-tabs v-model="tab" show-arrows background-color="amber darken-3" icons-and-text dark grow>
        <v-tabs-slider color="amber darken-3"></v-tabs-slider>
        <v-tab v-for="i in tabs" :key="i.name">
          <v-icon color="white" large>{{ i.icon }}</v-icon>
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
                      label="Passwort"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                    <v-btn
                      x-large
                      block
                      :disabled="!valid"
                      color="amber darken-3"
                      @click="validate"
                    >
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
                      label="Vorname"
                      maxlength="20"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="lastName"
                      :rules="[rules.required]"
                      label="Nachname"
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
                      label="Passwort"
                      hint="Mindestens 8 Zeichen"
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
                      label="Passwort bestätigen"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-date-picker v-model="date" color="amber darken-3"></v-date-picker>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                    <v-btn
                      x-large
                      block
                      :disabled="!valid"
                      color="amber darken-3"
                      @click="validate()"
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
  </div>
</template>

<script>
import axios from "axios";
import Vuetify from "vuetify/lib";

export default {
  name: "Login",

  vuetify: new Vuetify(),
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password muss übereinstimmen";
    },
  },

  methods: {
    async getUsers() {
      const users = await axios({ method: "get", url: "http://127.0.0.1:3000/users" });
      return users.data;
    },
    async postUser(firstname, lastname, bday, email, password) {
      await axios({
        method: "post",
        url: "http://localhost:3000/users",
        "content-type": "application/json",
        data: {
          user_firstname: firstname,
          user_lastname: lastname,
          user_birthday: bday,
          user_email: email,
          user_password: password,
        },
      });
    },
    async validate() {
      if (this.$refs.loginForm.validate()) {
        const users = await this.getUsers();
        const loginuser = users.find((element) => element.user_email == this.loginEmail);
        if (loginuser === undefined) {
          alert("Wrong email or password");
        }
        if (loginuser.user_password == this.loginPassword) {
          this.$emit("login", loginuser.user_id);
          this.$router.push("/");
        } else {
          this.loggedIn = false;
          alert("Wrong email or password");
        }
      } else {
        const users = await this.getUsers();
        const registeruser = users.find((element) => element.user_email == this.email);
        console.log(registeruser);
        console.log(
          this.firstName,
          this.lastName,
          this.date,
          this.activitylevel,
          this.email,
          this.password
        );
        if (registeruser === undefined) {
          this.postUser(
            this.firstName,
            this.lastName,
            this.date,
            this.activitylevel,
            this.email,
            this.password
          );
        } else {
          alert("Email already in use");
        }
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
    date: "2000-01-01",
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],
    valid: true,
    activitylevel: 1,
    loggedIn: "false",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      (v) => !!v || "Erforderlich",
      (v) => /.+@.+\..+/.test(v) || "E-mail muss verfügbar sein",
    ],
    emailRules: [
      (v) => !!v || "Erforderlich",
      (v) => /.+@.+\..+/.test(v) || "E-mail muss verfügbar sein",
    ],

    show1: false,
    rules: {
      required: (value) => !!value || "Erforderlich.",
      min: (v) => (v && v.length >= 8) || "Min. 8 Zeichen",
    },
  }),
};
</script>
