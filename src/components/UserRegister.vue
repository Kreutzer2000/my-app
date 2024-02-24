<!-- src/components/UserRegister.vue -->
<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form @submit.prevent="register" ref="form">
                <!-- Campos de Texto para Registro -->
                <v-text-field variant="outlined" v-model="nombre" label="Nombre" required></v-text-field>
                <v-text-field variant="outlined" v-model="apellido" label="Apellido" required></v-text-field>
                <v-text-field variant="outlined" v-model="email" label="Email" type="email" required></v-text-field>
                <v-text-field variant="outlined" v-model="telefono" label="Teléfono" type="tel" required></v-text-field>
                <v-text-field variant="outlined" v-model="usuario" label="Nombre de Usuario" required></v-text-field>
                <v-text-field variant="outlined" v-model="contrasena" label="Contraseña" type="password"
                    required></v-text-field>

                <!-- Botón de Registro -->
                <v-btn type="submit" color="secondary" block class="mt-2">Registrar</v-btn>
            </v-form>

            <!-- Enlace para Iniciar Sesión -->
            <div class="mt-2">
                <p class="text-body-2">¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión aquí</router-link></p>
            </div>
        </v-sheet>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'; // Importa useRouter

export default {
    name: 'UserRegister',
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
            telefono: ''
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

            try {
                const response = await axios.post('http://authservice.luxen.club/register', {
                    nombre: this.nombre,
                    apellido: this.apellido,
                    email: this.email,
                    usuario: this.usuario,
                    contrasena: this.contrasena,
                    telefono: this.telefono
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

