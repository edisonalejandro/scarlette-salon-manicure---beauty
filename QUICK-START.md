# 🚀 Guía Rápida - Scarlette Salon

## 📝 Resumen de la Reestructuración

El proyecto ha sido completamente refactorizado de un archivo monolítico de 950+ líneas a una arquitectura modular y escalable.

## ✨ Lo que se hizo

### Antes
- ✗ Todo en un solo archivo `App.tsx`
- ✗ 950+ líneas de código mezclado
- ✗ Lógica de negocio y UI mezcladas
- ✗ Difícil de mantener y testear
- ✗ Llamadas directas a Firebase distribuidas

### Después
- ✓ **Arquitectura Modular** con separación clara de responsabilidades
- ✓ **40 líneas** en App.tsx (solo orquestación)
- ✓ **4 servicios** para backend (Firebase)
- ✓ **4 custom hooks** para manejo de estado
- ✓ **13 componentes** organizados por función
- ✓ Fácil de mantener, testear y escalar

## 📂 Nueva Estructura

```
src/
├── services/        → Backend (Firebase operations)
├── hooks/          → Estado y efectos (React hooks)
├── components/     → UI reutilizables
├── features/       → Lógica de negocio (Gallery, Booking, Admin)
└── App.tsx         → Orquestador principal
```

## 🎯 Cómo usar la nueva arquitectura

### 1. Agregar una nueva funcionalidad (Feature)

```bash
# Crear estructura
src/features/nueva-feature/
  ├── NuevaFeature.tsx        # Componente principal
  ├── SubComponente1.tsx      # Sub-componentes
  └── SubComponente2.tsx
```

```tsx
// Ejemplo: src/features/nueva-feature/NuevaFeature.tsx
import React from 'react';

export function NuevaFeature() {
  return (
    <section id="nueva-feature">
      {/* Tu código aquí */}
    </section>
  );
}
```

```tsx
// Integrar en App.tsx
import { NuevaFeature } from './features/nueva-feature/NuevaFeature';

// En el return:
<NuevaFeature />
```

### 2. Agregar un nuevo servicio de backend

```tsx
// src/services/miNuevoService.ts
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION_NAME = 'mi-coleccion';

export async function crearItem(data: any) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
  return docRef.id;
}

export function suscribirseAItems(callback: (items: any[]) => void) {
  // Implementar suscripción
}
```

### 3. Crear un custom hook para estado

```tsx
// src/hooks/useMiDato.ts
import { useState, useEffect } from 'react';
import * as miServicio from '../services/miNuevoService';

export function useMiDato() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = miServicio.suscribirseAItems((items) => {
      setDatos(items);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { datos, loading };
}
```

### 4. Crear un componente UI reutilizable

```tsx
// src/components/MiBoton.tsx
import React from 'react';

interface MiBotonProps {
  texto: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function MiBoton({ texto, onClick, variant = 'primary' }: MiBotonProps) {
  return (
    <button 
      onClick={onClick}
      className={variant === 'primary' ? 'gold-gradient' : 'border-gold'}
    >
      {texto}
    </button>
  );
}
```

## 🔧 Ejemplos de Uso

### Ejemplo 1: Usar un hook en un componente

```tsx
import { useAuth } from '../hooks/useAuth';
import { useServices } from '../hooks/useServices';

function MiComponente() {
  const { user, isAdmin } = useAuth();
  const { services, loading } = useServices();

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1>Bienvenido {user?.displayName}</h1>
      {services.map(s => <div key={s.id}>{s.name}</div>)}
    </div>
  );
}
```

### Ejemplo 2: Llamar a un servicio directamente

```tsx
import * as appointmentService from '../services/appointmentService';

async function hacerReserva() {
  try {
    const id = await appointmentService.createAppointment({
      userId: 'user123',
      serviceId: 'service456',
      date: '2026-03-27',
      time: '14:30',
      clientName: 'Juan Pérez',
      clientPhone: '+56912345678'
    });
    console.log('Reserva creada:', id);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## 📋 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build
npm run preview

# Linting
npm run lint

# Limpiar dist
npm run clean
```

## 🎨 Patrones de Diseño Aplicados

### 1. **Separation of Concerns**
- UI separada de lógica de negocio
- Backend separado de frontend

### 2. **Container/Presenter Pattern**
- Containers (features): Lógica y estado
- Presenters (components): Solo renderizado

### 3. **Custom Hooks Pattern**
- Encapsulación de lógica reutilizable
- Facilita testing y mantenimiento

### 4. **Service Layer Pattern**
- Capa de abstracción para Firebase
- Facilita cambio de backend

## 🧪 Testing (Futuro)

La nueva estructura facilita el testing:

```tsx
// Hook testing
test('useAuth returns user data', () => {
  const { result } = renderHook(() => useAuth());
  expect(result.current.user).toBeDefined();
});

// Service testing
test('createAppointment creates document', async () => {
  const id = await appointmentService.createAppointment(mockData);
  expect(id).toBeTruthy();
});

// Component testing
test('Navbar renders user name', () => {
  render(<Navbar user={mockUser} {...props} />);
  expect(screen.getByText(mockUser.displayName)).toBeInTheDocument();
});
```

## 📚 Documentación Adicional

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detalles de arquitectura
- [README.md](./README.md) - Información del proyecto

## 🎓 Mejores Prácticas

1. **No mezclar responsabilidades**
   - UI en components/
   - Lógica en features/
   - Estado en hooks/
   - Backend en services/

2. **Props bien tipadas**
   ```tsx
   interface MiComponenteProps {
     titulo: string;
     datos: Dato[];
     onSelect: (id: string) => void;
   }
   ```

3. **Manejo de errores**
   ```tsx
   try {
     await miServicio.operacion();
   } catch (error) {
     console.error('Error específico:', error);
     // Mostrar mensaje al usuario
   }
   ```

4. **Loading states**
   ```tsx
   if (loading) return <LoadingSpinner />;
   if (error) return <ErrorMessage error={error} />;
   return <MiContenido data={datos} />;
   ```

## ✅ Checklist para Nuevas Features

- [ ] Crear componente en `/features`
- [ ] Crear service si necesita backend
- [ ] Crear hook si necesita estado complejo
- [ ] Tipar props e interfaces
- [ ] Manejar loading/error states
- [ ] Integrar en App.tsx
- [ ] Verificar que compile sin errores
- [ ] Probar en navegador

## 🚀 Próximos Pasos Sugeridos

1. Agregar tests unitarios
2. Implementar validación de formularios
3. Agregar manejo de errores más robusto
4. Implementar caché con React Query
5. Agregar autenticación con más providers
6. Implementar búsqueda/filtrado en admin panel
