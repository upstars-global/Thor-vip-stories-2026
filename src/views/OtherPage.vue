<template>
  <button @click="navigateToIndex">Go to Index Page</button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToIndex = () => {
  router.push({ name: 'index' })
}
</script>

<style scoped>
/* Add your CSS styles here */
</style>
