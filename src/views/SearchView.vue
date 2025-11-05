<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MovieCard from '@/components/MovieCard.vue'

const router = useRouter()
const route = useRoute()

const API_KEY = import.meta.env.VITE_OMDB_API_KEY

const searchQuery = ref('')
const movies = ref([])
const loading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const totalResults = ref(0)

const searchMovies = async (resetPage = true) => {
  if (!searchQuery.value.trim()) return

  loading.value = true
  error.value = null

  if (resetPage) {
    currentPage.value = 1
  }

  // Update URL with search parameters
  const query = {
    q: searchQuery.value,
    page: currentPage.value.toString()
  }

  // Only push to router if query params are different
  if (route.query.q !== query.q || route.query.page !== query.page) {
    router.push({ path: '/search', query })
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery.value)}&page=${currentPage.value}&apikey=${API_KEY}&type=movie`,
    )
    const data = await response.json()

    if (data.Response === 'True') {
      movies.value = data.Search
      totalResults.value = parseInt(data.totalResults, 10)
    } else {
      error.value = data.Error
      movies.value = []
      totalResults.value = 0
    }
  } catch (err) {
    console.log(err)
    error.value = 'Ошибка при загрузке фильмов'
    movies.value = []
    totalResults.value = 0
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page) => {
  currentPage.value = page
  searchMovies(false)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Initialize from URL parameters on mount
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
    currentPage.value = parseInt(route.query.page, 10) || 1
    searchMovies(false)
  }
})

// Watch route changes (e.g., browser back/forward)
watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.q && newQuery.q !== searchQuery.value) {
      searchQuery.value = newQuery.q
      currentPage.value = parseInt(newQuery.page, 10) || 1
      searchMovies(false)
    }
  }
)
</script>

<template>
  <div class="container">
    <h1>Поиск фильмов</h1>

    <div class="search-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Введите название фильма..."
        @keyup.enter="searchMovies"
      />
      <button @click="searchMovies" :disabled="loading">
        {{ loading ? 'Поиск...' : 'Найти' }}
      </button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="movies.length > 0" class="movies-grid">
      <MovieCard v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
    </div>

    <div v-if="totalResults > 10" class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="10"
        :total="totalResults"
        layout="prev, pager, next, total"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.search-box {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #359268;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  text-align: center;
  color: #e74c3c;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fee;
  border-radius: 8px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
}

@media (max-width: 1200px) {
  .movies-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .movies-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .movies-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .movies-grid {
    grid-template-columns: 1fr;
  }
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding: 1rem 0;
}

.pagination-container :deep(.el-pagination) {
  --el-pagination-font-size: 16px;
  --el-pagination-button-width: 40px;
  --el-pagination-button-height: 40px;
}

.pagination-container :deep(.el-pagination button),
.pagination-container :deep(.el-pager li) {
  min-width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}

.pagination-container :deep(.el-pager li.is-active) {
  background-color: #42b983;
  color: white;
}

.pagination-container :deep(.el-pager li:hover) {
  color: #42b983;
}

.pagination-container :deep(.el-pagination button:hover:not(:disabled)) {
  color: #42b983;
}
</style>
