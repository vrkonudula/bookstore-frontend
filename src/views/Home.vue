<template>
  <section>
    <div id="leftHome">
      <p>Welcome to Forever book store!</p>
      <div id="leftHomeContent">
        <div id="leftHomeTop">
          This is a one - stop shop for all your books. We offer books from a
          variety of genres. For returning customers, we have special discounts.
          Users have the option to pick up books from store or get home
          delivery. Some books are also available for reading online.
        </div>
        <div id="leftHomeCenter">
          Deals of the day
        </div>
        <div id="leftHomeBottom">
          <div
            class="discountBook"
            v-for="book in $store.state.dealsBooks"
            :key="book.bookId"
          >
            <div>
              <router-link to="/">
                <img
                  :src="
                    require('@/assets/images/books/' +
                      bookImageFileName(book.title))
                  "
                  class="discountBookImage"
                  :alt="book.title"
                />
              </router-link>
            </div>
            <div class="discount">-12%</div>
          </div>
        </div>
      </div>
    </div>
    <home-category-list></home-category-list>
  </section>
</template>

<script>
import HomeCategoryList from "@/components/HomeCategoryList";
export default {
  name: "Home",
  components: {
    HomeCategoryList
  },
  methods: {
    bookImageFileName: function(bookName) {
      let name = bookName.toLowerCase();
      name = name.replace(/ /g, "-");
      name = name.replace(/:/g, "");
      name = name.replace(/,/g, "");
      return `${name}.png`;
    }
  }
};
</script>
<style scoped>
section {
  display: flex;
}

#leftHome {
  background: #ffc000;
  flex: 50%;
  min-width: 500px;
  text-align: center;
  padding-top: 8px;
  font-size: 27px;
  font-family: "Lora", serif;
  font-weight: bold;
  max-height: 500px;
}

#leftHomeContent {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 19px;
  font-weight: normal;
  font-family: "Merienda", cursive;
}

#leftHomeTop {
  text-align: justify;
}

#leftHomeCenter {
  padding-top: 10px;
  font-weight: bold;
  font-family: "Lora", serif;
}

#leftHomeBottom {
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-around;
}

.discountBook {
  display: flex;
  width: 160px;
}

.discountBookImage {
  padding: 3px;
  background-color: white;
  border: 6px solid black;
}

.discount {
  padding-left: 5px;
  font-size: 18px;
  font-family: "Comic Sans MS", serif;
}
</style>
