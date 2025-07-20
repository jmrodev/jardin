# Átomos del Slider

Este documento describe los átomos creados para el sistema de slider siguiendo el patrón de Atomic Design.

## 📁 Estructura de Archivos

```
frontend/src/components/atoms/
├── SliderContainer.jsx     # Contenedor principal con scroll-snap
├── SliderItem.jsx          # Elemento individual del slider
├── SliderImage.jsx         # Imagen específica para slider
├── SliderNavigation.jsx    # Controles de navegación (opcional)
├── SliderIndicator.jsx     # Indicadores de posición
└── README-Slider.md        # Esta documentación

frontend/src/components/molecules/
├── Slider.jsx              # Molécula que combina los átomos

frontend/src/styles/
├── components/atoms/slider.css
└── components/molecules/slider.css
```

## 🧩 Átomos Disponibles

### 1. SliderContainer

Contenedor principal con scroll-snap y comportamiento de slider.

```jsx
import SliderContainer from '../atoms/SliderContainer';

<SliderContainer
  direction="horizontal"        // 'horizontal' | 'vertical'
  snapType="mandatory"          // 'mandatory' | 'proximity' | 'none'
  snapAlign="center"            // 'start' | 'center' | 'end'
  aspectRatio="10/16"           // Relación de aspecto
  width="300px"
  height="auto"
  showScrollbar={false}
  className="custom-class"
>
  {/* SliderItems aquí */}
</SliderContainer>
```

**Props:**
- `direction`: Dirección del scroll ('horizontal' | 'vertical')
- `snapType`: Tipo de snap ('mandatory' | 'proximity' | 'none')
- `snapAlign`: Alineación del snap ('start' | 'center' | 'end')
- `aspectRatio`: Relación de aspecto (ej: '16/9', '4/3')
- `width`: Ancho del contenedor
- `height`: Alto del contenedor
- `showScrollbar`: Mostrar barra de scroll
- `className`: Clases CSS adicionales

### 2. SliderItem

Elemento individual del slider con scroll-snap.

```jsx
import SliderItem from '../atoms/SliderItem';

<SliderItem
  snapAlign="center"            // 'start' | 'center' | 'end'
  width="100%"
  height="auto"
  minWidth="300px"
  flexShrink={0}
  onClick={handleClick}
>
  {/* Contenido del item */}
</SliderItem>
```

**Props:**
- `snapAlign`: Alineación del snap para este item
- `width`: Ancho del item
- `height`: Alto del item
- `minWidth`: Ancho mínimo
- `flexShrink`: Factor de contracción flexbox
- `onClick`: Función de callback al hacer click

### 3. SliderImage

Imagen optimizada para slider con position sticky.

```jsx
import SliderImage from '../atoms/SliderImage';

<SliderImage
  src="https://example.com/image.jpg"
  alt="Descripción de la imagen"
  objectFit="cover"             // 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  borderRadius="5px"
  width="100%"
  height="100%"
  loading="lazy"
  onClick={handleImageClick}
/>
```

**Props:**
- `src`: URL de la imagen
- `alt`: Texto alternativo
- `objectFit`: Cómo ajustar la imagen
- `borderRadius`: Radio de los bordes
- `width`: Ancho de la imagen
- `height`: Alto de la imagen
- `loading`: Estrategia de carga ('lazy' | 'eager')
- `onClick`: Función de callback

### 4. SliderNavigation

Controles de navegación opcionales.

```jsx
import SliderNavigation from '../atoms/SliderNavigation';

<SliderNavigation
  direction="horizontal"        // 'horizontal' | 'vertical'
  showPrev={true}
  showNext={true}
  onPrev={handlePrev}
  onNext={handleNext}
  disabled={false}
  size="md"                     // 'sm' | 'md' | 'lg'
  position="overlay"            // 'overlay' | 'side'
/>
```

**Props:**
- `direction`: Dirección del slider
- `showPrev`: Mostrar botón anterior
- `showNext`: Mostrar botón siguiente
- `onPrev`: Función para ir al anterior
- `onNext`: Función para ir al siguiente
- `disabled`: Estado deshabilitado
- `size`: Tamaño de los botones
- `position`: Posición de los controles

### 5. SliderIndicator

Indicadores de posición actual.

