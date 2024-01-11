<template>
    <div>
        <!-- Barra de Navegación -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
                <img src="../assets/img/LOGO_PAIP.png" alt="Logo PAIP" class="navbar-brand-img mr-2">
                PoC - Luxen
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/profile">Mi Perfil</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="logout">Cerrar Sesión</a>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container mt-5">

            <div class="row justify-content-center">
                <div class="col-md-8 text-center">
                    <h1>Red Tangle Cliente/Servidor</h1>
                    <p>
                        Realizado por Renzo Di Paola Jara - Desarrollador Full Stack .Net, Python y NodeJS
                        <br>
                        <a href="renzo_actualizadoCV.pdf" target="_blank">Ver CV</a> | <a href="mdmn.pdf" target="_blank">Ver trabajo relacionado</a>
                    </p>
                </div>
            </div>
            <div class="row justify-content-center mt-4">
                <div class="col-md-8">
                    <!-- Texto Informativo -->
                    <div class="alert alert-info" role="alert">
                        Ten en cuenta que mientras más grande sea el tamaño del archivo, más tiempo podría demorar su procesamiento en la red Tangle.
                    </div>
                
                    <!-- Sección de Carga de Archivo -->
                    <div class="form-group">
                        <input type="file" class="form-control-file" id="fileInput">
                    </div>
                    <button class="btn btn-primary btn-block" onclick="uploadFile()">Subir</button>
                    <!-- Sección para Recuperar Archivo -->
                    <input type="text" class="form-control mt-2" id="blockIdInput" placeholder="Ingresa el Block ID">
                    <button class="btn btn-secondary btn-block mt-2" onclick="retrieveFile(document.getElementById('blockIdInput').value)">Consultar BlockID</button>
                    <!-- Sección para Recuperar Archivo por Teléfono -->
                    <div class="row justify-content-center mt-4">
                        <div class="col-md-12">
                            <div class="form-row">
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="phoneInput" placeholder="Ingresa el teléfono">
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <select class="form-control" id="userSelect">
                                            <!-- Las opciones se llenarán desde JavaScript -->
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <button class="btn btn-secondary btn-block" onclick="retrieveFileByPhone(document.getElementById('phoneInput').value)">Recuperar Archivo</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Botón para Obtener Datos -->
                    <div class="row justify-content-center mt-4">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-info" onclick="obtenerDatos()" style=" width: 100%; display: block;">Obtener Datos</button>
                        </div>
                    </div>
                
                    <!-- Contenedor para mostrar los datos del usuario -->
                    <div class="row justify-content-center mt-4" id="userDataContainer" style="display: none;">
                        <div class="col-md-12">
                            <ul id="userDataList">
                                <!-- Aquí se insertarán los datos del usuario desde JavaScript -->
                            </ul>
                            <!-- Botón para ocultar el contenedor -->
                            <button class="btn btn-secondary mt-2" onclick="ocultarDatos()">Ocultar Datos</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Sección de Notificaciones -->
            <!-- <div id="alert-container" class="container mt-4" style="display: none;">
                <div class="alert alert-success" role="alert" id="alert-message"></div>
            </div> -->
            <div id="alert-container" class="container mt-4" style="display: none;">
                <div class="alert alert-success" role="alert">
                    <span id="alert-message"></span>
                    <span id="timer" class="ml-2"></span>
                </div>
            </div>

        </div>

        <div class="container mt-5" id="data-container" style="display: none;">
            <button id="toggleButton" class="btn btn-primary">Ocultar</button> <br><br>
            <div class="table-responsive"> <!-- Añadida div con clase table-responsive -->
                <table class="table table-bordered table-striped custom-table"> <!-- Añadidas clases table-striped -->
                    <thead class="thead-dark" style="text-align: center;"> <!-- Añadida clase thead-dark -->
                        <tr>
                            <!-- <th>ID</th> -->
                            <th>Usuario</th>
                            <th>BlockID</th>
                            <th>HashSHA3</th>
                            <th>Fecha de Transacción</th>
                        </tr>
                    </thead>
                    <tbody class="table-active" id="data-table-body" style="color: floralwhite;">
                        <!-- Las filas de datos se insertarán aquí desde JavaScript -->
                    </tbody>
                </table>
            </div>
        </div>

        <div class="container mt-5" id="files-parent-container">
            <div id="files-container" style="display: none;">
                <h3>Archivos asociados:</h3>
                <div class="row files-list" id="files-list">
                    <!-- Aquí se insertarán los archivos desde JavaScript -->
                </div>
                <p id="no-files-message" style="text-align: center;">No hay archivos para mostrar.</p>
            </div>
        </div>

        <!-- Descripción del Proyecto y la Arquitectura -->
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <h3>Descripción del Proyecto <a href="/documentacion.html" target="_blank" style="font-size: 14px;">(Ver Documentación Detallada)</a></h3>
                    <p>Este proyecto constituye una Prueba de Concepto (PoC) que ilustra la implementación de una red Tangle en una arquitectura cliente/servidor. Los usuarios tienen la capacidad de enviar un archivo encriptado a través de la red Tangle, que posteriormente es recibido y desencriptado en el servidor. Los desafíos técnicos abordados incluyen:</p>
                    <ul>
                        <li>Configuración de la red Tangle: Se trabajó en establecer una conexión confiable y segura, lo cual fue esencial para el éxito del proyecto.</li>
                        <li>Implementación de un sistema de encriptación mediante el algoritmo SHA-3: La encriptación segura de los datos fue un aspecto crucial.</li>
                        <li>Transmisión segura y eficiente de datos: Se adoptaron medidas específicas para asegurar la integridad y seguridad de los datos en tránsito.</li>
                    </ul>
                    <p>La autenticación de usuarios se lleva a cabo a través de un sistema de registro e inicio de sesión, permitiendo así la creación de cuentas nuevas o el acceso a cuentas existentes. Una vez autenticados, los usuarios pueden acceder a la página principal para subir un archivo. La lógica del lado del cliente procesa el archivo, calcula el hash SHA-3 y lo envía al servidor. El servidor, a su vez, transmite este hash a la red Tangle y registra la información de la transacción en una base de datos SQL.</p>
                    <p>Este proyecto ha superado desafíos técnicos significativos, como la configuración de una conexión confiable y segura con la red Tangle, la implementación de un sistema robusto de encriptación y hashing, y la transmisión segura y eficiente de datos entre el cliente, el servidor y la red Tangle. Además, se ha logrado una comprensión profunda de las tecnologías blockchain y su aplicación en la garantía de la integridad y seguridad de los datos. Las futuras implementaciones podrían explorar mejoras en la eficiencia de la transmisión, expansión de la capacidad de la red y exploración de otras aplicaciones blockchain en el ámbito de la ciberseguridad.</p>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-4 text-center">
                    <img src="https://blog.iota.org/content/images/2021/07/IOTA_SUSEE_Architecture.png" alt="Configuración de Tangle" class="img-fluid rounded-circle feature-image">
                    <h4 class="mt-2">Configuración de Tangle</h4>
                </div>
                <div class="col-md-4 text-center">
                    <img src="https://i.ytimg.com/vi/bYqbwB7j95U/maxresdefault.jpg" alt="Sistema de Encriptación" class="img-fluid rounded-circle feature-image">
                    <h4 class="mt-2">Sistema de Encriptación</h4>
                </div>
                <div class="col-md-4 text-center">
                    <img src="../assets/img/imagendetransmisiondedatos.png" alt="Transmisión de Datos" class="img-fluid rounded-circle feature-image">
                    <h4 class="mt-2">Transmisión de Datos</h4>
                </div>
            </div>
        </div>

        <!-- Sección de Recursos Adicionales -->
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12 text-center">
                    <h3 class="section-title">Recursos Adicionales</h3>
                    <p class="section-description">Explora más sobre el proyecto a través de estos enlaces:</p>
                    <div class="resource-links">
                        <a href="ataquestangle.html" target="_blank" class="btn btn-outline-primary mr-2 mb-2">Ataques en Tangle</a>
                        <a href="proycontrastangle.html" target="_blank" class="btn btn-outline-secondary mb-2">Beneficios y Consideraciones</a>
                    </div>
                </div>
            </div>
        </div>

        <br><br>
    </div>
