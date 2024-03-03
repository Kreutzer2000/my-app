<!-- src/components/Register/ImageCapture.vue -->
<template>
    <v-container class="d-flex justify-center align-center">
        <!-- Botón para abrir el diálogo de opciones -->
        <v-btn v-if="!image" color="primary" @click="showDialog = true">Añadir Imagen de Rostro</v-btn>

        <!-- Diálogo de opciones -->
        <v-dialog v-model="showDialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    Elige una opción
                </v-card-title>
                <v-card-text class="d-flex justify-space-around">
                    <v-btn color="blue" @click="openCameraModal">Usar Cámara</v-btn>
                    <v-btn color="green" @click="clickUpload">Subir Imagen</v-btn>
                    <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" style="display:none" />
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Diálogo para la cámara -->
        <v-dialog v-model="useCamera" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    Captura tu foto
                </v-card-title>
                <v-card-text class="camera-container d-flex justify-center align-center">
                    <video ref="video" width="640" height="480" autoplay class="video-preview"></video>
                    <canvas ref="canvasGuide" width="640" height="480" class="guide-overlay"></canvas>
                </v-card-text>
                <v-card-actions class="d-flex justify-center align-center">
                    <v-btn color="success" @click="capture">Capturar Foto</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Contenedor para la imagen seleccionada o capturada -->
        <div v-if="image" class="image-preview-container">
            <img :src="image" alt="Vista previa de la imagen" class="image-preview" />
            <v-btn color="error" @click="clearImage">Eliminar Imagen</v-btn>
        </div>
    </v-container>
</template>
  
<script>
export default {
    name: "ImageCapture",
    data() {
        return {
            showDialog: false,
            useCamera: false,
            image: null,
        };
    },
    methods: {
        openCameraModal() {
            this.showDialog = false; // Cierra el primer diálogo
            this.useCamera = true; // Abre el diálogo de la cámara
            this.$nextTick(() => {
                this.setupCamera();
            });
        },
        async capture() {
            const video = this.$refs.video;
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
            this.image = canvas.toDataURL("image/png");
            this.useCamera = false; // Desactiva la cámara después de capturar la foto
            this.$emit("imageConfirmed", this.image);
        },
        clearImage() {
            this.image = null;
            // Agregamos lógica para detener la cámara si está activa
            if (this.useCamera) {
                this.stopCamera();
            }
            this.useCamera = false;
        },
        clickUpload() {
            this.$refs.fileInput.click();
        },
        onFileChange(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.image = e.target.result;
                    this.$emit("imageConfirmed", this.image);
                };
                reader.readAsDataURL(file);
            }
            this.showDialog = false;
        },
        async setupCamera() {
            if (this.useCamera && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
                    const video = this.$refs.video;
                    video.srcObject = stream;

                    // Espera hasta que el video esté listo para reproducirse
                    await new Promise(resolve => video.onloadedmetadata = resolve);

                    // Espera la aceptación de permisos y un retardo adicional de 3 segundos antes de proceder
                    await new Promise(resolve => setTimeout(resolve, 3000));

                    // Solo después de esperar, reproduce el video y dibuja las líneas guía
                    await video.play();
                    this.drawGuideLines();
                } catch (err) {
                    console.error("Error accessing the camera", err);
                    this.useCamera = false;
                }
            }
        },
        async stopCamera() {
            if (this.$refs.video && this.$refs.video.srcObject) {
                this.$refs.video.srcObject.getTracks().forEach(track => track.stop());
                this.$refs.video.srcObject = null;
            }
        },
        drawGuideLines() {
            const canvas = this.$refs.canvasGuide;
            if (!canvas) {
                // Si canvas es null, salir de la función
                return;
            }
            const context = canvas.getContext('2d');
            const { width, height } = canvas;

            // Limpia el canvas para actualizar las líneas guía
            context.clearRect(0, 0, width, height);

            // Establece el estilo de las líneas guía
            context.strokeStyle = 'yellow';
            context.lineWidth = 5;
            context.setLineDash([10, 5]); // Crea líneas entrecortadas

            // Dibuja un óvalo en el centro
            let centerX = width / 2;
            let centerY = height / 1.7;
            let radiusX = 100; // Ajusta al tamaño deseado para el ancho del óvalo
            let radiusY = 135;  // Ajusta al tamaño deseado para el alto del óvalo

            context.beginPath();
            context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
            context.stroke();

            canvas.style.display = 'block';
        },
    },
    watch: {
        useCamera(newVal) {
            if (newVal) {
                this.setupCamera();
                this.$nextTick(() => {
                    this.drawGuideLines(); // Dibuja las líneas guía después de abrir la cámara
                });
            }
        },
    },
    mounted() {
        window.addEventListener('resize', this.drawGuideLines); // Redibuja las líneas cuando la ventana se redimensiona
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.drawGuideLines); // Elimina el listener al destruir el componente
    },
};
</script>

<style scoped>
.camera-container,
.image-preview-container {
    /* Ajustes adicionales para la imagen */
    max-width: 640px;/* Centra la imagen verticalmente */
}

.video-preview,
.image-preview {
    width: 100%;
    /* Esto hará que la imagen ocupe todo el ancho del contenedor */
    border-radius: 8px;
    margin-bottom: 20px;
}

.guide-overlay {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    /* Asegura que el canvas no bloquea el evento click en el video */
}
</style>