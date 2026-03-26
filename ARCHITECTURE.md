# Scarlette Salon - Arquitectura del Proyecto

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes UI reutilizables
│   ├── Navbar.tsx       # Barra de navegación
│   ├── Hero.tsx         # Sección hero principal
│   ├── Footer.tsx       # Pie de página
│   └── LoadingSpinner.tsx # Indicador de carga
│
├── features/            # Características del negocio (módulos)
│   ├── gallery/        
│   │   └── GallerySection.tsx    # Sección de galería de trabajos
│   │
│   ├── booking/        
│   │   ├── BookingSection.tsx    # Contenedor principal de reservas
│   │   ├── BookingSteps.tsx      # Indicador de pasos
│   │   ├── ServiceSelection.tsx  # Selección de servicio
│   │   ├── DateTimeSelection.tsx # Selección de fecha/hora
│   │   ├── BookingConfirmation.tsx # Confirmación de datos
│   │   └── BookingSuccess.tsx    # Pantalla de éxito
│   │
│   └── admin/
│       └── AdminPanel.tsx        # Panel administrativo
│
├── hooks/              # Custom hooks
│   ├── useAuth.ts      # Manejo de autenticación
│   ├── useServices.ts  # Manejo de servicios
│   ├── useGallery.ts   # Manejo de galería
│   └── useAppointments.ts # Manejo de citas
│
├── services/           # Servicios de backend (Firebase)
│   ├── authService.ts  # Autenticación y perfiles
│   ├── servicesService.ts # CRUD de servicios
│   ├── galleryService.ts  # CRUD de galería
│   └── appointmentService.ts # CRUD de citas
│
├── lib/                # Utilidades
│   └── utils.ts        # Funciones helper (cn)
│
├── types.ts            # Definiciones de tipos TypeScript
├── firebase.ts         # Configuración de Firebase
├── App.tsx             # Componente raíz (orquestador)
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales
```

## 🏗️ Arquitectura y Separación de Responsabilidades

### 1. **Componentes UI (`/components`)**
- **Propósito**: Componentes presentacionales reutilizables
- **Responsabilidad**: Solo renderizado, no lógica de negocio
- **Características**:
  - Reciben datos por props
  - No manejan estado global
  - Fácilmente reutilizables

### 2. **Features (`/features`)**
- **Propósito**: Módulos de negocio específicos
- **Responsabilidad**: Lógica de negocio y flujo de usuario
- **Organización**: Cada feature tiene sus sub-componentes
- **Características**:
  - Pueden tener estado local
  - Orquestan componentes UI
  - Implementan flujos completos

### 3. **Hooks (`/hooks`)**
- **Propósito**: Lógica reutilizable de estado y efectos
- **Responsabilidad**: Manejo de estado, sincronización con backend
- **Características**:
  - Encapsulan lógica compleja
  - Facilitan testing
  - Reutilizables entre componentes

### 4. **Services (`/services`)** - CAPA BACKEND
- **Propósito**: Abstracción de operaciones de datos
- **Responsabilidad**: Comunicación con Firebase
- **Características**:
  - Funciones puras sin estado
  - Manejo de errores centralizado
  - Fácil de mockear para testing
  - Independiente de React

## 🔄 Flujo de Datos

```
Usuario
  ↓
Componente UI (presenta datos)
  ↓
Hook (maneja estado y efectos)
  ↓
Service (comunica con Firebase)
  ↓
Firebase (backend)
```

## 📦 Beneficios de esta Arquitectura

### ✅ Separación de Responsabilidades
- **Frontend**: Components + Features
- **Backend**: Services
- **Lógica de Estado**: Hooks

### ✅ Mantenibilidad
- Cada archivo tiene una responsabilidad clara
- Fácil localizar y modificar código
- Cambios aislados no afectan todo el sistema

### ✅ Escalabilidad
- Agregar nuevas features es simple
- Nuevos servicios se integran fácilmente
- Componentes reutilizables

### ✅ Testing
- Services son funciones puras (fácil test)
- Hooks pueden testearse independientemente
- Componentes UI son testeables sin backend

### ✅ Legibilidad
- Estructura intuitiva
- Nombres descriptivos
- Código organizado por dominio

## 🔧 Cómo Trabajar con esta Estructura

### Agregar un nuevo servicio
1. Crear función en `services/servicesService.ts`
2. Actualizar hook `useServices.ts` si es necesario
3. Usar en componente

### Agregar nueva feature
1. Crear carpeta en `features/`
2. Crear componentes específicos
3. Crear hook si se necesita estado complejo
4. Integrar en `App.tsx`

### Agregar nuevo componente UI
1. Crear archivo en `components/`
2. Props bien definidos
3. Sin lógica de negocio
4. Usar en features según necesidad

## 🚀 Comparación: Antes vs Después

### Antes (Monolítico)
```tsx
App.tsx (950+ líneas)
- Todo mezclado
- Difícil mantener
- Código duplicado
- Testing complejo
```

### Después (Modular)
```tsx
App.tsx (40 líneas) - Solo orquestación
  ├── Components (presentación)
  ├── Features (lógica de negocio)
  ├── Hooks (estado)
  └── Services (backend)
```

## 📝 Convenciones

- **Componentes**: PascalCase, archivos `.tsx`
- **Services**: camelCase, archivos `.ts`
- **Hooks**: `use` prefix, archivos `.ts`
- **Types**: Definidos en `types.ts`
- **Exports**: Named exports preferidos
