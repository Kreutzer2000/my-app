<!-- src/components/UserRegister.vue -->
<template>
    <div class="d-flex align-center justify-center">
        <v-sheet width="400" class="mx-auto">
            <div class="pt-12 text-center h-screen">
                <v-form @submit.prevent="register" ref="form" enctype="multipart/form-data">
                    <!-- Campos de Texto para Registro -->
                    <v-text-field variant="outlined" v-model="nombre" label="Nombre" required></v-text-field>
                    <v-text-field variant="outlined" v-model="apellido" label="Apellido" required></v-text-field>
                    <v-text-field variant="outlined" v-model="email" label="Email" type="email" required></v-text-field>
                    <v-text-field variant="outlined" v-model="telefono" label="Teléfono" type="tel" required></v-text-field>
                    <v-text-field variant="outlined" v-model="usuario" label="Nombre de Usuario" required></v-text-field>
                    <v-text-field variant="outlined" v-model="contrasena" label="Contraseña" type="password"
                        required></v-text-field>

                    <!-- Componente de Captura de Imagen -->
                    <image-capture @imageConfirmed="handleImageConfirmed"></image-capture>

                    <!-- Botón de Registro -->
                    <v-btn type="submit" color="secondary" block class="mt-2">Registrar</v-btn>
                </v-form>

                <!-- Enlace para Iniciar Sesión -->
                <div class="mt-2 pb-10">
                    <p class="text-body-2">¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión aquí</router-link>
                    </p>
                </div>
            </div>
        </v-sheet>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'; // Importa useRouter
import ImageCapture from './Register/ImageCapture.vue';

export default {
    name: 'UserRegister',
    components: {
        ImageCapture,
    },
    mounted() {
        // require('@/assets/global.css');
    },
    setup() {
        const router = useRouter(); // Utiliza useRouter
        return { router };
    },
    data() {
        return {
            nombre: '',
            apellido: '',
            email: '',
            usuario: '',
            contrasena: '',
            telefono: '',
            faceImage: null,
        };
    },
    methods: {
        esSoloLetras(input) {
            const regex = /^[a-zA-Z\s]+$/;
            return regex.test(input);
        },
        esUsuarioValido(input) {
            const regex = /^[a-zA-Z0-9]+$/;
            return regex.test(input);
        },
        esSoloNumeros(input) {
            const regex = /^\d+$/;
            return regex.test(input);
        },
        esCorreoValido(email) {
            const regex = /\S+@\S+\.\S+/; // Expresión regular para validar el email
            return regex.test(email);
        },
        handleImageConfirmed(imageData) {
            // Aquí tienes la imagen como una cadena base64 que puedes enviar al backend
            this.faceImage = imageData;
        },
        async register() {

            // Validaciones
            if (!this.esSoloLetras(this.nombre) || !this.esSoloLetras(this.apellido)) {
                Swal.fire('Error', 'Nombre y apellido solo deben contener letras.', 'error');
                return;
            }
            if (!this.esUsuarioValido(this.usuario)) {
                Swal.fire('Error', 'El usuario solo puede contener letras y números.', 'error');
                return;
            }
            if (!this.esCorreoValido(this.email)) {
                Swal.fire('Error', 'Por favor, ingrese información válida para el Email. Recuerda que el email siempre debe tener el "@".', 'error');
                return;
            }
            if (!this.esSoloNumeros(this.telefono)) {
                Swal.fire('Error', 'El número de teléfono solo puede contener números.', 'error');
                return;
            }
            if (!this.nombre || !this.apellido || !this.email || !this.telefono || !this.usuario || !this.contrasena) {
                Swal.fire('Error', 'Por favor, complete todos los campos.', 'error');
                return;
            }
            if (!this.faceImage) {
                Swal.fire('Error', 'Por favor, capture o seleccione una imagen de su rostro.', 'error');
                return;
            }

            // Convertir base64 a Blob
            const fetchRes = await fetch(this.faceImage);
            const blob = await fetchRes.blob();

            // Crear un objeto File a partir del Blob
            const file = new File([blob], "userImage.png", { type: "image/png" });

            let formData = new FormData();
            formData.append('nombre', this.nombre);
            formData.append('apellido', this.apellido);
            formData.append('email', this.email);
            formData.append('usuario', this.usuario);
            formData.append('contrasena', this.contrasena);
            formData.append('telefono', this.telefono);
            formData.append('faceImage', file);
            console.log('Form Data:', formData.get('faceImage'));

            try {
                const response = await axios.post('http://localhost:3004/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // Si el servidor responde con éxito
                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registrado con Éxito',
                        text: 'El usuario ha sido registrado exitosamente.'
                    }).then((result) => {
                        if (result.isConfirmed || result.isDismissed) {
                            // Limpia los campos del formulario
                            this.nombre = '';
                            this.apellido = '';
                            this.email = '';
                            this.usuario = '';
                            this.contrasena = '';
                            this.telefono = '';
                            // Redirige al login
                            this.router.push('/login');
                        }
                    });
                } else {
                    // Manejar respuestas que no son de creación exitosa (201)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en el registro',
                        text: response.data || 'Error al registrar usuario'
                    });
                }
            } catch (error) {
                console.error(error);
                // Verificar si es un error de respuesta del servidor
                let message = (error.response && error.response.data) || 'Error en el servidor';
                // Usar SweetAlert para mostrar el error
                Swal.fire({
                    icon: 'error',
                    title: 'Error al Registrar',
                    text: message
                });
            }
        }
    }
};
</script>

