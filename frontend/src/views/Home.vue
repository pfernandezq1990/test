<template>
  <div class="home">
      <v-container>
        <v-row justify="space-around" align="center">

          <v-col cols="12" xs="12" sm="4" md="4">
            <h2 class="red--text">Reservation List</h2>
          </v-col>
          <v-col cols="12" xs="12" md="4" lg="4">
            <span class="text--subtitle-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, neque laborum. Voluptatibus odit quis temporibus asperiores</span>
          </v-col>
          <v-col cols="12" xs="12" md="4" lg="4" class="d-none d-sm-flex">
            <v-btn rounded color="grey" class="white--text"> Create Reservation </v-btn>
          </v-col>
        </v-row>
      </v-container>     

      <v-container class="my-5">

        <v-menu custom rounded offset-y color="grey" >
          <template v-slot:activator="{attrs, on}">
            <v-btn
              color="grey"
              class="white--text ma-5"
              v-bind="attrs"
              v-on="on"
            >
              {{sort}}
            </v-btn>
          </template>

          <v-list >
            <v-list-item v-for="item in itemList" :key="item" link>
              <v-list-item-title v-text="item" @click="sortBy(item)"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
         <v-card flat v-for="reservation in bookings" :key="reservation.id" align="center">

            <v-layout row wrap :class="`pa-3 reservation ${reservation.favorite}`">
              <v-col xs="6" sm="3" md="3">
                <div>{{ reservation.title}}</div>
                <div class="caption grey--text">{{ reservation.date}}</div>
              </v-col>
              <v-col sm="3" md="3" class="d-none d-sm-flex">
                  <div>
                  Ranking <br> <v-rating color="amber" :value="reservation.ranking" dense readonly size="14"></v-rating>
                  </div>
              </v-col>
              <v-col xs="3" sm="3" md="3">
                  <v-btn text v-if="reservation.favorite" @click="addFavorite(reservation.id)"> Add Favorites <v-icon> mdi-heart-settings </v-icon></v-btn>
                  <v-btn text disabled v-if="!reservation.favorite" > Add Favorites <v-icon> mdi-heart-settings </v-icon></v-btn>
              </v-col>              
              <v-col xs="3" sm="3" md="3">
                <v-btn>Edit</v-btn>
              </v-col>
            </v-layout>           
         </v-card>
      </v-container>

  </div>

</template>

<script>
export default { 
  name: "home",
  data() {
    return {
      api: "https://localhost:5001/api/Bookings", 
      sort: "Sort By",
      itemList: [
        "By Date Ascending",
        "By Date Descending",
        "By Alphabetic Ascending",
        "By Alphabetic Descending",
        "By Ranking"
      ],  
    }
  },

  mounted() {
    this.LoadReservations();
  }, 

  computed: {
    bookings() {
      return this.$store.getters.Reservations;
    }
  },
  
  methods: {

    LoadReservations() {
      this.$store.dispatch("loadReservations", this.api);
    },

    sortBy(prop) {
      this.sort = prop;

      if (prop === "By Ranking") 
      {
        this.bookings.sort((a,b) => (a.ranking < b.ranking) ? -1 : 1)
      }
      if (prop == "By Alphabetic Ascending") 
      {
        this.bookings.sort((a,b) => (a.title > b.title ) ? -1 : 1)
      }
      if (prop == "By Alphabetic Descending") 
      {
        this.bookings.sort((a,b) => (a.title < b.title ) ? -1 : 1)
      }
      if (prop == "By Date Ascending") 
      {
        this.bookings.sort((a,b) => (a.date > b.date ) ? -1 : 1)
      }
      if (prop == "By Date Descending") 
      {
        this.bookings.sort((a,b) => (a.title < b.title ) ? -1 : 1)
      }
      
    },

    addFavorite(id) {
      
    }
  }
  
}
</script>

<style>
.reservation.true {
  border-left: 4px solid red;
}
.reservation.false {
  border-left: 5px solid white;
}
</style>
