<!-- src/components/Login.vue -->
<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form @submit.prevent="login">
                <!-- Campos de Texto para Usuario y Contraseña -->
                <v-text-field variant="outlined" v-model="usuario" label="Nombre de Usuario" required></v-text-field>
                <v-text-field variant="outlined" v-model="contrasena" label="Contraseña" type="password" required></v-text-field>
                
                <!-- Token (Opcional) -->
                <v-text-field variant="outlined" v-model="token" label="Token" required></v-text-field>
                
                <!-- Esta implementacion se va a realizar posteriormente -->
                <a href="#" class="text-body-2 font-weight-regular">¿Olvidaste tu contraseña?</a>
                <!-- Botón de Iniciar Sesión -->
                <v-btn type="submit" color="primary" block class="mt-2">Iniciar Sesión</v-btn>
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
    mounted() {
        // require('@/assets/global.css');
    },
    data() {
        return {
            usuario: '',
            contrasena: '',
            token: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:3004/login', {
                    usuario: this.usuario,
                    contrasena: this.contrasena,
                    token: this.token
                });
                
                // Almacenar el token JWT en el almacenamiento local
                localStorage.setItem('accessToken', response.data.token);
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
                        title: 'Error',
                        text: 'Error al iniciar sesión',
                    });
                }
                console.error(error);
            }
        }
    },
    forceReload() {
        this.$router.go();
    }
};
</script>

