<script setup>
</script>

<template>
  <div class="app">
    <nav class="navbar">
      <div class="nav-content">
        <h1 class="logo">Фильмы</h1>
        <div class="nav-links">
          <router-link to="/search" class="nav-link">Поиск</router-link>
          <router-link to="/about" class="nav-link">О проекте</router-link>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #fff;
}

.navbar {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #e0e0e0;
}

.nav-content {
  max-width: 1600px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #5f6368;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: #f5f5f5;
  color: #2c3e50;
}

.nav-link.router-link-active {
  background: #42b983;
  color: #fff;
}

.main-content {
  min-height: calc(100vh - 80px);
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .logo {
    font-size: 1.5rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .nav-link {
    font-size: 1rem;
  }
}
</style>
