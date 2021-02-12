<template>
  <div class="Contacs">
    <v-container>
      <ToolBar
        :title="title"
        :description="description"
        :btnText="btnText"
        :linkBtn="linkBtn"
      />
    </v-container>
    <v-container class="my-5">
      <Table :headers="headers" :title="titleTable" :items="Tolist" :api="api" />
    </v-container>
  </div>
</template>

<script>
import Table from "../components/Table";
import ToolBar from '../components/ToolBar'

export default {
  name: "Contacs",
  data() {
    return {
      api: "https://localhost:5001/api/contact",
      titleTable: "Contacts List",
      title: "",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique illum recusandae itaque, ipsam sequi reiciendis reprehenderit ab perspiciatis",
      btnText: "Create Reservation",
      linkBtn:"/CreateReservation",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        {
          text: "Contact Type ",
          align: "start",
          value: "contactType",
        },
        {
          text: "Phone Number",
          align: "start",
          value: "phone",
        },
        {
          text: "Birth Date",
          align: "start",
          value: "birthdate",
        },
        {
          text: "Actions",
          sortable: false,
          value: "actions",
        },
      ],
      items: [],
    };
  },
  components: {
    Table, ToolBar
  },

  mounted() {
    this.loadContacts();
  },

  computed: {
    Tolist() {
      return this.$store.getters.Contacts;
    },
  },

  methods: {
    loadContacts() {
      this.$store.dispatch("loadContacts", this.api);
    },
  },
};
</script>

<style>
</style>