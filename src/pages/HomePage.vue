<template>
    <div class="q-pa-md">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide :name="1" img-src="./assets/AEstudos2023.jpeg" @click="navigateToSecondScreen" />
        <q-carousel-slide :name="2" img-src="./assets/FeiraProfissoes_2023.png" @click="navigateToSecondScreen" />
        <q-carousel-slide :name="3" img-src="./assets/Vestibulinho_2s_2023_inf.jpeg" @click="navigateToSecondScreen" />
      </q-carousel>
    </div>
  </template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const slide = ref(1)
    const autoplay = ref(true)
    const router = useRouter()

    const navigateToSecondScreen = () => {
      router.push({ name: 'HomePage' })
    }

    return {
      slide,
      autoplay,
      navigateToSecondScreen
    }
  }
}
</script>
