<template>
  <div class="app-container">
    <!-- Skip to Content Link for Screen Readers -->
    <a href="#main-content" class="visually-hidden-focusable skip-link">
      Skip to main content
    </a>
    
    <header role="banner" class="app-header">
      <nav class="navbar navbar-expand-lg" role="navigation" aria-label="Main navigation">
        <div class="container">
          <!-- Brand/Logo -->
          <a href="/" class="navbar-brand" aria-label="New York State COVID-19 Dashboard Home">
            <span class="brand-icon" aria-hidden="true">🏙️</span>
            <span class="brand-text">NYS COVID-19</span>
          </a>

          <!-- Mobile Menu Toggle -->
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
            aria-controls="main-nav"
            aria-expanded="false"
            aria-label="Toggle navigation menu"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <!-- Navigation Menu -->
          <div class="collapse navbar-collapse" id="main-nav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" role="menubar">
              <li class="nav-item" role="none">
                <a href="/" class="nav-link" role="menuitem" aria-label="New York State statistics">
                  <span class="nav-icon" aria-hidden="true">🏛️</span>
                  <span class="nav-text">NYS Data</span>
                </a>
              </li>
            </ul>
            
            <!-- External Links -->
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0" role="menubar" aria-label="External resources">
              <li class="nav-item" role="none">
                <a
                  class="nav-link external-link"
                  href="https://covid.casjay.coffee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  aria-label="Global COVID data (opens in new tab)"
                >
                  <span class="nav-text">Global Data</span>
                  <span class="external-icon" aria-hidden="true">↗</span>
                </a>
              </li>
              <li class="nav-item" role="none">
                <a
                  class="nav-link external-link"
                  href="https://location.covid.casjay.coffee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  aria-label="Location tracker (opens in new tab)"
                >
                  <span class="nav-text">Location Tracker</span>
                  <span class="external-icon" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content Area -->
    <main id="main-content" class="main-content" role="main" tabindex="-1">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container" role="status" aria-live="polite">
          <div class="spinner-container">
            <div class="spinner-border" role="status" aria-label="Loading New York State COVID-19 data">
              <span class="visually-hidden">Loading...</span>
            </div>
            <h2 class="loading-text">Loading NYS data...</h2>
            <p class="loading-subtitle">Fetching latest New York State COVID-19 statistics</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-container" role="alert" aria-live="assertive">
          <div class="alert alert-danger">
            <h2 id="error-heading">Error Loading Data</h2>
            <p>{{ error }}</p>
            <button @click="fetchData" class="btn btn-outline-danger" aria-describedby="error-heading">
              <span aria-hidden="true">🔄</span> Retry
            </button>
          </div>
        </div>

        <!-- NYS Data Display -->
        <div v-else class="data-container">
          <header class="page-header text-center">
            <h1 id="nys-stats-heading" class="page-title">
              <span role="img" aria-label="Medical symbols">😷 🏥 🦠 🧫</span>
              <br />
              New York State COVID-19 Statistics
            </h1>
            <div class="alert alert-info">
              <p>
                <strong>New York State specific data</strong> from official state reporting and disease.sh API
              </p>
            </div>
          </header>

          <!-- Statistics Grid -->
          <div class="stats-grid" role="region" aria-labelledby="nys-stats-heading">
            <div class="row g-3 g-md-4 justify-content-center">
              <!-- Total Cases -->
              <div class="col-6 col-sm-4 col-lg-3">
                <article class="stat-card cases" tabindex="0" role="article" 
                         aria-label="Total COVID-19 cases in New York State">
                  <div class="stat-icon" aria-hidden="true">🦠</div>
                  <h3 class="stat-label">Total Cases</h3>
                  <div class="stat-value" aria-live="polite">{{ formatNumber(data?.cases) }}</div>
                </article>
              </div>

              <!-- Recovered -->
              <div class="col-6 col-sm-4 col-lg-3">
                <article class="stat-card recovered" tabindex="0" role="article" 
                         aria-label="Total recovered COVID-19 cases in New York State">
                  <div class="stat-icon" aria-hidden="true">✅</div>
                  <h3 class="stat-label">Recovered</h3>
                  <div class="stat-value" aria-live="polite">{{ formatNumber(data?.recovered) }}</div>
                </article>
              </div>

              <!-- Deaths -->
              <div class="col-6 col-sm-4 col-lg-3">
                <article class="stat-card deaths" tabindex="0" role="article" 
                         aria-label="Total COVID-19 deaths in New York State">
                  <div class="stat-icon" aria-hidden="true">💀</div>
                  <h3 class="stat-label">Deaths</h3>
                  <div class="stat-value" aria-live="polite">{{ formatNumber(data?.deaths) }}</div>
                </article>
              </div>

              <!-- Population -->
              <div class="col-6 col-sm-4 col-lg-3">
                <article class="stat-card population" tabindex="0" role="article" 
                         aria-label="New York State population">
                  <div class="stat-icon" aria-hidden="true">👥</div>
                  <h3 class="stat-label">Population</h3>
                  <div class="stat-value" aria-live="polite">{{ formatNumber(data?.population) }}</div>
                </article>
              </div>

              <!-- Cases Per Million -->
              <div class="col-6 col-sm-4 col-lg-3">
                <article class="stat-card rate" tabindex="0" role="article" 
                         aria-label="Cases per million in New York State">
                  <div class="stat-icon" aria-hidden="true">📊</div>
                  <h3 class="stat-label">Cases Per Million</h3>
                  <div class="stat-value" aria-live="polite">{{ formatNumber(data?.casesPerOneMillion) }}</div>
                </article>
              </div>

              <!-- Deaths Per Million -->
              <div class="col-6 col-sm-4 col-lg-3">
                <article class="stat-card rate" tabindex="0" role="article" 
                         aria-label="Deaths per million in New York State">
                  <div class="stat-icon" aria-hidden="true">📉</div>
                  <h3 class="stat-label">Deaths Per Million</h3>
                  <div class="stat-value" aria-live="polite">{{ formatNumber(data?.deathsPerOneMillion) }}</div>
                </article>
              </div>
            </div>
          </div>

          <!-- Last Updated Info -->
          <footer class="data-footer text-center">
            <p class="update-time">
              <span class="update-icon" aria-hidden="true">🕒</span>
              <span>Last updated: <time :datetime="new Date(data?.updated).toISOString()">{{ formatDate(data?.updated) }}</time></span>
            </p>
            <a
              href="https://disease.sh/v3/covid-19/states/New%20York"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline-info btn-sm api-link"
              aria-label="View raw API data (opens in new tab)"
            >
              <span aria-hidden="true">📊</span> View Raw API Data
            </a>
          </footer>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer" role="contentinfo">
      <div class="container">
        <!-- Developer Info -->
        <section class="footer-section" aria-labelledby="developer-heading">
          <h2 id="developer-heading" class="visually-hidden">Developer Information</h2>
          <p class="developer-info">
            <span class="heart-icons" aria-label="Made with love">💜💜💜</span>
            <br />
            <span>Developed by </span>
            <a
              href="https://github.com/casjay"
              target="_blank"
              rel="noopener noreferrer"
              class="developer-link"
              aria-label="Jason M. Hempstead GitHub profile (opens in new tab)"
            >
              Jason M. Hempstead (Casjay)
            </a>
          </p>
        </section>

        <!-- Open Source Info -->
        <section class="footer-section" aria-labelledby="opensource-heading">
          <h2 id="opensource-heading" class="visually-hidden">Open Source Information</h2>
          <p class="opensource-info">
            <span>Open source project</span>
            <br />
            <a
              href="https://github.com/now-sh/covid-nys-frontend"
              target="_blank"
              rel="noopener noreferrer"
              class="source-link"
              aria-label="View source code on GitHub (opens in new tab)"
            >
              View Source Code
              <span aria-hidden="true">↗</span>
            </a>
          </p>
        </section>

        <!-- Data Sources -->
        <section class="footer-section data-sources" aria-labelledby="data-sources-heading">
          <h2 id="data-sources-heading" class="section-title">Data Sources</h2>
          <div class="sources-list">
            <a
              href="https://api.casjay.coffee/"
              target="_blank"
              rel="noopener noreferrer"
              class="source-link"
              aria-label="Casjay API (opens in new tab)"
            >
              Casjay API
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://disease.sh/"
              target="_blank"
              rel="noopener noreferrer"
              class="source-link"
              aria-label="disease.sh API documentation (opens in new tab)"
            >
              disease.sh API
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <!-- Copyright -->
        <div class="footer-bottom">
          <p class="copyright">
            <small>
              © {{ currentYear }} New York State COVID-19 Dashboard. 
              Data accuracy subject to reporting limitations.
            </small>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const url = 'https://disease.sh/v3/covid-19/states/New%20York'
