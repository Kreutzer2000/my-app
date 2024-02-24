<!--src/components/Tangle.vue-->
<template>
    <v-container class="fill-height" fluid>

        <!-- Barra de Navegación Superior -->
        <TopNavBar :logo="logo_paip" @toggleDrawer="drawer = !drawer" @logout="logout" />

        <!-- Menú lateral para pantallas pequeñas -->
        <SideMenu v-model:drawer="drawer" @logout="logout" />

        <!-- Contenido Principal -->
        <v-main>
            <v-container>
                <v-row justify="center">
                    <v-col cols="12" md="10" class="text-center">
                        <h1>Red Tangle Cliente/Servidor</h1>
                        <p>
                            Realizado por Renzo Di Paola Jara - Desarrollador Full Stack .Net, Python y NodeJS
                            <br>
                            <a href="recursos/renzo_actualizadoCV.pdf" target="_blank">Ver CV</a> | <a
                                href="recursos/mdmn.pdf" target="_blank">Ver trabajo relacionado</a>
                        </p>
                    </v-col>
                </v-row>

                <v-row justify="center">
                    <v-col cols="12" md="10">
                        <v-alert type="info">
                            Ten en cuenta que mientras más grande sea el tamaño del archivo, más tiempo podría demorar su
                            procesamiento en la red Tangle.
                        </v-alert>
                        <br>

                        <FileUploadForm @upload="uploadFile"></FileUploadForm>

                        <AlertSection v-model:show="showAlert" :message="alertMessage" :type="alertType"
                            :duration="timerCount * 1000"></AlertSection>

                        <v-text-field label="Ingresa el Block ID" class="mt-2" v-model="blockId"></v-text-field>
                        <v-btn color="secondary" block class="mt-2" @click="retrieveFile(blockId)">Consultar BlockID</v-btn>

                        <v-row justify="center" class="mt-4">
                            <v-col cols="4">
                                <v-text-field label="Ingresa el teléfono" v-model="phone"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-select :items="formattedUsers" label="Selecciona un usuario"
                                    v-model="selectedUser"></v-select>
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
                                                    <v-list-item-subtitle>{{ userData.nombre }} {{ userData.apellido
                                                    }}</v-list-item-subtitle>
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
                                                    <v-list-item-subtitle>{{ userData.numeroTelefono
                                                    }}</v-list-item-subtitle>
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
                        <v-col cols="12" md="10">
                            <v-btn color="primary" @click="toggleDataContainer">Ocultar/Mostrar Datos</v-btn>
                            <v-container v-show="showDataContainer">
                                <v-data-table :headers="headers" :items="transaccionData ? [transaccionData] : []"
                                    :no-data-text="'No hay datos para mostrar'" class="elevation-1">
                                    <template v-slot:item="{ item }">
                                        <tr>
                                            <td>
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <span v-bind="attrs" v-on="on">{{ item.usuario }}</span>
                                                    </template>
                                                    <span>{{ item.usuario }}</span>
                                                </v-tooltip>
                                            </td>
                                            <td class="break-word">
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <span v-bind="attrs" v-on="on">{{ item.blockId }}</span>
                                                    </template>
                                                    <span>{{ item.blockId }}</span>
                                                </v-tooltip>
                                            </td>
                                            <td class="break-word">
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <span v-bind="attrs" v-on="on">{{ item.hashSHA3 }}</span>
                                                    </template>
                                                    <span>{{ item.hashSHA3 }}</span>
                                                </v-tooltip>
                                            </td>
                                            <td>{{ item.fechaTransaccion }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-container>
                        </v-col>
                    </v-row>


                    <!-- Sección de Archivos Asociados -->
                    <v-row justify="center">
                        <v-col cols="12" md="10">
                            <h3>Archivos asociados:</h3>
                            <v-container>
                                <!-- Aquí se insertarán los archivos desde JavaScript -->
                                <div v-if="files.length">
                                    <v-list>
                                        <v-list-item-group>
                                            <v-list-item v-for="file in files" :key="file.url">
                                                <v-list-item-icon>
                                                    <v-icon>{{ file.icon }}</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ file.name }}</v-list-item-title>
                                                </v-list-item-content>
                                                <v-list-item-action>
                                                    <v-btn icon :href="file.url" target="_blank">
                                                        <v-icon>mdi-download</v-icon>
                                                    </v-btn>
                                                </v-list-item-action>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </div>
                                <p v-else>No hay archivos para mostrar.</p>
                            </v-container>
                        </v-col>
                    </v-row>

                    <!-- Descripción del Proyecto y la Arquitectura -->
                    <ProjectDescription :transmissionImage="transmissionImage" :logo_paip="logo_paip" />

                    <!-- Sección de Recursos Adicionales -->
                    <v-row justify="center" class="my-5">
                        <v-col cols="12" class="text-center">
                            <v-card class="pa-5" elevation="2">
                                <h2 class="text-h5 mb-3">Recursos Adicionales</h2>
                                <p class="mb-4">Explora más sobre el proyecto a través de estos enlaces:</p>
                                <v-btn href="recursos/ataquestangle.html" target="_blank" color="primary"
                                    class="mr-2 mb-2">Ataques en Tangle</v-btn>
                                <v-btn href="recursos/proycontrastangle.html" target="_blank" color="secondary"
                                    class="mb-2">Beneficios y Consideraciones</v-btn>
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
import AlertSection from "@/components/Tangle/AlertSection.vue";
import FileUploadForm from "@/components/Tangle/FileUploadForm.vue";
import ProjectDescription from '@/components/Tangle/ProjectDescription.vue';
import SideMenu from '@/components/Tangle/SideMenu.vue';
import TopNavBar from '@/components/Tangle/TopNavBar.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'TanglePage',
    components: {
        ProjectDescription,
        TopNavBar,
        SideMenu,
        AlertSection,
        FileUploadForm,

    },
    data() {
        return {
            drawer: false, // Asegúrate de definir 'drawer' aquí
            blockId: '',
            transaccionData: null,
            phone: '',
            selectedUser: null,
            users: [], // Suponiendo que esto se llenará con datos de usuarios
            selectedUserId: null,
            showUserData: false,
            userData: [],
            showAlert: false,
            alertMessage: '',
            timer: null,
            timerCount: 30,
            showDataContainer: true,
            showFilesList: true,
            files: [],
            headers: [
                { text: 'Usuario', value: 'userInfo.usuario' },
                { text: 'BlockID', value: 'blockId' },
                { text: 'HashSHA3', value: 'hashSHA3' },
                { text: 'Fecha de Transacción', value: 'fechaTransaccion' },
            ],
            alertType: 'success', // puede ser 'success' o 'error'
            transmissionImage: require('@/assets/img/imagendetransmisiondedatos.png'),
            logo_paip: require('@/assets/img/LOGO_PAIP.png'),
            fileIconsMap: {
                'txt': 'mdi-file-document-outline',
                'xlsx': 'mdi-file-excel',
                'xls': 'mdi-file-excel',
                'doc': 'mdi-file-word',
                'docx': 'mdi-file-word',
                'pdf': 'mdi-file-pdf',
                'ppt': 'mdi-file-powerpoint',
                'pptx': 'mdi-file-powerpoint',
                'jpg': 'mdi-file-image',
                'jpeg': 'mdi-file-image',
                'png': 'mdi-file-image',
                'gif': 'mdi-file-image',
                'zip': 'mdi-zip-box',
                'rar': 'mdi-zip-box',
                // ... otros mapeos de extensión
            },
        };
    },
    computed: {
        formattedUsers() {
            // return this.users.map(user => ({
            //     text: user.nombre + ' ' + user.apellido, // Esto se muestra en el selector
            //     value: user._id // Esto se usa como valor interno
            // }));
            // Devuelve solo una cadena para cada usuario
            //return this.users.map(user => `${user.nombre} ${user.apellido}`);
            return this.users.map(user => `${user.usuario}`);
        }
    },
    watch: {
        selectedUser(newValue) {
            //const foundUser = this.users.find(user => `${user.nombre} ${user.apellido}` === newValue);
            const foundUser = this.users.find(user => `${user.usuario}` === newValue);
            this.selectedUserId = foundUser ? foundUser._id : null;
            console.log('Usuario seleccionado:', this.selectedUserId);
        }
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

                const response = await axios.get(`http://userservice.luxen.club/getProfile`, {
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
        uploadFile(file) {
            // Ahora este método recibe directamente el archivo desde el evento emitido por FileUploadForm
            // Verifica si el archivo existe y tiene propiedad 'name'
            if (file && file.name) {
                console.log('Archivo recibido para subir:', file.name);
                this.sendFileToServer(file);
            } else {
                console.error('El archivo recibido no es válido o no se recibió correctamente');
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

                const response = await axios.post('http://storageservice.luxen.club/uploadToAzure', formData, {
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
                const response = await axios.post('http://blockchainservice.luxen.club/upload', {
                    hash: hashSHA3,
                    azureBlobUrl: azureBlobUrl,
                    usuarioId: userId // Reemplazar con el ID del usuario real
                });

                const blockId = response.data.blockId;
                console.log('Block ID:', blockId);

                if (response.data.blockId) {
                    console.log('Transacción enviada con éxito. Block ID:', response.data.blockId);
                    // Realizar acciones adicionales si es necesario
                    this.showAlertWithTimer('Transacción enviada con éxito. Block ID: ' + blockId, 'success');
                    this.blockId = blockId;
                }
                else {
                    console.error('Block ID no está presente en la respuesta del servidor');
                    this.showAlertWithTimer('Block ID no está presente en la respuesta del servidor', 'error');
                }
            } catch (error) {
                console.error('Error al enviar a Tangle:', error);
                this.showAlertWithTimer('Error al enviar a Tangle', 'error');
            }
        },
        async retrieveFile(blockId) {
            if (!blockId) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Ningún Block ID ingresado',
                    text: 'Por favor, ingresa un Block ID para consultar.',
                });
                return;
            }

            try {
                const response = await axios.get(`http://blockchainservice.luxen.club/retrieve/${blockId}`);
                if (response.data && response.data.transaccion && response.data.userInfo) {
                    this.transaccionData = {
                        usuario: response.data.userInfo.usuario,
                        blockId: response.data.transaccion.blockId,
                        hashSHA3: response.data.transaccion.hashSHA3,
                        fechaTransaccion: this.formatearFechaTransaccion(response.data.transaccion.fechaTransaccion)
                    };
                } else {
                    this.transaccionData = null;
                    // Opcionalmente mostrar un mensaje de error o alerta
                    Swal.fire({
                        icon: 'error',
                        title: 'Datos incompletos',
                        text: 'La respuesta del servidor no contiene todos los datos necesarios.',
                    });
                }
            } catch (error) {
                console.error('Error al recuperar información:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al recuperar datos',
                    text: 'Ocurrió un error al intentar recuperar los datos del Block ID.',
                });
            }
        },
        processRetrievedData(data) {
            if (data && data.transaccion && data.userInfo) {
                // Asegúrate de que todos los campos necesarios están presentes
                this.transaccionData = {
                    usuario: data.userInfo.usuario,
                    transaccion: {
                        blockId: data.transaccion.blockId,
                        hashSHA3: data.transaccion.hashSHA3,
                        fechaTransaccion: data.transaccion.fechaTransaccion
                    }
                };
            } else {
                // Maneja el caso en que los datos no estén completos
                this.transaccionData = null;
            }
        },
        formatearFechaTransaccion(fecha) {
            const date = new Date(fecha);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        },
        async retrieveFileByPhone(phone) {
            if (!this.selectedUserId) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Ningún usuario seleccionado',
                    text: 'Por favor, selecciona un usuario del menú desplegable.',
                });
                return;
            }
            if (!phone.match(/^\d+$/)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Número de teléfono inválido',
                    text: 'Por favor, ingresa sólo números en el campo de teléfono.',
                });
                return;
            }

            try {
                const response = await axios.get(`http://blockchainservice.luxen.club/retrieveByPhone/${phone}/${this.selectedUserId}`);
                console.log('Respuesta del servidor:', response.data, 'Response type:', typeof response.data, 'Response length:',
                    response.data.length, 'Response:', response);
                if (!response.data || response.data.length === 0) {
                    Swal.fire({
                        icon: 'info',
                        title: 'No se encontraron transacciones',
                        text: 'No hay transacciones asociadas a este número de teléfono y usuario.',
                    });
                    this.files = [];
                    return;
                }

                // Procesar y mostrar los archivos recibidos
                this.files = response.data.map(file => {
                    console.log('Procesando archivo:', file);

                    // Verificar si dbData existe y tiene la propiedad ArchivoCifradoURL
                    if (file.dbData && typeof file.dbData.archivoCifradoURL === 'string') {
                        // Decodificar la URL
                        const decodedUrl = decodeURIComponent(file.dbData.archivoCifradoURL);
                        console.log('URL decodificada del archivo:', decodedUrl);

                        const fileName = decodedUrl.split('/').pop();
                        const fileExtension = fileName.split('.').pop().toLowerCase();
                        const fileIcon = this.fileIconsMap[fileExtension] || 'fa-file';
                        console.log('Nombre del archivo:', fileName, 'Extensión:', fileExtension, 'Icono:', fileIcon);

                        return { name: fileName, url: decodedUrl, icon: fileIcon };
                    } else {
                        console.log('dbData no tiene propiedad archivoCifradoURL válida o no es una cadena:', file.dbData);
                        return null;
                    }
                }).filter(file => file !== null);

                console.log('Archivos procesados:', this.files);

                // Asegúrate de que showFilesList esté en true para mostrar los archivos
                this.showFilesList = true;
                console.log('Estado de showFilesList:', this.showFilesList);
            } catch (error) {
                console.error('Error:', error);
                if (error.response && error.response.status === 404) {
                    // Manejar específicamente el error 404
                    Swal.fire({
                        icon: 'info',
                        title: 'No se encontraron transacciones',
                        text: 'No hay transacciones asociadas a este número de teléfono y usuario.',
                    });
                    this.files = [];
                } else {
                    // Manejar otros tipos de errores
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al recuperar datos',
                        text: 'Ocurrió un error al intentar recuperar los datos.',
                    });
                }
            }
        },
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
        async getAllUsers() {
            try {
                const response = await axios.get('http://userservice.luxen.club/getAllUsers');
                console.log('Usuarios:', response.data);
                this.users = response.data;
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);

                // Verificar si es un error de red (ej. problema de conexión)
                if (!error.response) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de Conexión',
                        text: 'No se pudo conectar al servidor. Por favor, verifica tu conexión a Internet.',
                    });
                } else {
                    // Manejar otros tipos de errores (ej. respuestas del servidor como 500, 404, etc.)
                    const message = error.response.data.message || 'Ocurrió un error al cargar los datos de los usuarios.';
                    Swal.fire({
                        icon: 'error',
                        title: 'Error del Servidor',
                        text: message,
                    });
                }
            }
        },
    },
    mounted() {
        this.getAllUsers(); // Llamar al método cuando el componente se monta
    }
};
</script>

<style scoped>
.v-btn--size-default {
    --v-btn-height: 56px;
}

.v-sheet {
    max-width: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Personalización del botón para que destaque más como un llamado a la acción */
.v-btn {
    padding: 10px 25px;
    font-size: 1rem;
    font-weight: 600;
}

/* Estilos adicionales para las listas, si necesitas */
.v-list-item-title {
    font-weight: 500;
    /* Puedes ajustar el peso de la fuente como desees */
}

.v-list-item-subtitle {
    color: rgba(0, 0, 0, 0.6);
    /* Un color más tenue para los subtítulos */
}

.text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.break-word {
    word-break: break-all;
    max-width: 300px;
    /* Puedes ajustar este valor según lo necesites */
    overflow-wrap: anywhere;
}

.v-list-item {
    align-items: center;
}

.v-list-item-icon {
    margin-right: 10px;
}
</style>