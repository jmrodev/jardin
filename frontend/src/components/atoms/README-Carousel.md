# Átomos del Carrusel

Este documento describe los átomos creados para el sistema de carrusel siguiendo el patrón de Atomic Design.

## 📁 Estructura de Archivos

```
frontend/src/components/atoms/
├── CarouselControl.jsx      # Botones de navegación
├── CarouselIndicator.jsx    # Indicadores con iconos
├── CarouselCounter.jsx      # Contador de posición
├── CarouselSlide.jsx        # Contenedor de slide
└── README-Carousel.md       # Esta documentación

frontend/src/components/molecules/
├── Carousel.jsx             # Molécula que combina los átomos

frontend/src/styles/
├── components/atoms/carousel.css
└── components/molecules/carousel.css
```

## 🧩 Átomos Disponibles

### 1. CarouselControl

Botón de navegación para anterior/siguiente.

```jsx
import CarouselControl from '../atoms/CarouselControl';

<CarouselControl
  direction="next"           // 'next' | 'prev'
  onClick={handleNext}
  disabled={false}
  size="md"                  // 'sm' | 'md' | 'lg'
  className="custom-class"
/>
```

**Props:**
- `direction`: Dirección del botón ('next' | 'prev')
- `onClick`: Función de callback
- `disabled`: Estado deshabilitado
- `size`: Tamaño del botón ('sm' | 'md' | 'lg')
- `className`: Clases CSS adicionales

### 2. CarouselIndicator

Indicador con icono para navegar directamente a un slide.

```jsx
import CarouselIndicator from '../atoms/CarouselIndicator';

<CarouselIndicator
  icon="TrendingUp"
  label="Tendencia de Asistencia"
  isActive={true}
  onClick={() => goToSlide(0)}
  size="md"
/>
```

**Props:**
- `icon`: Nombre del icono (Lucide React)
- `label`: Texto descriptivo
- `isActive`: Estado activo
- `onClick`: Función de callback
- `size`: Tamaño ('sm' | 'md' | 'lg')

### 3. CarouselCounter

Contador que muestra la posición actual.

```jsx
import CarouselCounter from '../atoms/CarouselCounter';

<CarouselCounter
  currentIndex={2}
  totalSlides={5}
  showDescription={true}
  description="Tendencia de Asistencia"
/>
```

**Props:**
- `currentIndex`: Índice actual (0-based)
- `totalSlides`: Total de slides
- `showDescription`: Mostrar descripción
- `description`: Texto descriptivo

### 4. CarouselSlide

Contenedor para el contenido de cada slide.

```jsx
import CarouselSlide from '../atoms/CarouselSlide';

<CarouselSlide
  icon="TrendingUp"
  iconColor="blue"
  title="Tendencia de Asistencia"
  borderColor="blue"
  variant="analysis"
>
  <p>Contenido del slide...</p>
</CarouselSlide>
```

**Props:**
- `icon`: Nombre del icono
- `iconColor`: Color del icono
- `title`: Título del slide
- `borderColor`: Color del borde
- `variant`: Variante ('default' | 'analysis' | 'demographic')
- `children`: Contenido del slide

## 🧬 Molécula Carousel

La molécula `Carousel` combina todos los átomos para crear un carrusel completo.

```jsx
import Carousel from '../molecules/Carousel';

const slides = [
  {
    id: 'slide1',
    title: 'Título del Slide',
    icon: 'TrendingUp',
    iconColor: 'blue',
    borderColor: 'blue',
    variant: 'analysis',
    content: <div>Contenido del slide</div>
  }
];

<Carousel
  slides={slides}
  showIndicators={true}
  showCounter={true}
  showControls={true}
  autoPlay={false}
  autoPlayInterval={5000}
/>
```

**Props:**
- `slides`: Array de objetos con la configuración de cada slide
- `showIndicators`: Mostrar indicadores
- `showCounter`: Mostrar contador
- `showControls`: Mostrar controles de navegación
- `autoPlay`: Reproducción automática
- `autoPlayInterval`: Intervalo en milisegundos

## 🎨 Colores Disponibles

Los átomos soportan los siguientes colores:

- `blue`, `orange`, `green`, `purple`
- `skyblue`, `lime`, `pink`, `indigo`
- `primary` (usa las variables CSS del tema)

## 📱 Responsive Design

Los átomos están optimizados para diferentes tamaños de pantalla:

- **Desktop**: Tamaño completo con todos los elementos visibles
- **Tablet**: Indicadores más compactos
- **Mobile**: Controles más pequeños, labels ocultos en indicadores

## ♿ Accesibilidad

- Aria-labels en todos los controles
- Navegación por teclado
- Estados visuales claros
- Contraste adecuado

## 🔧 Personalización

Puedes personalizar los estilos usando las variables CSS del tema:

```css
:root {
  --color-primary: #3b82f6;
  --color-accent: #1d4ed8;
  --bg-card: #ffffff;
  --border-primary: #e5e7eb;
  --radius-md: 8px;
  --transition-normal: all 0.2s ease;
}
```

## 📝 Ejemplo de Uso Completo

Ver `frontend/src/components/examples/CarouselExample.jsx` para un ejemplo completo de implementación. 