const loading = ref(false)
const data = ref(null)
const error = ref('')
const currentYear = computed(() => new Date().getFullYear())

const formatNumber = (num) => {
  if (!num) return 'N/A'
  return new Intl.NumberFormat().format(num)
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchData = async () => {
  console.log('Fetching NYS data...')
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const json = await response.json()
    data.value = json
  } catch (err) {
    error.value = err.message
    console.error('Error fetching NYS data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
/* App Container */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--body-bg);
  color: var(--text-primary);
}

/* Skip Link for Accessibility */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-color);
  color: var(--text-primary);
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
  font-size: 0.875rem;
  font-weight: 600;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
}

/* Header */
.app-header {
  background-color: var(--navbar-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--box-shadow);
}

/* Brand */
.navbar-brand {
  color: var(--primary-color) !important;
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.navbar-brand:hover {
  color: var(--secondary-color) !important;
  transform: scale(1.05);
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-text {
  display: none;
}

/* Mobile: Show brand text on larger screens */
@media (min-width: 576px) {
  .brand-text {
    display: inline;
  }
  
  .navbar-brand {
    font-size: 1.5rem;
  }
}

/* Navigation */
.navbar-toggler {
  border: 1px solid var(--border-color);
  padding: 0.5rem;
  background: transparent;
  border-radius: 0.375rem;
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.2rem rgba(189, 147, 249, 0.25);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28248, 248, 242, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* Nav Links */
.nav-link {
  color: var(--text-primary) !important;
  font-weight: 500;
  padding: 0.75rem 1rem !important;
  border-radius: 0.375rem;
  margin: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  text-decoration: none;
  font-size: 0.875rem;
}

.nav-link:hover {
  color: var(--primary-color) !important;
  background-color: rgba(189, 147, 249, 0.1);
  transform: translateY(-1px);
}

.nav-link:focus {
  box-shadow: 0 0 0 0.2rem rgba(189, 147, 249, 0.25);
}

/* Nav Icons */
.nav-icon {
  font-size: 1rem;
  display: none;
}

.nav-text {
  font-size: 0.875rem;
}

/* Show icons on mobile */
@media (max-width: 991.98px) {
  .nav-icon {
    display: inline;
  }
}

/* External Links */
.external-link {
  position: relative;
}

.external-icon {
  font-size: 0.75rem;
  margin-left: 0.25rem;
  opacity: 0.7;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 2rem 0;
}

/* Mobile-first padding */
@media (max-width: 575.98px) {
  .main-content {
    padding: 1rem 0;
  }
}

/* Loading State */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  text-align: center;
}

.spinner-container {
  max-width: 300px;
  padding: 2rem;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.loading-text {
  font-size: 1.25rem;
  color: var(--success-color);
  margin-bottom: 0.5rem;
}

.loading-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
}

/* Error State */
.error-container {
  padding: 2rem 1rem;
  text-align: center;
}

/* Page Header */
.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: var(--warning-color);
  margin-bottom: 1rem;
  font-weight: 700;
}

/* Stats Grid */
.stats-grid {
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
}

/* Mobile: Smaller cards */
@media (max-width: 575.98px) {
  .stat-card {
    padding: 0.75rem 0.5rem;
    min-height: 100px;
  }
}

/* Tablet and up: Larger cards */
@media (min-width: 768px) {
  .stat-card {
    padding: 1.5rem 1rem;
    min-height: 140px;
  }
}

.stat-card:hover,
.stat-card:focus {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow-hover);
  outline: none;
}

