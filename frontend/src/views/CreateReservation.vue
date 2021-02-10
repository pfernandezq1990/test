<template>
  <div class="CreateReservation">
      <v-container>
        <ToolBar :title="title" :description="description" :btnText="btnText" :linkBtn="linkBtn"/>
      </v-container>
  </div>
</template>

<script>
import ToolBar from '../components/ToolBar'
export default {
    name: "CreateReservation",
    data() {
        return {
            title: "Create Reservation",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique illum recusandae itaque, ipsam sequi reiciendis reprehenderit ab perspiciatis",
            btnText: "Reservations List",   
            linkBtn: "/",
        }
    },
    components: {
        ToolBar
    },

    mounted() {
        this.link();
        this.linkTo();
        this.textTo();
    },

    methods: {
        link() {
            this.$store.dispatch("link", this.link);    
        },

        linkTo() {
            this.$store.dispatch("link", "/")
        },

        textTo() {
            this.$store.dispatch("text", "Reservations List")
        }
    }

}
</script>

<style>

</style>