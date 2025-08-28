<template>
  <div class="wine-catalog">
    <!-- Menú lateral tipo ruleta -->
    <div class="wine-wheel-menu" :class="{ 'expanded': isMenuExpanded }">
      <div class="wheel-toggle" @click="toggleMenu">
        <div class="wheel-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <div class="wheel-container">
        <div class="wheel" :style="{ transform: `rotate(${wheelRotation}deg)` }">
          <div 
            v-for="(wine, index) in wines" 
            :key="index"
            class="wheel-item"
            :class="{ active: currentWineIndex === index }"
            :style="{ 
              transform: `rotate(${index * (360 / wines.length)}deg) translateY(-120px)`,
              transitionDelay: `${index * 100}ms`
            }"
            @click="navigateToWine(index)"
          >
            <div class="wheel-item-content" :style="{ transform: `rotate(-${index * (360 / wines.length)}deg) rotate(-${-wheelRotation.value}deg)` }">
              <div class="wheel-item-icon">🍷</div>
              <span class="wheel-item-text">{{ wine.name.replace('Vino de ', '') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="wine-content-wrapper" ref="contentWrapper">
      <section 
        v-for="(wine, index) in wines" 
        :key="index"
        :ref="el => { if (el) wineRefs[index] = el }"
        class="wine-section" 
        :class="{ 'in-view': currentWineIndex === index }"
      >
        <div class="wine-content">
          <div class="wine-text">
            <h1 class="wine-title">{{ wine.name }}</h1>
            <div class="wine-divider"></div>
            
            <p class="wine-subtitle">
              {{ wine.subtitle }}
            </p>
            
            <ul class="wine-benefits">
              <li v-for="(benefit, i) in wine.benefits" :key="i">{{ benefit }}</li>
            </ul>
            
            <p class="wine-description">
              DESCUBRE EN CADA COPA EL EQUILIBRIO PERFECTO ENTRE SALUD Y PLACER.
            </p>
          </div>
          <div class="wine-image">
            <img :src="wine.image" :alt="wine.name" class="wine-bottle">
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import moraImg from '../assets/images/vino_mora.png';
import naranjaImg from '../assets/images/vino_naranja.png';
import cafeImg from '../assets/images/vino_cafe.png';
import gulupaImg from '../assets/images/vino_gulupa.png';

const wines = [
  {
    name: 'Vino de Mora',
    subtitle: 'UN SABOR QUE ENAMORA Y UNA TRADICIÓN QUE CUIDA DE TI.',
    image: moraImg,
    benefits: [
      'RICO EN ANTIOXIDANTES QUE AYUDAN A TU CORAZÓN',
      'REFRESCANTE, JUGOSO Y NATURAL',
      'PERFECTO PARA COMPARTIR Y CELEBRAR MOMENTOS ÚNICOS'
    ],
    description: 'DESCUBRE EN CADA COPA EL EQUILIBRIO PERFECTO ENTRE SALUD Y PLACER.'
  },
  {
    name: 'Vino de Naranja',
    subtitle: 'EL TOQUE CÍTRICO QUE REFRESCA CUERPO Y ESPÍRITU.',
    image: naranjaImg,
    benefits: [
      'ALTO EN VITAMINA C, FORTALECE TUS DEFENSAS',
      'FAVORECE LA CIRCULACIÓN Y AYUDA A TU DIGESTIÓN',
      'NATURAL, FRESCO Y LLENO DE ENERGÍA'
    ],
    description: 'UN VINO LIGERO, VIBRANTE Y SALUDABLE, PERFECTO PARA CADA BRINDIS.'
  }
  ,
  {
    name: 'Vino de Cafe',
    subtitle: 'EL SABOR AUTENTICO DE COLOMBIA EN CADA COPA.',
    image: cafeImg,
    benefits: [
      'APORTA ENERGIA NATURAL Y VITALIDAD',
      'RICO EN ANTIOXIDANTES. QUE PROTEGEN  EL ORGANISMO',
      'ESTIMULA LOS SENTIDOS Y MEJORA EL ESTADO ANIMO'
    ],
    description: 'UNA EXPERIENCIA UNICA QUE CELEBRA LA TRADICIÓN CAFETERA COLOMBIANA.'
  }

    ,
  {
    name: 'Vino de Gulupa',
    subtitle: 'EL SABOR AUTENTICO DE COLOMBIA EN CADA COPA.',
    image: gulupaImg,
    benefits: [
      'APORTA ENERGIA NATURAL Y VITALIDAD',
      'RICO EN ANTIOXIDANTES. QUE PROTEGEN  EL ORGANISMO',
      'ESTIMULA LOS SENTIDOS Y MEJORA EL ESTADO ANIMO'
    ],
    description: 'UNA EXPERIENCIA UNICA QUE CELEBRA LA TRADICIÓN CAFETERA COLOMBIANA.'
  }
]

const isMenuExpanded = ref(false)
const currentWineIndex = ref(0)
const wheelRotation = ref(0)
const wineRefs = reactive({})
const contentWrapper = ref(null)

const toggleMenu = () => {
  isMenuExpanded.value = !isMenuExpanded.value
}

const navigateToWine = (index) => {
  if (currentWineIndex.value === index) return
  
  currentWineIndex.value = index
  wheelRotation.value = -index * (360 / wines.length)
  
  // Smooth scroll hacia el vino seleccionado
  nextTick(() => {
    if (wineRefs[index]) {
      wineRefs[index].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }
  })
  
  // Cerrar menú en móvil después de la navegación
  if (window.innerWidth <= 768) {
    setTimeout(() => {
      isMenuExpanded.value = false
    }, 500)
  }
}

const handleScroll = () => {
  if (!contentWrapper.value) return
  
  const scrollTop = contentWrapper.value.scrollTop
  const windowHeight = window.innerHeight
  
  Object.keys(wineRefs).forEach((key) => {
    const index = parseInt(key)
    const element = wineRefs[index]
    if (element) {
      const rect = element.getBoundingClientRect()
      const isVisible = rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2
      
      if (isVisible && currentWineIndex.value !== index) {
        currentWineIndex.value = index
        wheelRotation.value = -index * (360 / wines.length)
      }
    }
  })
}

onMounted(() => {
  if (contentWrapper.value) {
    contentWrapper.value.addEventListener('scroll', handleScroll)
  }
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (contentWrapper.value) {
    contentWrapper.value.removeEventListener('scroll', handleScroll)
  }
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.wine-catalog {
    margin: 12px;
  max-width: 1200px;  
  min-height: 100vh;
  font-family: 'Cinzel', serif;
  color: #d4af37;
  position: relative;
}

/* Menú lateral tipo ruleta */
.wine-wheel-menu {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 1000;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.wine-wheel-menu.expanded .wheel-container {
  opacity: 1;
  transform: scale(1);
  pointer-events: all;
}

.wheel-toggle {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #d4af37, #f4e7aa);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1001;
}

.wheel-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 35px rgba(212, 175, 55, 0.5);
}

.wheel-icon {
  display: flex;
  flex-direction: column;
  gap: 6.5px;
}

.wheel-icon span {
  width: 20px;
  height: 2px;
  background: #1a1a1a;
  border-radius: 1px;
  transition: all 0.3s ease;
}

.expanded .wheel-icon span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.expanded .wheel-icon span:nth-child(2) {
  opacity: 0;
}

.expanded .wheel-icon span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.wheel-container {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%) scale(0.3);
  width: 280px;
  height: 280px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.wheel {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.1), transparent);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(212, 175, 55, 0.3);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.wheel-item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  margin: -40px 0 0 -40px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center center;
}

.wheel-item.active .wheel-item-content {
  background: linear-gradient(135deg, #d4af37, #f4e7aa);
  color: #1a1a1a;
  transform: scale(1.2) rotate(0deg);
}

.wheel-item-content {
  width: 100%;
  height: 100%;
  background: rgba(45, 45, 45, 0.9);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(212, 175, 55, 0.3);
  backdrop-filter: blur(5px);
  transform-origin: center center;
}

.wheel-item:hover .wheel-item-content {
  transform: scale(1.1) rotate(0deg);
  border-color: #d4af37;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
}

.wheel-item-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.wheel-item-text {
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  line-height: 1.1;
  font-family: "Arvo", serif;
}

/* Contenido principal */
.wine-content-wrapper {
  margin-left: 0;
  transition: margin-left 0.3s ease;
}

.wine-section {
  padding: 80px 40px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  opacity: 0.6;
  transform: translateX(50px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.wine-section.in-view {
  opacity: 1;
  transform: translateX(0);
}

.wine-content {
  display: flex;
  align-items: center;
  gap: 80px;
  width: 100%;
}

.wine-text {
  flex: 1;
  position: relative;
  z-index: 2;
}

.wine-title {
  font-size: 3.5rem;
  font-weight: 700;
  font-family: "Arvo", serif;
  margin: 0 0 30px 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  background: linear-gradient(45deg, #d4af37, #f4e7aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.wine-divider {
  width: 120px;
  height: 2px;
  background: linear-gradient(90deg, #d4af37, transparent);
  margin: 0 0 40px 0;
}

.wine-subtitle {
  font-family: "Arvo", serif;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  color: #e6e6e6;
  font-weight: 300;
  letter-spacing: 1px;
}

.wine-benefits {
  font-family: "Arvo", serif;
  list-style: none;
  padding: 0;
  margin: 30px 0;
}

.wine-benefits li {
  font-size: 0.95rem;
  margin: 15px 0;
  padding-left: 20px;
  position: relative;
  color: #cccccc;
  line-height: 1.5;
  letter-spacing: 0.5px;
}

.wine-benefits li::before {
  content: '•';
  color: #d4af37;
  font-size: 1.5rem;
  position: absolute;
  left: 0;
  top: -3px;
}

.wine-description {
  font-size: 1rem;
  font-style: italic;
  color: #d4af37;
  margin-top: 40px;
  line-height: 1.6;
  letter-spacing: 1px;
  font-weight: 300;
}

.wine-image {
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.wine-bottle {
  width: 300px;
  height: 540px;
  border-radius: 20px;
  object-fit: cover;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
  transition: transform 0.3s ease;
}

.wine-bottle:hover {
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .wine-wheel-menu {
    left: 15px;
    top: 20px;
    transform: none;
  }
  
  .wheel-toggle {
    width: 50px;
    height: 50px;
  }
  
  .wheel-container {
    width: 240px;
    height: 240px;
  }
  
  .wine-content {
    flex-direction: column;
    gap: 40px;
    text-align: center;
  }
  
  .wine-title {
    font-size: 2.5rem;
  }
  
  .wine-section {
    padding: 60px 20px;
  }
  
  .wine-bottle {
    width: 200px;
    height: 360px;
  }
}

/* Background pattern */
.wine-catalog::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}
</style>