.stat-card:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Stat Card Icons */
.stat-icon {
  font-size: clamp(1.25rem, 3vw, 2rem);
  margin-bottom: 0.5rem;
  display: block;
}

/* Stat Card Labels */
.stat-label {
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Stat Card Values */
.stat-value {
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

/* Color-coded stat cards */
.stat-card.population {
  border-left: 4px solid var(--info-color);
}

.stat-card.cases {
  border-left: 4px solid var(--warning-color);
}

.stat-card.active {
  border-left: 4px solid var(--orange);
}

.stat-card.deaths {
  border-left: 4px solid var(--danger-color);
}

.stat-card.tests {
  border-left: 4px solid var(--primary-color);
}

.stat-card.today-cases {
  border-left: 4px solid var(--yellow);
}

.stat-card.rate {
  border-left: 4px solid var(--info-color);
}

/* Data Footer */
.data-footer {
  padding: 2rem 1rem;
  border-top: 1px solid var(--border-color);
  margin-top: 3rem;
}

.update-time {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.update-icon {
  margin-right: 0.5rem;
}

.api-link {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Footer */
.app-footer {
  background-color: var(--navbar-bg);
  border-top: 1px solid var(--border-color);
  margin-top: auto;
  padding: 2rem 0 1rem;
}

.footer-section {
  margin-bottom: 1.5rem;
  text-align: center;
}

.footer-section:last-child {
  margin-bottom: 0;
}

/* Footer headings (visually hidden) */
.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

/* Footer content */
.developer-info,
.opensource-info {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.6;
}

.heart-icons {
  font-size: 1.2rem;
  display: inline-block;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Footer links */
.developer-link,
.source-link {
  color: var(--link-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.developer-link:hover,
.source-link:hover {
  color: var(--link-hover);
  text-decoration: underline;
}

/* Data Sources Section */
.data-sources {
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.sources-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

/* Desktop: horizontal layout */
@media (min-width: 576px) {
  .sources-list {
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
  }
}

/* Footer bottom */
.footer-bottom {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.copyright {
  color: var(--text-muted);
  margin: 0;
  font-size: 0.75rem;
}

/* High Contrast Support */
@media (prefers-contrast: high) {
  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .stat-card {
    border-width: 2px;
  }
  
  .stat-card:focus {
    outline-width: 3px;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .heart-icons {
    animation: none;
  }
  
  .nav-link,
  .navbar-brand,
  .skip-link,
  .stat-card {
    transition: none;
  }
  
  .stat-card:hover {
    transform: none;
  }
}
</style>