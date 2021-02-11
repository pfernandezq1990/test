<template>
  <div class="CreateReservation">
    <v-container>
      <ToolBar
        :title="title"
        :description="description"
        :btnText="btnText"
        :linkBtn="linkBtn"
      />
    </v-container>

    <v-container>
      <v-card>
          
        <v-card-title>
          <h3 class="grey--text">Contact Information</h3>
          <v-spacer></v-spacer>
          <v-btn rounded color="grey" class="white--text" :to="linkContac">Add new contact</v-btn>
        </v-card-title>
        <v-card-text>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submit">
              <v-row align="center">
                <validation-provider
                  v-slot="{ errors }"
                  name="item"
                  rules="required|max:15"
                >
                  <v-col cols="12" xs="12">
                    <v-autocomplete
                      required
                      :counter="15"
                      :error-messages="errors"
                      @change="autoComplete"
                      :items="contactList"
                      item-text="name"
                      return-object
                      label="Name"
                      v-model="item"
                    ></v-autocomplete>
                  </v-col>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="type"
                  rules="required"
                >
                  <v-col cols="12" xs="12">
                    <v-select
                      :error-messages="errors"
                      required
                      :items="items"
                      item-text="name"
                      label="Contact Type"
                      v-model="type"
                    ></v-select>
                  </v-col>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="phone"
                  :rules="{
                    required: true,
                    digits: 12,
                  }"
                >
                  <v-col cols="12" xs="12">
                    <v-text-field
                      :error-messages="errors"
                      required
                      :counter="12"
                      label="Phone"
                      v-model="phone"
                    ></v-text-field>
                  </v-col>
                </validation-provider>
                <v-col cols="12" xs="12" sm="4" md="4" lg="4">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Birthday date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="date"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>                
              </v-row>
              <v-divider class="my-16" color="black"></v-divider>
              <v-card-title>
                <h3 class="grey--text">Reservation data</h3>
              </v-card-title>

              <!-- Reservation -->

              <v-row class="my-5" align="center">
                <validation-provider
                  v-slot="{ errors }"
                  name="titleR"
                  rules="required|max:25"
                >
                  <v-col cols="12" xs="12">
                    <v-text-field
                      v-model="titleR"
                      :counter="25"
                      :error-messages="errors"
                      label="Title"
                      required
                    ></v-text-field>
                  </v-col>
                </validation-provider>

                <v-col cols="12" xs="12" sm="4" md="4" lg="4">
                  <v-datetime-picker label="Select Datetime" v-model="datetime">
                  </v-datetime-picker>
                </v-col>

                <validation-provider
                  v-slot="{ errors }"
                  name="ranking"
                  rules="required"
                >
                  <v-col cols="12" xs="12">
                    <v-select
                      :error-messages="errors"
                      required
                      :items="itemsRanking"
                      label="Ranking"
                      v-model="ranking"
                    ></v-select>
                  </v-col>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="switch1"
                  rules="required"
                >
                  <v-col cols="12" xs="12">
                    <v-switch
                      v-model="switch1"
                      label="Favorite"
                      :error-messages="errors"
                    ></v-switch>
                  </v-col>
                </validation-provider>
              </v-row>
              <v-row>
                <v-btn class="mr-4" type="submit" :disabled="invalid">
                  submit
                </v-btn>                
              </v-row>
            </form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import DatetimePicker from "vuetify-datetime-picker";
import { required, digits, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import ToolBar from "../components/ToolBar";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

export default {
  name: "CreateReservation",
  data() {
    return {
      title: "Create Reservation",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique illum recusandae itaque, ipsam sequi reiciendis reprehenderit ab perspiciatis",
      btnText: "Reservations List",
      linkBtn: "/",
      linkContac: "/AddContact",
      apiContacs: "https://localhost:5001/api/Contact",
      listContac: [],
      item: null,
      menu: false,
      items: [
        {
          name: "Contact Type 1",
          value: 0,
        },
        {
          name: "Contact Type 2",
          value: 1,
        },
        {
          name: "Contact Type 3",
          value: 2,
        },
      ],
      date: null,
      type: null,
      phone: null,
      today: new Date().toISOString().substr(0, 10),

      //Reservation field
      itemsRanking: [1, 2, 3, 4, 5],
      titleR: "",
      datetime: null,
      ranking: null,
      switch1: false,
    };
  },

  components: {
    ToolBar,
    ValidationProvider,
    ValidationObserver,
    DatetimePicker,
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  mounted() {
    this.linkTo();
    this.textTo();
    this.loadContacts();
  },

  computed: {

    contactList() {
        return this.$store.getters.Contacts;
    },

  },

  methods: {
    linkTo() {
      this.$store.dispatch("link", "/");
    },

    textTo() {
      this.$store.dispatch("text", "Reservations List");
    },

    loadContacts() {
      this.$store.dispatch("loadContacts", this.apiContacs);
    },

    save(date) {
      this.$refs.menu.save(date);
    },

    autoComplete() {
      if (this.item != null) {
        this.type = this.item.contactType;
        this.phone = this.item.phone;
        this.date = new Date(this.item.birthdate).toISOString().substr(0, 10);
      }
      console.log(this.item);
    },

    submit() {
      this.$refs.observer.validate();
      let datos = {
        title: this.titleR,
        date: this.datetime,
        ranking: this.ranking,
        favorite: this.switch1,
        contactid: this.item.id,
      };
      axios
        .post("https://localhost:5001/api/Bookings", datos)
        .then(() => {
          this.$router.push({ name: "Home" });
        });
    },       

    getDate() {
      return new Date();
    },
  },
};
</script>

<style>
</style>