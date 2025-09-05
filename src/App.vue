<template>
  <div class="global text-center">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Covid-19 Tracker</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <div class="navbar-text"></div>
            </li>
            <li class="nav-item">
              <a class="nav-link" target="_blank" rel="noopener" href="http://covid.casjay.coffee">Global Info</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" target="_blank" rel="noopener" href="http://wherescovid.casjay.coffee">Wheres Covid</a>
            </li>
          </ul>
          <span class="navbar-text">
            <a
              class="text-success"
              href="https://disease.sh"
              target="_blank"
              rel="noopener"
            >Data Provided by Disease.sh</a>
          </span>
        </div>
      </div>
    </nav>
    <div class="container" v-if="!loading">
      <div v-if="error">
        <h2 class="error">Error: {{ error }}</h2>
      </div>
      <div v-else>
        <div class="purple-text">
          <h1 class="text-center mt-5">NYS Data</h1>
          <h3 class="text-center">
            <span class="purple-text">updated on: {{ formatDate(data?.nys?.updated) }}</span><br />
            <span class="purple-text">New cases: {{ data?.nys?.todayCases || 0 }}</span><br />
            <span class="purple-text">Active: {{ data?.nys?.active || 0 }}</span><br />
            <span class="purple-text">Tests: {{ data?.nys?.tests || 0 }}</span><br />
            <span class="purple-text">Deaths: {{ data?.nys?.deaths || 0 }}</span><br />
            <span class="purple-text">Cases Per Million: {{ data?.nys?.casesPerOneMillion || 0 }}</span><br />
            <span class="purple-text">Deaths Per million: {{ data?.nys?.deathsPerOneMillion || 0 }}</span><br />
            <span class="purple-text">Tests Per million: {{ data?.nys?.testsPerOneMillion || 0 }}</span><br />
            <span class="purple-text">Total Population: {{ data?.nys?.population || 0 }}</span><br />
          </h3>
        </div>
        <br />
      </div>
    </div>
    <h2 v-else class="mt-5 text-center">
      Please wait.....<br />Loading the data from {{ url }}...
    </h2>
    <div class="purple-text text-center">
      <br />
      <br />Made with 💜💜💜💜💜💜 by
      <br />
      <a
        href="http://github.com/casjay"
        target="_blank"
        rel="noopener"
        class="text-primary"
      >Jason M. Hempstead (Casjay)</a>
    </div>
    <div class="purple-gradient text-center">
      This is an open source project
      <br />
      <br />Data source:
      <a
        target="_blank"
        rel="noopener"
        class="text-danger"
        href="http://disease.sh"
      > disease.sh </a>
      <br />
      <br />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const url = 'https://api.casjay.coffee/api/v1/usa/nys'
const loading = ref(false)
const data = ref(null)
const error = ref('')

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  return new Date(timestamp).toLocaleString()
}

onMounted(async () => {
  console.log('Component mounted...')
  loading.value = true
  try {
    const response = await fetch(url)
    const json = await response.json()
    data.value = json
  } catch (err) {
    error.value = err.message
  }
  loading.value = false
})
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.error {
  color: red;
}

.purple-text {
  color: #9b59b6;
}

.purple-gradient {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  margin-top: 20px;
}
</style>
