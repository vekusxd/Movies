<script setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

const noImagePlaceholder =
  'data:image/svg+xml;base64,' +
  btoa(`
  <svg width="300" height="450" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="450" fill="#e0e0e0"/>
    <g transform="translate(150, 180)">
      <rect x="-40" y="-35" width="80" height="60" rx="5" fill="#bdbdbd"/>
      <circle cx="0" cy="-15" r="8" fill="#9e9e9e"/>
      <path d="M -25 5 L -10 -10 L 5 5 L 20 -15 L 30 0 L 30 15 L -30 15 L -30 0 Z" fill="#9e9e9e"/>
    </g>
    <text x="150" y="280" font-family="Arial, sans-serif" font-size="18" fill="#9e9e9e" text-anchor="middle">
      No Image
    </text>
    <text x="150" y="305" font-family="Arial, sans-serif" font-size="14" fill="#9e9e9e" text-anchor="middle">
      Available
    </text>
  </svg>
`)

const handleImageError = (event) => {
  event.target.src = noImagePlaceholder
}
</script>

<template>
  <div class="movie-card">
    <img
      :src="movie.Poster !== 'N/A' ? movie.Poster : noImagePlaceholder"
      :alt="movie.Title"
      @error="handleImageError"
    />
    <div class="movie-info">
      <h3>{{ movie.Title }}</h3>
      <p>{{ movie.Year }}</p>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.movie-card img {
  width: 100%;
  height: 375px;
  object-fit: cover;
}

.movie-info {
  padding: 1rem;
  background-color: white;
}

.movie-info h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.movie-info p {
  margin: 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}
</style>
