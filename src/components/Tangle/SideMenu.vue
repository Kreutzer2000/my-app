<!-- src/components/Tangle/SideMenu.vue-->

<template>
    <v-navigation-drawer v-model="localDrawer" app>
        <v-list>
            <v-list-item link href="/profile">
                <v-list-item-title>Mi Perfil</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="emitLogout">
                <v-list-item-title>Cerrar Sesión</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
  
<script>
export default {
    name: 'SideMenu',
    props: {
        drawer: Boolean
    },
    computed: {
        localDrawer: {
            get() {
                return this.drawer;
            },
            set(value) {
                this.$emit('update:drawer', value);
            }
        }
    },
    methods: {
        emitLogout() {
            this.$emit('logout');
        }
    }
};
</script>
  
<style scoped>

</style>