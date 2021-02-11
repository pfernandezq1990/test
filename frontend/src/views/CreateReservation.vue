<template>
  <div class="CreateReservation">
    <v-container>
        <ToolBar :title="title" :description="description" :btnText="btnText" :linkBtn="linkBtn"/>
    </v-container>

      
    <v-container>       
        <v-card>
            <v-card-title>
                <h2>Contact Information</h2>
            </v-card-title>
            <v-card-text>
                <form @submit.prevent="submit">
                    <v-row align="center">
                        <v-col cols="12" xs="12" sm="3" md="3">
                            <v-autocomplete
                                @change="autoComplete"
                                :items="listContac"
                                item-text="name"
                                return-object            
                                label="Name"   
                                v-model="item"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" xs="12" sm="3" md="3">
                            <v-select
                                :items="items"
                                item-text="name"
                                label="Contact Type"
                                v-model="type"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" xs="12" sm="3" md="3">
                            <v-text-field 
                                label="Phone"
                                v-model="phone"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" sm="3" md="3">
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
                </form>
            </v-card-text>
        </v-card>        
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
                apiContacs: "https://localhost:5001/api/Contact",
                listContac: [],
                item: null,
                menu: false, 
                items: [
                    {
                        name: "Contact Type 1", value: 0
                    },
                    {
                        name: "Contact Type 2", value: 1
                    },
                    {
                        name: "Contact Type 3", value: 2
                    }
                ],
                date: null,
                type: null,
                phone: null,
            }
        },
        
        components: {
            ToolBar
        },

        watch: {
            menu (val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            },
        },
        mounted() {
            this.linkTo();
            this.textTo();
            this.loadContacts();
        },    
        
        computed: {
            contactList () {
                return this.listContac = this.$store.getters.Contacts;
            },              
            
        },

        methods: {

            linkTo() {
                this.$store.dispatch("link", "/")
            },

            textTo() {
                this.$store.dispatch("text", "Reservations List")
            },

            loadContacts() {
                this.$store.dispatch("loadContacts", this.apiContacs)
            },

            save (date) {
                this.$refs.menu.save(date)
            },

            autoComplete() {
                if (this.item != null) {
                    this.type = this.item.contactType;
                    this.phone = this.item.phone;
                    this.date = new Date(this.item.birthdate).toISOString().substr(0, 10);
                }
                console.log(this.item);
            }
        }
    }    


</script>

<style>

</style>