<template>
  <div id="rightHome">
    <p id="bestSeller">
      Best sellers of the month
    </p>
    <div>
      <ul class="bestSellerBookList">
        <li v-for="book in $store.state.bestSellerBooks" :key="book.bookId">
          <div class="bestSellerBookListItem">
            <div class="bestSellerBookImage">
              <router-link to="/">
                <img
                  :src="
                    require('@/assets/images/books/' +
                      bookImageFileName(book.title))
                  "
                  class="image"
                  :alt="book.title"
                />
              </router-link>
            </div>
            <div class="bestSellerBookDetails">
              <ul>
                <li class="bestSellerBookTitle">{{ book.title }}</li>
                <li class="bestSellerBookAuthor">{{ book.author }}</li>
                <li class="bestSellerBookGenre" v-if="book.categoryId === 1001">
                  Genre : Fiction
                </li>
                <li
                  class="bestSellerBookGenre"
                  v-else-if="book.categoryId === 1002"
                >
                  Genre : Comedy
                </li>
                <li
                  class="bestSellerBookGenre"
                  v-else-if="book.categoryId === 1003"
                >
                  Genre : History
                </li>
                <li
                  class="bestSellerBookGenre"
                  v-else-if="book.categoryId === 1004"
                >
                  Genre : Romance
                </li>
                <li class="bestSellerBookGenre" v-else>Genre : Literature</li>
              </ul>
            </div>
            <div class="bestSellerBookPrice">
              <div class="price">{{ book.price | asDollarsAndCents }}</div>
              <img
                src="../assets/images/site/cart2.png"
                class="addToCart"
                alt="add to cart"
                title="Add to cart"
                @click="addToCart(book)"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCategoryList",
  methods: {
    bookImageFileName: function(bookName) {
      let name = bookName.toLowerCase();
      name = name.replace(/ /g, "-");
      name = name.replace(/:/g, "");
      name = name.replace(/,/g, "");
      return `${name}.png`;
    },
    addToCart: function(book) {
      this.$store.dispatch("addToCart", book);
    }
  }
};
</script>

<style scoped>
#rightHome {
  padding-top: 8px;
  background-color: white;
  flex: 50%;
  min-width: 500px;
  max-height: 500px;
  overflow-y: scroll;
}

#rightHome::-webkit-scrollbar-thumb {
  background: linear-gradient(to top right, rgb(120, 120, 120), black);
  border: 0 solid transparent;
  border-radius: 50px;
}

#bestSeller {
  font-size: 27px;
  font-family: "Lora", serif;
  font-weight: bold;
  text-align: center;
}

.bestSellerBookList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.bestSellerBookListItem {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
}

.bestSellerBookImage {
  margin-top: 35px;
  padding: 3px;
  border: 13px solid black;
}

.bestSellerBookDetails {
  padding-top: 5px;
  width: 154px;
  height: 116px;
}

.bestSellerBookTitle {
  font-size: 22px;
  font-family: "Patrick Hand", cursive;
}

.bestSellerBookAuthor {
  margin-top: 10px;
  font-family: "Lora", serif;
  font-size: 18px;
}

.bestSellerBookGenre {
  margin-top: 5px;
  font-size: 20px;
  font-family: "Patrick Hand", cursive;
  font-weight: bold;
}

.bestSellerBookPrice {
  margin-top: 20px;
  padding-bottom: 20px;
  display: flex;
}

.price {
  font-size: 22px;
  width: 71px;
  padding-top: 10px;
  font-family: Arial, serif;
}

.addToCart {
  height: 35px;
  width: 40px;
  cursor: pointer;
  margin-left: 45px;
}

.image {
  height: 200px;
  width: 124px;
}
</style>