```jsx
import SliderIndicator from '../atoms/SliderIndicator';

<SliderIndicator
  totalItems={5}
  currentIndex={2}
  direction="horizontal"        // 'horizontal' | 'vertical'
  position="bottom"             // 'top' | 'bottom' | 'left' | 'right'
  variant="dots"                // 'dots' | 'numbers' | 'progress'
  onItemClick={handleItemClick}
/>
```

**Props:**
- `totalItems`: Total de elementos
- `currentIndex`: Índice actual
- `direction`: Dirección del slider
- `position`: Posición del indicador
- `variant`: Tipo de indicador
- `onItemClick`: Función al hacer click en un indicador

## 🧬 Molécula Slider

La molécula `Slider` combina todos los átomos para crear un slider completo.

```jsx
import Slider from '../molecules/Slider';

const items = [
  {
    id: 'item1',
    type: 'image',
    src: 'https://example.com/image1.jpg',
    alt: 'Imagen 1',
    objectFit: 'cover',
    borderRadius: '5px'
  },
  {
    id: 'item2',
    type: 'content',
    content: <div>Contenido personalizado</div>
  }
];

<Slider
  items={items}
  direction="horizontal"
  snapType="mandatory"
  snapAlign="center"
  aspectRatio="10/16"
  width="300px"
  showNavigation={true}
  showIndicator={true}
  indicatorVariant="dots"
  indicatorPosition="bottom"
  navigationPosition="overlay"
  hideScrollbar={true}
  autoScroll={false}
  autoScrollInterval={3000}
  onItemClick={handleItemClick}
/>
```

**Props:**
- `items`: Array de elementos (imágenes o contenido)
- `direction`: Dirección del slider
- `snapType`: Tipo de snap
- `snapAlign`: Alineación del snap
- `aspectRatio`: Relación de aspecto
- `width`: Ancho del slider
- `height`: Alto del slider
- `showNavigation`: Mostrar controles de navegación
- `showIndicator`: Mostrar indicadores
- `indicatorVariant`: Tipo de indicador
- `indicatorPosition`: Posición del indicador
- `navigationPosition`: Posición de la navegación
- `hideScrollbar`: Ocultar barra de scroll
- `autoScroll`: Reproducción automática
- `autoScrollInterval`: Intervalo de auto-scroll
- `onItemClick`: Función al hacer click en un item

## 🎯 Diferencias con Carrusel

| Característica | Slider | Carrusel |
|----------------|--------|----------|
| **Navegación** | Scroll nativo | Botones controlados |
| **Comportamiento** | Scroll-snap CSS | Transiciones JS |
| **Interacción** | Táctil/arrastrar | Click en botones |
| **Rendimiento** | Nativo del navegador | JavaScript |
| **Uso típico** | Galerías de imágenes | Presentaciones |
| **Responsive** | Nativo | Requiere JS |

## 📱 Responsive Design

Los átomos del slider están optimizados para:

- **Desktop**: Scroll suave con snap
- **Tablet**: Navegación táctil mejorada
- **Mobile**: Scroll nativo optimizado

## ♿ Accesibilidad

- Navegación por teclado
- Aria-labels en controles
- Estados visuales claros
- Soporte para lectores de pantalla

## 🔧 Personalización

Puedes personalizar usando las variables CSS:

```css
:root {
  --slider-nav-bg: rgba(0, 0, 0, 0.7);
  --slider-nav-color: white;
  --slider-indicator-bg: rgba(255, 255, 255, 0.5);
  --slider-indicator-active: white;
}
```

## 📝 Ejemplo de Uso Completo

Ver `frontend/src/components/examples/SliderExample.jsx` para ejemplos completos de implementación.

## 🚀 Casos de Uso

### Galería de Imágenes
```jsx
<Slider
  items={imageItems}
  aspectRatio="16/9"
  showNavigation={true}
  showIndicator={true}
  indicatorVariant="dots"
/>
```

### Contenido Horizontal
```jsx
<Slider
  items={contentItems}
  direction="horizontal"
  snapType="proximity"
  showIndicator={true}
  indicatorVariant="numbers"
/>
```

### Slider Vertical
```jsx
<Slider
  items={verticalItems}
  direction="vertical"
  height="400px"
  showNavigation={true}
  indicatorPosition="right"
/>
``` 