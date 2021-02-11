<template>
  <v-card>
    <v-app-bar 
      app
      fixed 
      color="#fcb69f"
      dark
      src=""
      prominent      
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>           
      
      <v-container class="mx-md-16 px-md-16 my-auto" row>
          <span class="display-2 text-uppercase  white--text mx-4">
            isuc<span class="display-1">orp</span>
          </span>
          <span class="d-none d-sm-flex mx-4 text-subtitle-1">
            World Class <br> Software Development
          </span>
          <v-spacer></v-spacer>
          <v-btn class="d-flex d-sm-none" v-if="link != null" text :to="link">{{text}}</v-btn>
      </v-container>

    </v-app-bar>
    
  </v-card>
</template>

<script>

export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    }
  }
}
</script>

<style>

</style>