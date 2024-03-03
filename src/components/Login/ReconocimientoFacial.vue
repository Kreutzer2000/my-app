<!-- /src/components/Login/ReconocimientoFacial.vue -->

<template>
    <div>
        <!-- Mostrar el video stream de la cámara -->
        <video ref="video" width="640" height="480" autoplay></video>
        <button @click="capturarFoto">Capturar Foto</button>
        <!-- Mostrar la foto capturada -->
        <canvas ref="canvas" width="640" height="480" style="display:none;"></canvas>
    </div>
</template>
  
<script>
export default {
    mounted() {
        this.iniciarCamara();
    },
    methods: {
        iniciarCamara() {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    this.$refs.video.srcObject = stream;
                })
                .catch(error => {
                    console.error("Error al acceder a la cámara:", error);
                });
        },
        capturarFoto() {
            const context = this.$refs.canvas.getContext('2d');
            context.drawImage(this.$refs.video, 0, 0, 640, 480);
            // Opcional: detener el stream de la cámara después de capturar la foto
            this.$refs.video.srcObject.getTracks().forEach(track => track.stop());
            // Convertir la imagen del canvas a Blob y enviarla al backend
            this.$refs.canvas.toBlob(blob => {
                const formData = new FormData();
                formData.append('faceImage', blob, 'faceImage.png');
                // Aquí enviarías formData al backend utilizando axios o fetch
            }, 'image/png');
        }
    }
};
</script>
  
  