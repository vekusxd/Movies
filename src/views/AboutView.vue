<script setup>
</script>

<template>
  <div class="about-container">
    <div class="about-content">
      <h1>О приложении</h1>

      <section>
        <h2>Movies Search</h2>
        <p>
          Это простое приложение для поиска фильмов, использующее
          <a href="https://www.omdbapi.com/" target="_blank" rel="noopener">OMDB API</a>.
        </p>
      </section>

      <section>
        <h2>Возможности</h2>
        <ul>
          <li>Поиск фильмов по названию</li>
          <li>Постраничная навигация по результатам</li>
          <li>Сохранение параметров поиска в URL</li>
        </ul>
      </section>

      <section>
        <h2>Технологии</h2>
        <ul>
          <li>Vue 3 (Composition API)</li>
          <li>Vue Router 4</li>
          <li>Vite</li>
          <li>Element Plus (Pagination)</li>
          <li>OMDB API</li>
        </ul>
      </section>

      <div class="back-link">
        <router-link to="/search" class="btn-back">
          ← Вернуться к поиску
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.about-content {
  max-width: 800px;
  width: 100%;
  background: #fff;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

section {
  margin-bottom: 2rem;
}

p, li {
  color: #5f6368;
  font-size: 1.1rem;
  line-height: 1.6;
}

ul {
  list-style-position: inside;
  padding-left: 1rem;
}

li {
  margin-bottom: 0.5rem;
}

a {
  color: #42b983;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #359268;
  text-decoration: underline;
}

.back-link {
  text-align: center;
  margin-top: 3rem;
}

.btn-back {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-size: 1rem;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.btn-back:hover {
  transform: translateY(-2px);
  background: #359268;
  text-decoration: none;
}

@media (max-width: 768px) {
  .about-content {
    padding: 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  p, li {
    font-size: 1rem;
  }
}
</style>
