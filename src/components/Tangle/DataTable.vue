<!-- src/components/Tangle/DataTable.vue-->

<template>
    <v-container>
        <v-data-table :headers="headers" :items="transaccionData" :no-data-text="'No hay datos para mostrar'"
            class="elevation-1">
            <template v-slot:item="{ item }">
                <tr>
                    <td>{{ item.usuario }}</td>
                    <td class="break-word">{{ item.blockId }}</td>
                    <td class="break-word">{{ item.hashSHA3 }}</td>
                    <td>{{ item.fechaTransaccion }}</td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>
  
<script>
export default {
    name: 'DataTable',
    props: {
        headers: Array,
        transaccionData: Array,
    },
};
</script>
  