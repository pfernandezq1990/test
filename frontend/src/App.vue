<template>

  <v-app>   

    <AppBar :link="getLink" :text="getText"/>

    <v-main>
      <v-container fluid>
        <router-view></router-view>  
      </v-container>    
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar';

export default {
  name: 'App',  

  components: { AppBar},
  data: () => ({
    linkTo: "/CreateReservation",
    textTo: "Create Reservation",
  }),

  mounted() {
    this.getLink;
    this.getText;
  },

  computed: {
    getLink() {
      return this.$store.getters.Link;
    },

    getText() {
      return this.$store.getters.Text;
    }
  },
  
};
</script>
