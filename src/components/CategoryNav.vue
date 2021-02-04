<template>
  <nav id="categoryNav">
    <ul id="categoryButtons">
      <template v-for="category in $store.state.categories">
        <li
          :key="category.categoryId"
          id="selectedCategoryButton"
          v-if="$store.state.selectedCategoryName === category.name"
        >
          {{ category.name }}
        </li>
        <li v-else :key="category.categoryId" class="categoryButton">
          <router-link
            :to="{ name: 'category', params: { name: category.name } }"
          >
            {{ category.name }}
          </router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "CategoryNav"
};
</script>

<style scoped>
#categoryNav {
  background-color: #ffc000;
  max-height: 500px;
}

#selectedCategoryButton {
  font-family: "Merienda", cursive;
  font-size: 28px;
  margin: 28px;
  margin-top: 33px;
  padding: 10px;
  background-color: black;
  text-align: center;
  width: 220px;
  color: #ffc000;
  border-radius: 55px;
}

li.categoryButton a:hover {
  color: rgb(120, 120, 120);
}

li.categoryButton a {
  font-family: "Merienda", cursive;
  font-size: 28px;
  margin: 28px;
  margin-top: 33px;
  padding: 10px;
  background-color: black;
  text-align: center;
  min-width: 220px;
  color: white;
  display: block;
  border-radius: 55px;
}
</style>