</template>

<script>
    export default {
        name: 'TanglePage',
        mounted() {
            //require('@/assets/css/tangle-style.css');
            document.body.classList.add("tangle-body-style");
        },
        beforeUnmount() { // Cambio aquí
            document.body.classList.remove("tangle-body-style");
        },
        methods: {
            logout() {
                localStorage.removeItem('accessToken'); // Eliminar el token del almacenamiento local
                this.$router.push('/login'); // Redirigir al usuario a la página de inicio de sesión
            }
        }
    };
</script>

<style scoped>
    .tangle-body-style {
        background-color: #1b1e23;
        color: #e0e0e0;
        font-family: 'Roboto', sans-serif;
    }
    
    .navbar {
        background-color: #2c2f33 !important;
        border-bottom: 1px solid #444;
        transition: background-color 0.3s;
    }
    
    .navbar-brand {
        color: #ffffff !important;
    }
    
    .navbar-nav .nav-link {
        color: #dddddd !important;
    }
    
    h1, h3 {
        color: #ffffff;
    }
    
    .btn-primary {
        background-color: #7289da !important;
        border-color: #7289da !important;
    }
    
    .container {
        background-color: #2c2f33;
        border-radius: 5px;
        padding: 30px;
        margin-bottom: 30px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    p {
        text-align: justify;
        text-align-last: center;
    }
    
    .feature-image {
        width: 300px;
        height: 300px;
        object-fit: cover;
    }
    
    .navbar-brand-img {
        width: 50px;
        height: auto;
    }
    
    .img-responsive {
        max-width: 100%;
        height: auto;
    }
    
    .btn-custom {
        background-color: #7289da;
        color: #fff;
        border: none;
        border-radius: 4px;
        transition: background-color 0.3s;
    }
    
    .btn-custom:hover {
        background-color: #5a6dac;
    }
    
    .box-shadow {
        box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .05);
        transition: box-shadow 0.3s;
    }
    
    .box-shadow:hover {
        box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, .1);
    }
    
    .break-word {
        word-break: break-all;
        max-width: 300px; /* Puedes ajustar este valor según lo necesites */
        overflow-wrap: anywhere;
    }
    
    .custom-table {
        border: 2px solid #007BFF;  /* Color de borde personalizado */
    }
    
    .custom-table tbody tr {
        background-color: #2C3E50;  /* Color de fondo de fila personalizado */
    }
    
    /* Estilo personalizado para Select2 */
    .select2-container {
        width: 100% !important;
    }
    
    .select2-container .select2-selection--single {
        height: 38px;
        font-size: 1rem; /* Opcional */
    }
    
    .select2-container--default .select2-selection--single .select2-selection__rendered {
        line-height: 38px;
    }
    
    .select2-selection {
        border-radius: 4px;
        border-color: #ffffff !important;
        background-color: #ffffff !important;
        color: #e0e0e0 !important;
    }
    
    .select2-selection__arrow {
        color: #ffffff !important;
    }
    
    .select2-dropdown {
        border-color: #ffffff !important;
        background-color: #2c2f33 !important;
    }
    
    .select2-results__option {
        color: #e0e0e0 !important;
    }
    
    .select2-results__option--highlighted {
        background-color: #7289da !important;
        color: white !important;
    }
    
    .files-list {
        text-align: center;
    
    }
    
    #no-files-message {
        display: none;
        color: gray;
        font-style: italic;
    }
    
    .section-title {
        margin-bottom: 15px;
        /* color: #333; */
        font-weight: bold;
    }
    
    .section-description {
        margin-bottom: 20px;
        /* color: #555; */
    }
    
    .resource-links a {
        padding: 10px 15px;
        font-size: 16px;
    }

</style>