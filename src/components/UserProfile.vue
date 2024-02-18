<!-- src/components/UserProfile.vue-->
<template>
	<v-container class="fill-height" style="max-width: 100dvh;">
		<v-row justify="center" align="center">
			<v-col cols="12" md="8" lg="6">
				<v-card class="elevation-12" outlined tile>
					<v-toolbar color="primary" dark flat>
						<v-toolbar-title>Mi Perfil</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form ref="form" v-model="valid" lazy-validation>
							<v-text-field label="Nombre" v-model="profile.nombre" :rules="nameRules" required outlined
								dense></v-text-field>
							<v-text-field label="Apellido" v-model="profile.apellido" :rules="nameRules" required outlined
								dense></v-text-field>
							<v-text-field label="Email" v-model="profile.email" :rules="emailRules" required outlined
								dense></v-text-field>
							<v-text-field label="Número de Teléfono" v-model="profile.numeroTelefono" :rules="phoneRules"
								required outlined dense></v-text-field>
							<v-text-field label="Usuario" v-model="profile.usuario" :rules="usernameRules" required outlined
								dense></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions class="px-4 pb-4">
						<v-spacer></v-spacer>
						<v-btn color="secondary" text @click="goBack">Regresar</v-btn>
						<v-btn color="primary" :disabled="!valid" @click="submitProfile">Guardar Cambios</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
	name: 'UserProfile',
	data() {
		return {
			valid: true,
			profile: {
				nombre: '',
				apellido: '',
				email: '',
				numeroTelefono: '',
				usuario: ''
			},
			nameRules: [
				v => !!v || 'El campo es requerido',
				v => (v && v.length <= 50) || 'El nombre no puede exceder los 50 caracteres',
				v => /^[a-zA-Z\s]*$/.test(v) || 'El nombre solo puede contener letras y espacios'
			],
			emailRules: [
				v => !!v || 'El campo es requerido',
				v => /.+@.+\..+/.test(v) || 'Debe ser un email válido'
			],
			phoneRules: [
				v => !!v || 'El campo es requerido',
				v => /^\d+$/.test(v) || 'El número de teléfono solo puede contener números'
			],
			usernameRules: [
				v => !!v || 'El campo es requerido',
				v => /^[a-zA-Z0-9]*$/.test(v) || 'El usuario solo puede contener letras y números',
				v => (v && v.length <= 20) || 'El usuario no puede exceder los 20 caracteres'
			],
		};
	},
	mounted() {
		this.getProfile();
	},
	methods: {
		async getProfile() {
			try {
				const userId = localStorage.getItem('userId');
				if (!userId) {
					throw new Error('No hay userId almacenado');
				}

				const response = await axios.get(`http://localhost:3001/getProfile`, {
					params: {
						userId: userId
					}
				});

				console.log('Respuesta del servidor:', response.data)

				this.profile = response.data;
			} catch (error) {
				console.error('Error al obtener el perfil', error);
				// Manejo de errores, podría ser una notificación o un mensaje en la interfaz
			}
		},
		async submitProfile() {
			if (this.$refs.form.validate()) {
				// Suponiendo que el userId se almacena en localStorage cuando el usuario inicia sesión
				const userId = localStorage.getItem('userId');
				if (!userId) {
					Swal.fire('Error', 'No hay userId almacenado', 'error');
					return;
				}

				// Preparar el objeto de datos que enviarás al servidor
				const profileData = {
					userId, // Incluir el userId en el objeto de datos
					nombre: this.profile.nombre,
					apellido: this.profile.apellido,
					email: this.profile.email,
					usuario: this.profile.usuario,
					numeroTelefono: this.profile.numeroTelefono
				};

				// Hacer la petición POST al servidor para actualizar el perfil
				try {
					const response = await axios.post('http://localhost:3001/updateProfile', profileData);

					// Verificar si la respuesta del servidor es exitosa
					if (response.status === 200 || response.status === 201) {
						// La actualización fue exitosa
						Swal.fire('Éxito', 'Perfil actualizado con éxito', 'success');
						// Aquí podrías también redirigir al usuario o actualizar la UI según sea necesario
					} else {
						// La respuesta del servidor indica que algo salió mal
						Swal.fire('Error', 'Hubo un problema con la actualización del perfil', 'error');
					}
				} catch (error) {
					if (error.response) {
						// El servidor respondió con un estado fuera del rango 2xx
						Swal.fire('Error', `Error al actualizar el perfil: ${error.response.data.message}`, 'error');
					} else if (error.request) {
						// La petición fue hecha pero no se recibió respuesta
						Swal.fire('Error', 'No se recibió respuesta del servidor', 'error');
					} else {
						// Algo ocurrió al configurar la petición que disparó un error
						Swal.fire('Error', error.message, 'error');
					}
				}
			}
		},
		goBack() {
			// Aquí puedes cambiar por la ruta que desees para "Regresar"
			this.$router.push('/tangle'); // O la ruta que desees
		}
	}
};
</script>

<style scoped>
.elevation-12 {
	box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
		0px 12px 17px 2px rgba(0, 0, 0, 0.14),
		0px 5px 22px 4px rgba(0, 0, 0, 0.12);
}

.fill-height {
	margin-top: 64px;
	/* Ajusta este valor según necesites */
	margin-bottom: 64px;
	/* Ajusta este valor según necesites */
}
</style>