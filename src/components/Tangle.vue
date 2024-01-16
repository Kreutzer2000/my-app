<!--src/components/Tangle.vue-->
<template>

    <v-container class="fill-height" fluid>

        <v-app-bar app color="primary" dark>
            <!-- Logo e ícono de menú para pantallas pequeñas -->
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            
                <v-img :src="logo_paip" alt="Logo PAIP" height="40" max-width="5%"></v-img>
            
            <v-col cols="auto" class="subtitle-1 white--text">
                        PoC - Luxen
                    </v-col>
            <v-spacer></v-spacer>

            <!-- Enlaces de navegación -->
            <v-btn text href="/profile">Mi Perfil</v-btn>
            <v-btn text @click="logout">Cerrar Sesión</v-btn>
        </v-app-bar>
    
        <!-- Menú lateral para pantallas pequeñas -->
        <v-navigation-drawer v-model="drawer" app>
            <v-list>
                <v-list-item link href="/profile">
                    <v-list-item-title>Mi Perfil</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="logout">
                    <v-list-item-title>Cerrar Sesión</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- Contenido Principal -->
        <v-main>
            <v-container>
		<v-row justify="center">
			<v-col cols="12" md="8" class="text-center">
				<h1>Red Tangle Cliente/Servidor</h1>
				<p>
					Realizado por Renzo Di Paola Jara - Desarrollador Full Stack .Net, Python y NodeJS
				<br>
					<a href="recursos/renzo_actualizadoCV.pdf" target="_blank">Ver CV</a> | <a href="recursos/mdmn.pdf" target="_blank">Ver trabajo relacionado</a>
				</p>
			</v-col>
		</v-row>
    
		<v-row justify="center">
			<v-col cols="12" md="6">
				<v-alert type="info">
					Ten en cuenta que mientras más grande sea el tamaño del archivo, más tiempo podría demorar su procesamiento en la red Tangle.
				</v-alert>
                <br>
				
                <v-file-input label="Cargar Archivo" class="mb-2" ref="fileInput"></v-file-input>
                <v-btn color="primary" block class="mt-2" @click="uploadFile">Subir Archivo</v-btn>

                <br>
                <!-- Sección de Notificaciones -->
		<v-alert
                    v-model="showAlert"
                    :type="alertType"
                    dismissible>
                    {{ alertMessage }}
                    <span v-if="showAlert"> (Desaparecerá en {{ timerCount }} segundos)</span>
                </v-alert>

				<v-text-field label="Ingresa el Block ID" class="mt-2" v-model="blockId"></v-text-field>
				<v-btn color="secondary" block class="mt-2" @click="retrieveFile(blockId)">Consultar BlockID</v-btn>
                
				<v-row justify="center" class="mt-4">
					<v-col cols="4">
						<v-text-field label="Ingresa el teléfono" v-model="phone"></v-text-field>
					</v-col>
					<v-col cols="4">
						<v-select :items="users" label="Selecciona un usuario" v-model="selectedUser"></v-select>
					</v-col>
					<v-col cols="4">
						<v-btn color="secondary" block @click="retrieveFileByPhone(phone)">Recuperar Archivo</v-btn>
					</v-col>
				</v-row>
            
				<v-btn color="info" block class="mt-4" @click="obtenerDatos">Obtener Datos</v-btn>
            
				<!-- Tarjeta para mostrar los datos del usuario -->
                <v-card v-if="showUserData" class="mt-4">
                    <v-card-title>Datos del Usuario</v-card-title>
                    <v-card-text>
                        <v-list-item-group dense>
                            <v-list-item>
                                <v-row align="center">
                                    <v-col cols="1">
                                        <v-icon>mdi-account</v-icon>
                                    </v-col>
                                    <v-col cols="11">
                                        <v-list-item-content>
                                            <v-list-item-title>Nombre y Apellido</v-list-item-title>
                                            <v-list-item-subtitle>{{ userData.nombre }} {{ userData.apellido }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-col>
                                </v-row>
                            </v-list-item>
                            
                            <v-list-item>
                                <v-row align="center">
                                    <v-col cols="1">
                                        <v-icon>mdi-email</v-icon>
                                    </v-col>
                                    <v-col cols="11">
                                        <v-list-item-content>
                                            <v-list-item-title>Email</v-list-item-title>
                                            <v-list-item-subtitle>{{ userData.email }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-col>
                                </v-row>
                            </v-list-item>
                            
                            <v-list-item>
                                <v-row align="center">
                                    <v-col cols="1">
                                        <v-icon>mdi-phone</v-icon>
                                    </v-col>
                                    <v-col cols="11">
                                        <v-list-item-content>
                                            <v-list-item-title>Teléfono</v-list-item-title>
                                            <v-list-item-subtitle>{{ userData.numeroTelefono }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-col>
                                </v-row>
                            </v-list-item>
                        </v-list-item-group>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="secondary" @click="ocultarDatos">Ocultar Datos</v-btn>
                    </v-card-actions>
                </v-card>
			</v-col>
		</v-row>

        <!-- Contenedor para la tabla de datos y archivos asociados -->
        <v-container>
            <!-- Sección de Tabla de Datos -->
            <v-row justify="center">
                <v-col cols="12" md="6">
                    <v-btn color="primary" @click="toggleDataContainer">Ocultar/Mostrar Datos</v-btn>
                    <v-container v-show="showDataContainer">
                        <v-simple-table class="mt-4">
                            <thead>
                                <tr>
                                    <th class="text-center">Usuario</th>
                                    <th class="text-center">BlockID</th>
                                    <th class="text-center">HashSHA3</th>
                                    <th class="text-center">Fecha de Transacción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Aquí se insertarán las filas de datos desde JavaScript -->
                            </tbody>
                        </v-simple-table>
                    </v-container>
                </v-col>
            </v-row>
        
            <!-- Sección de Archivos Asociados -->
            <v-row justify="center">
                <v-col cols="12" md="6">
                    <h3>Archivos asociados:</h3>
                    <v-container v-show="showFilesList">
                        <!-- Aquí se insertarán los archivos desde JavaScript -->
                        <p v-if="!files.length">No hay archivos para mostrar.</p>
                    </v-container>
                </v-col>
            </v-row>
        
            <!-- Descripción del Proyecto y la Arquitectura -->
            <v-row justify="center" class="my-5">
                <v-col cols="12">
                    <v-card class="pa-5" elevation="2">
                        <v-row justify="center">
                            <v-col cols="12" md="10" lg="8">
                                <v-sheet elevation="2" class="pa-5" rounded="lg">
                                    <h2 class="text-h5 mb-4">Descripción del Proyecto</h2>
                                    <p>Este proyecto constituye una Prueba de Concepto (PoC) que ilustra la implementación de una red Tangle en una arquitectura cliente/servidor. 
					Los usuarios tienen la capacidad de enviar un archivo encriptado a través de la red Tangle, que posteriormente es recibido y desencriptado en el servidor. Los desafíos técnicos abordados incluyen:</p>
                                    <v-list dense>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Configuración de la red Tangle</v-list-item-title>
                                                <v-list-item-subtitle>Se trabajó en establecer una conexión confiable y segura, lo cual fue esencial para el éxito del proyecto.</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Implementación de un sistema de encriptación mediante el algoritmo SHA-3</v-list-item-title>
                                                <v-list-item-subtitle>La encriptación segura de los datos fue un aspecto crucial.</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Transmisión segura y eficiente de datos</v-list-item-title>
                                                <v-list-item-subtitle>Se adoptaron medidas específicas para asegurar la integridad y seguridad de los datos en tránsito.</v-list-item-subtitle>
                            </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                    <p class="mt-4">La autenticación de usuarios se lleva a cabo a través de un sistema de registro e inicio de sesión, permitiendo así la creación de cuentas nuevas o el acceso a cuentas existentes. 
					Una vez autenticados, los usuarios pueden acceder a la página principal para subir un archivo. La lógica del lado del cliente procesa el archivo, calcula el hash SHA-3 y lo envía al servidor. 
					El servidor, a su vez, transmite este hash a la red Tangle y registra la información de la transacción en una base de datos SQL.</p>
                                    <p class="mt-4">
                                        Este proyecto ha superado desafíos técnicos significativos, como la configuración de una conexión confiable y segura con la red Tangle, la implementación de un sistema robusto de encriptación y hashing, y la transmisión segura y eficiente de datos entre el cliente, el servidor y la red Tangle. 
					Además, se ha logrado una comprensión profunda de las tecnologías blockchain y su aplicación en la garantía de la integridad y seguridad de los datos. 
					Las futuras implementaciones podrían explorar mejoras en la eficiencia de la transmisión, expansión de la capacidad de la red y exploración de otras aplicaciones blockchain en el ámbito de la ciberseguridad.
                                    </p>
                                <div class="text-center">
                                <v-btn href="recursos/documentacion.html" target="_blank" color="primary" class="mt-5">Ver Documentación Detallada</v-btn>
                                </div>
                            </v-sheet>
                            </v-col>
                        </v-row>

                        <v-row class="mt-4">
                            <v-col cols="12" md="4">
                                <v-card class="pa-3 text-center" elevation="2">
                                    <v-img
                                        src="https://blog.iota.org/content/images/2021/07/IOTA_SUSEE_Architecture.png"
                                        height="200px"
                                        class="mx-auto"
                                    ></v-img>
                                    <h4 class="mt-3">Configuración de Tangle</h4>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-card class="pa-3 text-center" elevation="2">
                                    <v-img
                                        src="https://i.ytimg.com/vi/bYqbwB7j95U/maxresdefault.jpg"
                                        height="200px" class="mx-auto"
                                ></v-img>
                                <h4 class="mt-3">Sistema de Encriptación</h4>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-card class="pa-3 text-center" elevation="2">
                                <v-img
                                    :src="transmissionImage"
                                    height="200px"
                                    class="mx-auto"
                                ></v-img>
                                <h4 class="mt-3">Transmisión de Datos</h4>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <!-- Sección de Recursos Adicionales -->
        <v-row justify="center" class="my-5">
            <v-col cols="12" class="text-center">
                <v-card class="pa-5" elevation="2">
                    <h2 class="text-h5 mb-3">Recursos Adicionales</h2>
                    <p class="mb-4">Explora más sobre el proyecto a través de estos enlaces:</p>
                    <v-btn href="recursos/ataquestangle.html" target="_blank" color="primary" class="mr-2 mb-2">Ataques en Tangle</v-btn>
                    <v-btn href="recursos/proycontrastangle.html" target="_blank" color="secondary" class="mb-2">Beneficios y Consideraciones</v-btn>
                </v-card>
            </v-col>
        </v-row>

        </v-container>

	</v-container>
        </v-main>


        

        <!-- Footer -->
        <v-footer app padless>
            <v-col class="text-center white--text" cols="12">
                © {{ new Date().getFullYear() }} - Desarrollado por Renzo Di Paola Jara
            </v-col>
        </v-footer>

    </v-container>
</template>

<script>
    import axios from 'axios';
import Swal from 'sweetalert2';

    export default {
        name: 'TanglePage',
        data() {
            return {
                drawer: false, // Asegúrate de definir 'drawer' aquí
                blockId: '',
                phone: '',
                selectedUser: null,
                users: [], // Suponiendo que esto se llenará con datos de usuarios
                showUserData: false,
                userData: [],
                showAlert: false,
                alertMessage: '',
                timer: null,
                timerCount: 30,
                showDataContainer: true,
                showFilesList: true,
                files: [],
                alertType: 'success', // puede ser 'success' o 'error'
                transmissionImage: require('@/assets/img/imagendetransmisiondedatos.png'),
                logo_paip: require('@/assets/img/LOGO_PAIP.png'),
            };
        },
        methods: {
            logout() {
                localStorage.removeItem('accessToken'); // Eliminar el token del almacenamiento local
                this.$router.push('/login'); // Redirigir al usuario a la página de inicio de sesión
            },
            async obtenerDatos() {
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
                
                    this.userData = {
                        nombre: response.data.nombre,
                        apellido: response.data.apellido,
                        email: response.data.email,
                        numeroTelefono: response.data.numeroTelefono
                    };
                    this.showUserData = true; // Mostrar los datos
                } catch (error) {
                    console.error('Error al obtener los datos del usuario:', error);
                }
            },
            uploadFile() {
                const fileInput = this.$refs.fileInput;  // Referencia al v-file-input
                if (fileInput && fileInput.files && fileInput.files[0]) {
                    const file = fileInput.files[0];
                    this.sendFileToServer(file);
                } else {
                    Swal.fire({
                        title: 'No hay archivo seleccionado',
                        text: 'Por favor, selecciona un archivo para subir.',
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                    });
                }
            },
            async sendFileToServer(file) {
                try {
                    const formData = new FormData();
                    formData.append('file', file);

                    const response = await axios.post('http://localhost:3006/uploadToAzure', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });

                    // Recibir el hash y la URL de Azure Blob del servidor
                    const { hashSHA3, azureBlobUrl } = response.data;
                    console.log('URL del archivo en Azure:', azureBlobUrl);
                    console.log('Hash SHA-3:', hashSHA3);

                    // Enviar el hash y la URL de Azure Blob al servidor Tangle
                    await this.sendHashToTangle(hashSHA3, azureBlobUrl);
                } catch (error) {
                    let message = '';
                    if (!error.response) {
                        message = 'Error de conexión con el servidor de Azure Storage. Por favor, inténtalo de nuevo más tarde.';
                    } else {
                        message = `Error al subir el archivo: ${error.response.data.message || error.message}`;
                    }
                
                    Swal.fire({
                        title: 'Error',
                        text: message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            },
            async sendHashToTangle(hashSHA3, azureBlobUrl) {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    this.alertMessage = 'No hay userId almacenado';
                    this.alertType = 'error';
                    this.showAlert = true;
                    return;
                }
                try {
                    const response = await axios.post('http://localhost:3005/upload', {
                        hash: hashSHA3,
                        azureBlobUrl: azureBlobUrl,
                        usuarioId: userId // Reemplazar con el ID del usuario real
                    });
                
                    const blockId = response.data.blockId;
                    console.log('Block ID:', blockId);
                    
                    if (response.data.blockId) {
                        console.log('Transacción enviada con éxito. Block ID:', response.data.blockId);
                        // Realizar acciones adicionales si es necesario
                        this.showAlertWithTimer('Transacción enviada con éxito. Block ID: ', 'success');
                    }
                    else
                    {
                        console.error('Block ID no está presente en la respuesta del servidor');
                        this.showAlertWithTimer('Block ID no está presente en la respuesta del servidor', 'error');
                    }
                } catch (error) {
                    console.error('Error al enviar a Tangle:', error);
                    this.showAlertWithTimer('Error al enviar a Tangle', 'error');
                }
            },
            // retrieveFile(blockId) {
            //   // Lógica para recuperar archivo usando blockId
            // },
            // retrieveFileByPhone(phone) {
            //   // Lógica para recuperar archivo por teléfono
            // },
            toggleDataContainer() {
                this.showDataContainer = !this.showDataContainer;
            },
            ocultarDatos() {
this.showUserData = false; // Ocultar los datos
this.userData = []; // Limpiar la lista de datos
	},
            showAlertWithTimer(message, type) {
                this.alertMessage = message;
                this.alertType = type;
                this.showAlert = true;
                this.resetAndStartTimer();
            },

            resetAndStartTimer() {
                this.timerCount = 30; // Reiniciar el contador a 30 segundos
                if (this.timer) {
                    clearInterval(this.timer); // Limpia el temporizador existente
                }
                this.timer = setInterval(() => {
                    if (this.timerCount > 0) {
                        this.timerCount--;
                    } else {
                        clearInterval(this.timer);
                        this.showAlert = false;
                    }
                }, 1000);
            },
        }
    };
</script>

<style scoped>
    .v-btn--size-default {
        --v-btn-height: 56px;
    }
    
    .v-sheet {
        max-width: 100%;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    /* Personalización del botón para que destaque más como un llamado a la acción */
    .v-btn {
        padding: 10px 25px;
        font-size: 1rem;
        font-weight: 600;
    }

    /* Estilos adicionales para las listas, si necesitas */
    .v-list-item-title {
      font-weight: 500; /* Puedes ajustar el peso de la fuente como desees */
    }

    .v-list-item-subtitle {
      color: rgba(0,0,0,0.6); /* Un color más tenue para los subtítulos */
    }
    
</style>