<template>
  <div class="categoryDropdown">
    <button id="category">Category</button>
    <ul class="genres">
      <li v-for="category in $store.state.categories" :key="category.categoryId">
        <router-link
          :to="{ name: 'category', params: { name: category.name } }"
        >
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "HeaderCategoryDropdown"
};
</script>

<style scoped>
#category {
  border: 1px solid black;
  background-color: black;
  text-align: left;
  cursor: pointer;
  font-size: 30px;
}

.categoryDropdown {
  position: relative;
  display: inline-block;
}

.genres {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 150px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.genres a {
  color: black;
  padding: 9px;
  text-decoration: none;
  font-size: 28px;
  border-bottom: 1px solid #111111;
  display: block;
}

.genres a:hover {
  background-color: black;
  color: #ffc000;
}

.categoryDropdown:hover .genres {
  display: block;
  animation: growDown 300ms ease-in-out forwards;
}

.categoryDropdown:hover #category {
  border: 1px solid #ffc000;
  color: rgb(120, 120, 120);
}
</style>
