<template>
  <div class="searchResult">
    <div class="searchResultItems">
      <div v-show="this.$store.state.filteredBooks.length === 0"></div>
      <div v-for="book in $store.state.filteredBooks" :key="book.bookId">
        <category-book-list-item :book="book"></category-book-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryBookListItem from "@/components/CategoryBookListItem";
export default {
  name: "SearchResult",
  components: { CategoryBookListItem }
};
</script>

<style scoped>
.searchResult {
  width: 100%;
  height: 500px;
  display: flex;
  min-width: 700px;
  overflow-y: scroll;
  justify-content: space-evenly;
}
.searchResultItems {
  max-width: 1150px;
  display: flex;
  flex-wrap: wrap;
}
</style>
