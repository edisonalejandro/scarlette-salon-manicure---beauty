# 💅 Scarlette Salon - Manicure & Beauty

<div align="center">

**Sistema integral de gestión y reservas online para salón de belleza**

[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.11-ffca28?logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite)](https://vitejs.dev/)

</div>

---

## 📋 Descripción

**Scarlette Salon** es una aplicación web moderna diseñada para digitalizar y optimizar las operaciones de un salón de belleza especializado en manicure y servicios de estética. La plataforma conecta a los clientes con el salón, permitiendo reservas online 24/7, visualización de trabajos previos y gestión administrativa completa.

### 🎯 Problema que resuelve

- ❌ Pérdida de clientes por horarios de atención limitados para reservas telefónicas
- ❌ Dificultad para mostrar trabajos y atraer nuevos clientes
- ❌ Gestión manual de citas propensa a errores y doble reservas
- ❌ Falta de presencia digital profesional

### ✅ Solución

- ✨ Sistema de reservas 24/7 accesible desde cualquier dispositivo
- 🖼️ Galería visual profesional para mostrar portfolio de trabajos
- 📅 Calendario inteligente que previene conflictos de horarios
- 👥 Sistema de roles para administradores y clientes
- 🔐 Autenticación segura con Google

---

## 🚀 Características principales

### 👤 Para Clientes

- **📅 Reserva de citas**: Sistema intuitivo de calendario para agendar servicios
- **🛍️ Catálogo de servicios**: Visualiza todos los servicios disponibles con precios, duración y descripción
- **🖼️ Galería de trabajos**: Explora el portfolio del salón antes de reservar
- **🔔 Estados de cita**: Seguimiento en tiempo real (pendiente, confirmado, cancelado)
- **📱 Diseño responsive**: Funciona perfectamente en móviles, tablets y desktop

### 👨‍💼 Para Administradores

- **⚙️ Gestión de servicios**: Agregar, editar y eliminar servicios del catálogo
- **📊 Gestión de citas**: Aprobar, rechazar o cancelar reservas
- **🎨 Gestión de galería**: Subir y administrar fotos de trabajos realizados
- **👥 Panel administrativo**: Vista consolidada de todas las operaciones
- **📈 Dashboard en tiempo real**: Información actualizada al instante

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - Biblioteca UI con las últimas optimizaciones
- **TypeScript 5.8** - Tipado estático para código más robusto
- **Vite 6.2** - Build tool ultrarrápido con HMR
- **Tailwind CSS 4.1** - Framework de utilidades CSS
- **Motion 12** - Animaciones fluidas y modernas
- **Lucide React** - Iconos SVG optimizados

### Backend & Servicios
- **Firebase Firestore** - Base de datos NoSQL en tiempo real
- **Firebase Auth** - Autenticación con Google
- **Google Gemini AI** - Inteligencia artificial para asistencia
- **Firebase Hosting** - Hosting y deployment

### Herramientas de desarrollo
- **date-fns** - Manipulación de fechas con soporte i18n (español)
- **clsx & tailwind-merge** - Gestión de clases CSS
- **react-markdown** - Renderizado de contenido markdown

---

## 📁 Estructura del Proyecto

```
scarlette-salon-manicure-&-beauty/
├── src/
│   ├── App.tsx                 # Componente principal de la aplicación
│   ├── main.tsx                # Punto de entrada de React
│   ├── firebase.ts             # Configuración de Firebase
│   ├── types.ts                # Definiciones de TypeScript
│   ├── index.css               # Estilos globales
│   └── lib/
│       └── utils.ts            # Utilidades y helpers
├── public/                     # Archivos estáticos
├── firebase-applet-config.json # Configuración de Firebase Applet
├── firebase-blueprint.json     # Blueprint de Firebase
├── firestore.rules            # Reglas de seguridad de Firestore
├── index.html                 # HTML base
├── package.json               # Dependencias del proyecto
├── tsconfig.json              # Configuración de TypeScript
├── vite.config.ts             # Configuración de Vite
└── README.md                  # Este archivo
```

---

## 🔧 Instalación y Configuración

### Pre-requisitos

- Node.js 18+ instalado
- Cuenta de Firebase
- API Key de Google Gemini

### Paso 1: Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd scarlette-salon-manicure-&-beauty
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_FIREBASE_API_KEY=tu_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
GEMINI_API_KEY=tu_gemini_api_key
```

### Paso 4: Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Authentication → Google Sign-In
3. Crea una base de datos Firestore
4. Despliega las reglas de seguridad desde `firestore.rules`

### Paso 5: Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 📱 Uso

### Como Cliente

1. **Ingresa a la aplicación** desde tu navegador
2. **Inicia sesión** con tu cuenta de Google
3. **Explora el catálogo** de servicios disponibles
4. **Reserva una cita** seleccionando servicio, fecha y hora
5. **Revisa la galería** para inspirarte con trabajos previos

### Como Administrador

1. **Inicia sesión** con una cuenta configurada como admin
2. **Gestiona servicios** desde el panel administrativo
3. **Revisa y confirma** las reservas de clientes
4. **Actualiza la galería** con nuevos trabajos realizados

---

## 📜 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo en puerto 3000
npm run build    # Construye la aplicación para producción
npm run preview  # Vista previa de la build de producción
npm run clean    # Limpia la carpeta dist
npm run lint     # Verifica errores de TypeScript
```

---

## 🗄️ Modelo de Datos

### Service (Servicio)
```typescript
{
  id: string;
  name: string;
  price: number;
  duration: number;        // en minutos
  description?: string;
}
```

### Appointment (Cita)
```typescript
{
  id: string;
  userId?: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  clientName: string;
  clientPhone: string;
}
```

### GalleryItem (Item de Galería)
```typescript
{
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  createdAt: Timestamp;
}
```

### UserProfile (Perfil de Usuario)
```typescript
{
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'client';
}
```

---

## 🔐 Seguridad

- **Autenticación**: Firebase Auth con Google Sign-In
- **Reglas de Firestore**: Control de acceso basado en roles
- **Variables de entorno**: Credenciales sensibles protegidas
- **Validación**: TypeScript para prevenir errores en tiempo de compilación

---

## 🚀 Roadmap - Próximo Nivel

### Fase 1: Mejoras Inmediatas
- [ ] Sistema de notificaciones push/email para confirmación de citas
- [ ] Recordatorios automáticos 24h antes de la cita
- [ ] Sistema de reseñas y valoraciones de clientes
- [ ] Multi-idioma (español/inglés)

### Fase 2: Características Avanzadas
- [ ] Integración con WhatsApp Business API
- [ ] Sistema de puntos/fidelización
- [ ] Pago online de servicios
- [ ] Historial de citas del cliente
- [ ] Recomendaciones personalizadas con IA (Gemini)

### Fase 3: Optimización
- [ ] App móvil nativa (React Native)
- [ ] Dashboard de analytics y métricas
- [ ] Sistema de reportes financieros
- [ ] Integración con calendario de Google
- [ ] Sistema de inventario de productos

### Fase 4: Escalabilidad
- [ ] Multi-sucursal
- [ ] Sistema de franquicias
- [ ] API pública para integraciones
- [ ] Marketplace de productos de belleza

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Apache-2.0 License - Ver archivo LICENSE para más detalles

---

## 📞 Contacto

**Scarlette Salon**

- 📱 Instagram: [@scarlettesalon](https://instagram.com/scarlettesalon)
- 📞 Teléfono: Contactar para reservas
- 📍 Ubicación: [Dirección del salón]

---

<div align="center">

**Desarrollado con ❤️ para revolucionar la industria de la belleza**

⭐ Si te gusta este proyecto, dale una estrella en GitHub

</div>
