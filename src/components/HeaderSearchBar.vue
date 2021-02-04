<template>
  <form id="searchForm">
    <input id="searchBar" type="text" @keyup="search" />
    <router-link :to="{ name: 'search' }">
      <input
        id="searchIcon"
        type="image"
        :src="require('../assets/images/site/search-icon.png')"
        alt="Search Icon"
        @click="updateBooks"
      />
    </router-link>
  </form>
</template>

<script>
export default {
  name: "HeaderSearchBar",
  data: function() {
    return {
      filteredBooks: []
    };
  },
  methods: {
    search: function(e) {
      const searchString = e.target.value.toLowerCase();
      this.filteredBooks = this.$store.state.allBooks.filter(book => {
        if (!searchString) return null;
        return (
          book.title.toLowerCase().includes(searchString) ||
          book.author.toLowerCase().includes(searchString)
        );
      });
      this.$store.dispatch("fetchFilteredBooks", this.filteredBooks);
    }
  }
};
</script>

<style scoped>
#searchForm {
  display: flex;
  justify-content: center;
}

#searchIcon {
  width: 38px;
  height: 38px;
  margin-left: 5px;
}

#searchBar {
  color: black;
  width: 50%;
  height: 30px;
  border: 3px solid white;
  border-radius: 6px;
  font-size: 20px;
  font-family: "Patrick Hand", cursive;
}
</style>
