<!-- src/components/Tangle/FileUploadForm.vue-->

<template>
    <div>
        <v-file-input label="Cargar Archivo" ref="fileInput" clearable placeholder="Seleccione un archivo"
            @change="handleFileChange"
            ></v-file-input>
        <v-btn color="primary" block class="mt-2" :disabled="!selectedFile" @click="upload">
            Subir Archivo
        </v-btn>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            selectedFile: null, // Usamos una nueva propiedad para manejar el archivo seleccionado
        };
    },
    methods: {
        handleFileChange() {
            // Accedemos directamente al archivo desde el evento de cambio
            const file = this.$refs.fileInput.$el.querySelector('input[type="file"]').files[0];
            if (file) {
                this.selectedFile = file; // Establecemos el archivo seleccionado
                console.log('Archivo seleccionado:', this.selectedFile.name);
            }
        },
        upload() {
            if (this.selectedFile) {
                console.log('Subiendo archivo:', this.selectedFile.name);
                this.$emit('upload', this.selectedFile); // Emite el archivo seleccionado al componente padre
                this.selectedFile = null; // Opcional: Limpieza después de la subida
            } else {
                console.error('No se ha seleccionado ningún archivo');
            }
        },
    },
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