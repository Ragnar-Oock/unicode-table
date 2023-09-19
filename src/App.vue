<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { computed, ref } from 'vue';
import { useConfigStore } from './stores/config';

const currentIndex = ref(0)

const router = useRouter();
const config = useConfigStore();

function navigate(): void {
  router.push({
    name: 'table',
    params: {
      startIndex: currentIndex.value.toString(10)
    }
  })
}

function goToPrevious(): void {
  if (currentIndex.value < config.cellsPerPage) {
    currentIndex.value = 0;
  }
  else {
    currentIndex.value = currentIndex.value - config.cellsPerPage;
  }
  navigate();
}

function goToNext(): void {
  currentIndex.value = currentIndex.value + config.cellsPerPage;
  navigate();
}

const disablePrevious = computed(() => currentIndex.value < config.cellsPerPage)

</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <button @click="goToPrevious" :disabled="disablePrevious">Previous {{ config.cellsPerPage }}</button>
        <button @click="goToNext">Next {{ config.cellsPerPage }}</button>
      </nav>

      <div class="input-group">
        <label for="nbRows">number of rows</label>
        <input type="range" name="nbRows" id="nbRows" min="2" max="100" step="1" v-model="config.numberOfRows">
      </div>

      <div class="input-group">
        <label for="nbCols">number of columns</label>
        <input type="range" name="nbCols" id="nbCols" min="2" max="36" step="1" v-model="config.numberOfColumns">
      </div>

    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.input-group {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    position: sticky;
    top: 0;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
