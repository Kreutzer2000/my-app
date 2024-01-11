<!-- src/components/UserRegister.vue -->
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="register-container animate__animated animate__fadeInUp">
                    <h2 class="text-center">Registro</h2>
                    <form @submit.prevent="register">
                        
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input v-model="nombre" type="text" class="form-control" id="nombre" required>
                        </div>
                        <div class="form-group">
                            <label for="apellido">Apellido</label>
                            <input v-model="apellido" type="text" class="form-control" id="apellido" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input v-model="email" type="email" class="form-control" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="telefono">Teléfono</label>
                            <input v-model="telefono" type="tel" class="form-control" id="telefono" required>
                        </div>
                        <div class="form-group">
                            <label for="usuario">Nombre de usuario</label>
                            <input v-model="usuario" type="text" class="form-control" id="usuario" required>
                        </div>
                        <div class="form-group">
                            <label for="contrasena">Contraseña</label>
                            <input v-model="contrasena" type="password" class="form-control" id="contrasena" required>
                        </div>

                        <button type="submit" class="btn btn-primary btn-block">Registrar</button>
                        <div class="text-center mt-3">
                            <router-link to="/login" class="btn btn-link">¿Ya tienes una cuenta? Inicia sesión aquí</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    import axios from 'axios';
    // import Swal from 'sweetalert2'; // Si quieres usar SweetAlert2

    export default {
        name: 'UserRegister',
        mounted() {
            require('@/assets/global.css');
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
            async register() {
                try {
                    const response = await axios.post('http://localhost:3004/register', {
                        nombre: this.nombre,
                        apellido: this.apellido,
                        email: this.email,
                        usuario: this.usuario,
                        contrasena: this.contrasena,
                        telefono: this.telefono
                    });
                    alert('Usuario registrado con éxito');
                    console.log(response.data);
                    // Redirigir al usuario o limpiar el formulario
                } catch (error) {
                    console.error(error);
                    alert('Error al registrar el usuario');
                }
            }
        }
    };
</script>

<style scoped>
    .register-container {
        background-color: #ffffff;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 50%;
        margin: 40px auto;
    }

    .register-container:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    h2 {
        color: #4CAF50;
    }
</style>