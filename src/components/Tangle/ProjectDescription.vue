<!-- src/components/Tangle/ProjectDescription.vue-->

<template>
    <div>

        <!-- Descripción del Proyecto y la Arquitectura -->
        <v-row justify="center" class="my-5">
            <v-col cols="12">
                <v-card class="pa-5" elevation="2">
                    <v-row justify="center">
                        <v-col cols="12" md="12" lg="12">
                            <v-sheet elevation="2" class="pa-5" rounded="lg">
                                <h2 class="text-h5 mb-4">Descripción del Proyecto</h2>
                                <p>Este proyecto constituye una Prueba de Concepto (PoC) que ilustra la implementación de
                                    una red Tangle en una arquitectura cliente/servidor.
                                    Los usuarios tienen la capacidad de enviar un archivo encriptado a través de la red
                                    Tangle, que posteriormente es recibido y desencriptado en el servidor. Los desafíos
                                    técnicos abordados incluyen:</p>
                                <v-list dense>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>Configuración de la red Tangle</v-list-item-title>
                                            <v-list-item-subtitle>Se trabajó en establecer una conexión confiable y segura,
                                                lo cual fue esencial para el éxito del proyecto.</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>Implementación de un sistema de encriptación mediante el
                                                algoritmo SHA-3</v-list-item-title>
                                            <v-list-item-subtitle>La encriptación segura de los datos fue un aspecto
                                                crucial.</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>Transmisión segura y eficiente de datos</v-list-item-title>
                                            <v-list-item-subtitle>Se adoptaron medidas específicas para asegurar la
                                                integridad y seguridad de los datos en tránsito.</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                <p class="mt-4">La autenticación de usuarios se lleva a cabo a través de un sistema de
                                    registro e inicio de sesión, permitiendo así la creación de cuentas nuevas o el acceso a
                                    cuentas existentes.
                                    Una vez autenticados, los usuarios pueden acceder a la página principal para subir un
                                    archivo. La lógica del lado del cliente procesa el archivo, calcula el hash SHA-3 y lo
                                    envía al servidor.
                                    El servidor, a su vez, transmite este hash a la red Tangle y registra la información de
                                    la transacción en una base de datos SQL.</p>
                                <p class="mt-4">
                                    Este proyecto ha superado desafíos técnicos significativos, como la configuración de una
                                    conexión confiable y segura con la red Tangle, la implementación de un sistema robusto
                                    de encriptación y hashing, y la transmisión segura y eficiente de datos entre el
                                    cliente, el servidor y la red Tangle.
                                    Además, se ha logrado una comprensión profunda de las tecnologías blockchain y su
                                    aplicación en la garantía de la integridad y seguridad de los datos.
                                    Las futuras implementaciones podrían explorar mejoras en la eficiencia de la
                                    transmisión, expansión de la capacidad de la red y exploración de otras aplicaciones
                                    blockchain en el ámbito de la ciberseguridad.
                                </p>
                                <div class="text-center">
                                    <v-btn href="recursos/documentacion.html" target="_blank" color="primary"
                                        class="mt-5">Ver Documentación Detallada</v-btn>
                                </div>
                            </v-sheet>
                        </v-col>
                    </v-row>

                    <v-row class="mt-4">
                        <v-col cols="12" md="4">
                            <v-card class="pa-3 text-center" elevation="2">
                                <v-img src="https://blog.iota.org/content/images/2021/07/IOTA_SUSEE_Architecture.png"
                                    height="200px" class="mx-auto"></v-img>
                                <h4 class="mt-3">Configuración de Tangle</h4>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-card class="pa-3 text-center" elevation="2">
                                <v-img src="https://i.ytimg.com/vi/bYqbwB7j95U/maxresdefault.jpg" height="200px"
                                    class="mx-auto"></v-img>
                                <h4 class="mt-3">Sistema de Encriptación</h4>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-card class="pa-3 text-center" elevation="2">
                                <v-img :src="transmissionImage" height="200px" class="mx-auto"></v-img>
                                <h4 class="mt-3">Transmisión de Datos</h4>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

    </div>
</template>
  
<script>
export default {
    name: 'ProjectDescription',
    props: ['transmissionImage', 'logo_paip'],
    // Aquí puedes añadir propiedades, métodos, etc., si tu componente los necesita
};
</script>
  
<style scoped>
.v-btn--size-default {
    --v-btn-height: 56px;
}

.v-sheet {
    max-width: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Personalización del botón para que destaque más como un llamado a la acción */
.v-btn {
    padding: 10px 25px;
    font-size: 1rem;
    font-weight: 600;
}

/* Estilos adicionales para las listas, si necesitas */
.v-list-item-title {
    font-weight: 500;
    /* Puedes ajustar el peso de la fuente como desees */
}

.v-list-item-subtitle {
    color: rgba(0, 0, 0, 0.6);
    /* Un color más tenue para los subtítulos */
}

.text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.break-word {
    word-break: break-all;
    max-width: 300px;
    /* Puedes ajustar este valor según lo necesites */
    overflow-wrap: anywhere;
}

.v-list-item {
    align-items: center;
}

.v-list-item-icon {
    margin-right: 10px;
}
</style>