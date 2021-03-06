<template>
  <div class="AddNewContact">
    <v-container>
      <ToolBar
        :title="title"
        :description="description"
        :btnText="btnText"
        :linkBtn="linkBtn"
      />
    </v-container>
    <v-card max-width="374" class="mx-auto my-12" color="white" elevation="5">
      <v-card-title>
        <v-icon large>mdi-account-plus</v-icon>
      </v-card-title>
      <v-card-text>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:10"
            >
              <v-text-field
                v-model="name"
                :counter="15"
                :error-messages="errors"
                label="Name"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="type"
              rules="required"
            >
              <v-select
                :error-messages="errors"
                required
                :items="items"
                item-text="name"
                label="Contact Type"
                v-model="type"
              ></v-select>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="phoneNumber"
              :rules="{
                required: true,
                digits: 10,
              }"
            >
              <v-text-field
                v-model="phoneNumber"
                :counter="10"
                :error-messages="errors"
                label="Phone Number"
                required
              ></v-text-field>
            </validation-provider>

            <v-datetime-picker label="Select Datetime" v-model="date">
            </v-datetime-picker>

            <v-btn class="mr-4" type="submit" :disabled="invalid">
              submit
            </v-btn>
            <v-btn @click="clear"> clear </v-btn>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
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
  data() {
    return {
      name: null,
      phoneNumber: null,
      type: null,
      menu: false,
      title: "Add New Contact",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique illum recusandae itaque, ipsam sequi reiciendis reprehenderit ab perspiciatis",
      date: null,
      btnText: "Reservations List",
      linkBtn: "/",
      items: [
        {
          name: "Contact Type 1",
          value: "Contact Type 1",
        },
        {
          name: "Contact Type 2",
          value: "Contact Type 2",
        },
        {
          name: "Contact Type 3",
          value: "Contact Type 3",
        },
      ],
    };
  },

  components: {
    ToolBar,
    ValidationProvider,
    ValidationObserver,
    DatetimePicker,
  },

  mounted() {
    this.linkTo();
    this.textTo();
  },

  methods: {
    linkTo() {
      this.$store.dispatch("link", "/");
    },

    textTo() {
      this.$store.dispatch("text", "Reservations List");
    },

    save(date) {
      this.$refs.menu.save(date);
    },
    submit() {
      this.$refs.observer.validate();
      let datos = {
        name: this.name,
        contactType: this.type,
        phone: this.phoneNumber,
        birthdate: this.date,
      };
      axios
        .post("https://localhost:5001/api/contact", datos)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    toFormData(obj) {
      var formData = new FormData();
      for (var key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    },

    clear() {
      this.name = null;
      this.type = null;
      this.phoneNumber = null;
      this.date = null;
    },
  },
};
</script>

<style>
</style>