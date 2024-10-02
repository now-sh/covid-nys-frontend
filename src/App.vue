<template>
  <div class="global text-center">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">Covid-19 Tracker</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <div class="navbar-text"></div>
          </li>
          <li class="nav-item">
            <a class="nav-link" target="_blank" rel="noopener" href="http://covid.casjay.now.sh">Global Info</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" target="_blank" rel="noopener" href="http://wherescovid.casjay.now.sh">Wheres Covid</a>
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
    </nav>
    <div class="container" v-if="!loading">
      <div v-if="error">
        <h2 class="error">Error: {{ error }}</h2>
      </div>
      <div v-else>
        <div class="purple-text" >
          <h1 class="text-center mt-5">NYS Data</h1>
          <h3 class="text-center">
                Last updated on:       {{ data.nys.updated }}<br />
                New cases:             {{ data.nys.todayCases }}<br />
                Active:                {{ data.nys.active }}<br />
                Tests:                 {{ data.nys.tests }}
                Deaths:                {{ data.nys.deaths }}<br />
                Cases Per Million:     {{ data.nys.casesPerOneMillion }}<br />
                Deaths Per million:    {{ data.nys.deathsPerOneMillion }}<br />
                Tests Per million:     {{ data.nys.testsPerOneMillion }}<br />
                Total Population:      {{ data.nys.population }}<br />
          </h3>
        </div>
        <br />
      </div>
        <h2 v-else class="mt-10 text-center">
          Please wait.....<br />Loading the data from {{ url }}...
        </h2>
    </div>
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

<script>
const url = 'https://api.casjay.now.sh/api/v1/usa/nys';
export default {
  name: "App",
  data: () => ({
    loading: false,
    data: null,
    error: ""
  }),
  async created() {
    console.log("Component created...");
    this.loading = true;
    try {
      const response = await fetch(url);
      const json = await response.json();
      this.data = json;
    } catch (error) {
      this.error = error.message;
    }
    this.loading = false;
    console.log(this.data)
  }
};
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
</style>
