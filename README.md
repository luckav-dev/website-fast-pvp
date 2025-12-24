# FastPVP - Página Web

Página web moderna para el servidor FiveM PVP FastPVP con animaciones avanzadas y diseño profesional.

## 🚀 Tecnologías

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **GSAP** - Animaciones avanzadas
- **shadcn/ui** - Componentes UI

## 📦 Instalación

```bash
npm install
```

## 🖥️ Desarrollo

### Local (solo este PC)
```bash
npm run dev
```
Abre http://localhost:3000

### Red Local (acceso desde móvil en misma WiFi)
```bash
npm run dev:network
```
Abre http://[TU-IP]:3000 (ej: http://192.168.1.100:3000)

Para ver tu IP:
- **Windows**: `ipconfig` en CMD
- **Linux/Mac**: `ip addr` o `ifconfig`

### Internet (acceso desde cualquier lugar)

**Opción 1: LocalTunnel** (más fácil)
```bash
# Terminal 1 - Servidor
npm run dev

# Terminal 2 - Túnel
npm run dev:tunnel
```
Te dará una URL pública como `https://xxxxx.loca.lt`

**Opción 2: ngrok** (más estable)
```bash
# Terminal 1 - Servidor
npm run dev

# Terminal 2 - Túnel (necesita cuenta ngrok)
ngrok http 3000
```

**Opción 3: Cloudflare Tunnel** (producción)
Más info: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/

## 🏗️ Producción

```bash
npm run build
npm run start:network
```

## 📁 Estructura

```
web/
├── app/                    # Páginas
│   ├── page.tsx           # Home
│   ├── players/           # Jugadores online
│   ├── leaderboard/       # Rankings
│   ├── rules/             # Reglas
│   └── staff/             # Staff
├── components/
│   ├── ui/                # Componentes reutilizables
│   │   ├── animated-text.tsx
│   │   ├── animated-card.tsx
│   │   ├── animated-button.tsx
│   │   ├── animated-counter.tsx
│   │   ├── animated-background.tsx
│   │   └── motion-wrapper.tsx
│   ├── sections/          # Secciones de página
│   ├── header/            # Navbar
│   └── footer/            # Footer
├── hooks/                 # Hooks personalizados
├── lib/                   # Utilidades
└── public/               # Assets estáticos
```

## 🎨 Componentes de Animación

### Text
- `AnimatedText` - Texto letra por letra
- `BlurText` - Texto con blur-in
- `GradientText` - Texto con gradiente animado
- `Typewriter` - Efecto máquina de escribir

### Cards
- `SpotlightCard` - Card con spotlight que sigue el mouse
- `TiltCard` - Card con efecto 3D tilt
- `GlowingCard` - Card con glow animado
- `BorderBeamCard` - Card con borde animado

### Buttons
- `MagneticButton` - Botón con efecto magnético
- `ShimmerButton` - Botón con shimmer
- `GlowButton` - Botón con glow en hover
- `RippleButton` - Botón con efecto ripple

### Background
- `GridBackground` - Fondo con grid
- `DotBackground` - Fondo con puntos
- `Spotlight` - Spotlight animado
- `Glow` - Glow flotante
- `Meteors` - Efecto meteoros

### Motion
- `FadeIn` - Fade in con dirección
- `ScaleIn` - Scale in
- `SlideIn` - Slide desde lateral
- `StaggerContainer/Item` - Animación escalonada
- `HoverScale` - Scale en hover

## ⚙️ Configuración

Edita `lib/config.ts` para personalizar:
- Nombre del servidor
- IP y puerto
- Links de Discord
- Redes sociales

## 📱 Acceso Móvil

1. Ejecuta `npm run dev:network`
2. Busca tu IP local (ej: 192.168.1.100)
3. En el móvil, abre http://192.168.1.100:3000
4. ¡Listo!

Para acceso fuera de tu red local, usa LocalTunnel o ngrok.
