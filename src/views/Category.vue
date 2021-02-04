<template>
  <section>
    <category-nav></category-nav>
    <category-book-list></category-book-list>
  </section>
</template>

<script>
import CategoryNav from "@/components/CategoryNav";
import CategoryBookList from "@/components/CategoryBookList";

export default {
  name: "Category",
  components: {
    CategoryNav,
    CategoryBookList
  },
  created() {
    this.$store.dispatch("selectCategory", this.$route.params.name);
    this.$store.dispatch("fetchSelectedCategoryBooks");
  }
};
</script>

<style scoped>
section {
  display: flex;
}
</style>
