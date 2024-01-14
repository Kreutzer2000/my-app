// src/plugins/vuetify.js

import { createVuetify } from 'vuetify';
import 'vuetify/styles';

// Esto importa todos los componentes de Vuetify para uso global
import * as components from 'vuetify/components';

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light',
    },
    components,
})



export default vuetify
