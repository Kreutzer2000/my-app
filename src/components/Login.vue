<!-- src/components/Login.vue -->
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="login-container animate__animated animate__fadeInUp">
                    <h2 class="text-center">Iniciar Sesión</h2>
                    <form @submit.prevent="login">
                        <div class="form-group">
                            <label for="usuario">Nombre de usuario</label>
                            <input v-model="usuario" type="text" class="form-control" id="usuario" required>
                        </div>
                        <div class="form-group">
                            <label for="contrasena">Contraseña</label>
                            <input v-model="contrasena" type="password" class="form-control" id="contrasena" required>
                        </div>
                        <div class="form-group">
                            <label for="token">Token</label>
                            <input v-model="token" type="text" class="form-control" id="token" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">Iniciar Sesión</button>
                    </form>
                    <div class="text-center mt-3">
                        <router-link to="/register" class="btn btn-link">¿No tienes una cuenta? Regístrate aquí</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'UserLogin',
    mounted() {
        require('@/assets/global.css');
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

<style scoped>
    .login-container {
        background-color: #ffffff; /* Fondo claro para contrastar con el verde */
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 50%;
        margin: 40px auto; /* Centrar */
    }

    .login-container:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    h2 {
        color: #4CAF50; /* Verde Tangle */
    }
</style>