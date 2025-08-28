
<script setup>
import WineCellarBackground from './components/animation.vue'
</script>

<template>
  <WineCellarBackground />
    <router-view></router-view>
</template>

<style>
html {
  scroll-behavior: smooth;
}

body, router-view {
  background-color: black;
  height: 100%;
  color: white; 
}
</style>
