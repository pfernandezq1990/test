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
  },
  data() {
      return {
          
      }
  },

  methods: {
    editItem(item) {},

    deleteItem(item) {},

    addItem() {
      this.$router.push({ name: "AddContact" });
    },
  },
};
</script>