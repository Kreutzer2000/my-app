<template>
    <div>
        <h2>Mi Perfil</h2>
        <!-- Aquí iría la información del perfil del usuario -->
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'UserProfile',
        data() {
            return {
                // datos del perfil
            };
        },
        mounted() {
            this.getProfile();
        },
        methods: {
            async getProfile() {
                // Lógica para obtener información del perfil del microservicio UserService
                const userId = "659c40f445561523df1e8940";
                try {
                    const response = await axios.get(`http://localhost:3001/getUserInfo/${userId}`);
                    this.profileData = response.data;
                } catch (error) {
                    console.error('Error al obtener el perfil', error);
                    // Manejo de errores
                }
            }
        }
    };
</script>
