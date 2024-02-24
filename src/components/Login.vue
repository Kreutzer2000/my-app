<!-- src/components/Login.vue -->
<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form ref="form" @submit.prevent="login" v-model="valid">
                <!-- Campos de Texto para Usuario y Contraseña -->
                <v-text-field variant="outlined" v-model="usuario" :rules="usuarioRules" label="Nombre de Usuario"
                    required></v-text-field>
                <v-text-field variant="outlined" v-model="contrasena" :rules="contrasenaRules" label="Contraseña"
                    type="password" required></v-text-field>

                <!-- Token (Opcional) -->
                <v-text-field variant="outlined" v-model="token" :rules="tokenRules" label="Token" required></v-text-field>

                <!-- Esta implementacion se va a realizar posteriormente -->
                <a href="#" class="text-body-2 font-weight-regular">¿Olvidaste tu contraseña?</a>
                <!-- Botón de Iniciar Sesión -->
                <v-btn :disabled="!valid" type="submit" color="primary" block class="mt-2">Iniciar Sesión</v-btn>
            </v-form>

            <!-- Enlace para Registrarse -->
            <div class="mt-2">
                <p class="text-body-2">¿No tienes una cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
            </div>
        </v-sheet>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'UserLogin',
    data() {
        return {
            valid: false,
            usuario: '',
            contrasena: '',
            token: '',
            usuarioRules: [
                v => !!v || 'El nombre de usuario es requerido',
            ],
            contrasenaRules: [
                v => !!v || 'La contraseña es requerida',
            ],
            tokenRules: [
                v => !!v || 'El token es requerido',
            ],
        };
    },
    methods: {
        async login() {

            if (this.$refs.form.validate()) {
                // Si todas las validaciones son correctas, proceder con el inicio de sesión
                try {
                    const response = await axios.post('http://authservice.luxen.club/login', {
                        usuario: this.usuario,
                        contrasena: this.contrasena,
                        token: this.token
                    });

                    // Verifica que el userId está presente en la respuesta
                    console.log('Respuesta del servidor:', response.data);

                    if (response.data.userId) {
                        localStorage.setItem('accessToken', response.data.token);
                        localStorage.setItem('userId', response.data.userId);

                        console.log('UserId almacenado:', localStorage.getItem('userId'));
                    } else {
                        console.error('UserId no está presente en la respuesta del servidor');
                    }
                    // Redirigir al usuario a la ruta del sistema
                    this.$router.push('/tangle');
                } catch (error) {
                    // Manejar el error de credenciales inválidas
                    if (error.response && error.response.status === 401) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Su Contraseña o Usuario son incorrectos',
                        });
                    } else {
                        // Manejar otros errores
                        Swal.fire({
                            icon: 'error',
                            title: 'Error en el servidor',
                            text: 'Error al iniciar sesión en el servidor',
                        });
                    }
                    console.error(error);
                }
            } else {
                // Si no, mostrar un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Formulario incompleto',
                    text: 'Por favor complete todos los campos requeridos para iniciar sesión.',
                });
            }

        }
    },
    forceReload() {
        this.$router.go();
    }
};
</script>

