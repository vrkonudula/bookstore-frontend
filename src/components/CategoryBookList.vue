<template>
  <div class="categoryBooks">
    <div class="categoryBooksItems">
      <div
        v-for="book in $store.state.selectedCategoryBooks"
        :key="book.bookId"
      >
        <category-book-list-item :book="book"></category-book-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryBookListItem from "./CategoryBookListItem";

export default {
  name: "CategoryBookList",
  components: {
    CategoryBookListItem
  }
};
</script>

<style scoped>
.categoryBooks {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  min-width: 700px;
  overflow-y: scroll;
}
.categoryBooksItems {
  max-height: 500px;
  max-width: 1450px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.categoryBooks::-webkit-scrollbar-thumb {
  background: linear-gradient(to top right, rgb(120, 120, 120), black);
  border: 0 solid transparent;
  border-radius: 50px;
}
</style>
