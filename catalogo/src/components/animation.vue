<template>
    <div class="container">
        <div class="wine-particles">
            <div class="particle" style="--duration: 25s; --delay: 0"></div>
            <div class="particle" style="--duration: 30s; --delay: 2"></div>
            <div class="particle" style="--duration: 20s; --delay: 4"></div>
            <div class="particle" style="--duration: 35s; --delay: 1"></div>
            <div class="particle" style="--duration: 28s; --delay: 3"></div>
            <div class="particle" style="--duration: 22s; --delay: 5"></div>
            <div class="particle" style="--duration: 32s; --delay: 2.5"></div>
            <div class="particle" style="--duration: 26s; --delay: 4.5"></div>
            <div class="particle" style="--duration: 24s; --delay: 1.5"></div>
            <div class="particle" style="--duration: 29s; --delay: 3.5"></div>
            <div class="particle" style="--duration: 21s; --delay: 0.5"></div>
            <div class="particle" style="--duration: 33s; --delay: 5.5"></div>
            <div class="particle" style="--duration: 27s; --delay: 2.8"></div>
            <div class="particle" style="--duration: 31s; --delay: 4.2"></div>
            <div class="particle" style="--duration: 23s; --delay: 1.8"></div>
        </div>
    </div>
</template>

<script setup>

defineOptions({ name: 'WineCellarBackground' })
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}

.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;
}
.wine-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
}

.wine-particles .particle {
    position: relative;
    width: 6px;
    height: 6px;
    background: transparent;
    margin: 0 2px;
    border-radius: 50%;
    opacity: 0;
    animation: floatUp var(--duration) linear infinite;
    animation-delay: calc(var(--delay) * -1s);
}

/* Partículas de vino tinto - más brillantes */
.wine-particles .particle:nth-child(odd) {
    background: radial-gradient(circle, rgba(220, 20, 60, 0.6) 0%, rgba(178, 34, 34, 0.4) 50%, transparent 70%);
    box-shadow: 
        0 0 6px rgba(220, 20, 60, 0.8),
        0 0 12px rgba(178, 34, 34, 0.5),
        0 0 18px rgba(139, 0, 0, 0.3);
}

/* Partículas de vino blanco/champagne - más luminosas */
.wine-particles .particle:nth-child(even) {
    background: radial-gradient(circle, rgba(255, 215, 0, 0.5) 0%, rgba(255, 223, 0, 0.3) 50%, transparent 70%);
    box-shadow: 
        0 0 6px rgba(255, 215, 0, 0.7),
        0 0 12px rgba(255, 223, 0, 0.4),
        0 0 18px rgba(255, 235, 59, 0.2);
}

/* Partículas especiales (burbujas de champagne) - más visibles */
.wine-particles .particle:nth-child(3n) {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(240, 248, 255, 0.25) 50%, transparent 70%);
    box-shadow: 
        0 0 5px rgba(255, 255, 255, 0.6),
        0 0 10px rgba(240, 248, 255, 0.4),
        0 0 15px rgba(255, 255, 255, 0.2);
    animation-duration: calc(var(--duration) * 0.8);
}

@keyframes floatUp {
    0% {
        transform: translateY(100vh) scale(0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 0.6;
        transform: translateY(90vh) scale(0.3) rotate(18deg);
    }
    50% {
        opacity: 0.8;
        transform: translateY(50vh) scale(1) rotate(180deg);
    }
    90% {
        opacity: 0.4;
        transform: translateY(10vh) scale(1.2) rotate(340deg);
    }
    100% {
        transform: translateY(-10vh) scale(0) rotate(360deg);
        opacity: 0;
    }
}

/* Efecto de resplandor sutil en el fondo - ajustado para fondo negro */
.container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

}

@keyframes subtleGlow {
    0% { opacity: 0.3; }
    100% { opacity: 0.7; }
}

/* Responsive design - colores más intensos para móvil */
@media (max-width: 767px) {
    .wine-particles .particle {
        width: 1.5px;
        height: 1.5px;
        margin: 0 1px;
    }
    
    .wine-particles .particle:nth-child(odd) {
        box-shadow: 
            0 0 4px rgba(220, 20, 60, 0.8),
            0 0 8px rgba(178, 34, 34, 0.5);
    }
    
    .wine-particles .particle:nth-child(even) {
        box-shadow: 
            0 0 4px rgba(255, 215, 0, 0.7),
            0 0 8px rgba(255, 223, 0, 0.4);
    }

    .wine-particles .particle:nth-child(3n) {
        box-shadow: 
            0 0 3px rgba(255, 255, 255, 0.6),
            0 0 6px rgba(240, 248, 255, 0.4);
    }
}
</style>