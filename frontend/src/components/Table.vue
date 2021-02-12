<template>
  <v-container class="my-5">
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-icon large @click="addItem()"> mdi-plus-thick </v-icon>
        </v-toolbar>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title> Edit Contact </v-card-title>
            <v-card-text>
              <v-container>
                <v-row align="center" justify="center">
                  <validation-observer ref="observer" v-slot="{ invalid }">
                    <form @submit.prevent="editarContact">
                      <!-- Name -->
                      <validation-provider
                        v-slot="{ errors }"
                        name="Name"
                        rules="required|max:20"
                      >
                        <v-text-field
                          v-model="name"
                          :counter="20"
                          :error-message="errors"
                          label="Name"
                          required
                        >
                        </v-text-field>
                      </validation-provider>

                      <!-- Type -->
                      <validation-provider
                        v-slot="{ errors }"
                        name="type"
                        rules="required"
                      >
                        <v-select
                          :error-messages="errors"
                          required
                          :items="itemsType"
                          item-text="name"
                          label="Contact Type"
                          v-model="type"
                        ></v-select>
                      </validation-provider>

                      <!-- Phone -->
                      <validation-provider
                        v-slot="{ errors }"
                        name="phone"
                        :rules="{
                          required: true,
                          digits: 10,
                        }"
                      >
                        <v-text-field
                          v-model="phone"
                          :counter="10"
                          :error-messages="errors"
                          label="Phone"
                          required
                        ></v-text-field>
                      </validation-provider>

                      <v-datetime-picker label="Select Datetime" v-model="date">
                      </v-datetime-picker>
                      <v-row>
                        <v-btn
                          color="red darken-2"
                          text
                          class="mr-4 my-5"
                          type="submit"
                          :disabled="invalid"
                        >
                          Save
                        </v-btn>

                        <v-btn
                          color="red darken-2"
                          class="my-5"
                          text
                          @click="close"
                        >
                          Back
                        </v-btn>
                      </v-row>
                    </form>
                  </validation-observer>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
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
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: [],
    },
    title: {
      type: String,
      required: true,
    },
    api: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      name: null,
      type: null,
      phone: null,
      date: null,
      dialog: false,
      id: null,
      itemsType: [
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
    ValidationProvider,
    ValidationObserver,
    DatetimePicker,
  },

  methods: {
    editItem(item) {
      this.id = item.id;
      this.name = item.name;
      this.type = item.contactType;
      this.phone = item.phone;
      this.dialog = true;
    },

    close() {
      this.dialog = false;
    },

    deleteItem(item) {
      let id = item.id;
      console.log(id);
      axios.delete(`${this.api}/${id}`).then(() => {
        this.$store.dispatch("loadContacts", this.api);
      });
    },

    editarContact() {
      this.$refs.observer.validate();
      let datos = {
        id: this.id,
        name: this.name,
        contactType: this.type,
        phone: this.phone,
        birthdate: this.date,
      };
      axios.put(`${this.api}/${this.id}`, datos).then(() => {
          this.dialog = false;
        this.$store.dispatch("loadContacts", this.api);
      });      
    },

    addItem() {
      this.$router.push({ name: "AddContact" });
    },
  },
};
</script>