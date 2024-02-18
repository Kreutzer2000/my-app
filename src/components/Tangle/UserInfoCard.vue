<!-- src/components/Tangle/UserInfoCard.vue-->

<template>
    <v-card class="mt-4">
        <v-card-title>Datos del Usuario</v-card-title>
        <v-card-text>
            <v-list-item-group dense>
                <v-list-item>
                    <v-row align="center">
                        <v-col cols="1">
                            <v-icon>mdi-account</v-icon>
                        </v-col>
                        <v-col cols="11">
                            <v-list-item-content>
                                <v-list-item-title>Nombre y Apellido</v-list-item-title>
                                <v-list-item-subtitle>{{ userData.nombre }} {{ userData.apellido }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-col>
                    </v-row>
                </v-list-item>

                <v-list-item>
                    <v-row align="center">
                        <v-col cols="1">
                            <v-icon>mdi-email</v-icon>
                        </v-col>
                        <v-col cols="11">
                            <v-list-item-content>
                                <v-list-item-title>Email</v-list-item-title>
                                <v-list-item-subtitle>{{ userData.email }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-col>
                    </v-row>
                </v-list-item>

                <v-list-item>
                    <v-row align="center">
                        <v-col cols="1">
                            <v-icon>mdi-phone</v-icon>
                        </v-col>
                        <v-col cols="11">
                            <v-list-item-content>
                                <v-list-item-title>Teléfono</v-list-item-title>
                                <v-list-item-subtitle>{{ userData.numeroTelefono }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-col>
                    </v-row>
                </v-list-item>
            </v-list-item-group>
        </v-card-text>
        <v-card-actions>
            <v-btn color="secondary" @click="$emit('hide')">Ocultar Datos</v-btn>
        </v-card-actions>
    </v-card>
</template>
  
<script>
export default {
    name: 'UserInfoCard',
    props: {
        userData: {
            type: Object,
            required: true,
        },
    },
};
</script>
  