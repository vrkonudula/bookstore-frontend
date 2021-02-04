<template>
  <div class="bookBlock">
    <div class="bookImage">
      <router-link to="/">
        <img
          :src="bookImageFileName(book.title)"
          :alt="book.title"
          class="bookImage"
        />
      </router-link>
    </div>
    <div class="details">
      <ul class="bookInfo">
        <li class="bookTitle">{{ book.title }}</li>
        <li class="bookAuthor">{{ book.author }}</li>
        <li class="bookPrice">{{ book.price | asDollarsAndCents }}</li>
      </ul>
      <div class="bookButtons">
        <div class="bookButtonLink" v-if="book.isPublic">
          <router-link to="/">Read now</router-link>
        </div>
        <div class="bookButtonBlank" v-else></div>

        <img
          src="../assets/images/site/cart2.png"
          class="addToCart"
          alt="add to cart"
          title="Add to cart"
          @click="addToCart(book)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "categoryBookListItem",
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {
    bookImageFileName: function(bookName) {
      let baseUrl = "https://venkat-bookstore.s3.amazonaws.com/images/books/";
      let name = bookName.toLowerCase();
      name = name.replace(/ /g, "-");
      name = name.replace(/:/g, "");
      name = name.replace(/,/g, "");
      name = baseUrl + name;
      return `${name}.png`;
    },
    addToCart: function(book) {
      this.$store.dispatch("addToCart", book);
    }
  }
};
</script>
<style scoped>
.bookBlock {
  display: flex;
  flex-wrap: wrap;
  margin: 25px;
}

.details {
  margin-left: 10px;
  width: 180px;
  display: flex;
  flex-direction: column;
}

.bookImage {
  height: 200px;
  width: 130px;
}

.bookInfo {
  height: 162px;
}

.bookTitle {
  font-size: 25px;
  font-family: "Patrick Hand", cursive;
}

.bookAuthor {
  margin-top: 5px;
  font-family: "Lora", serif;
  font-size: 17px;
}

.bookPrice {
  margin-top: 12px;
  font-size: 25px;
  font-family: Arial, serif;
}

.bookButtons {
  display: flex;
}

.bookButtonBlank {
  width: 86px;
}

.bookButtonLink {
  background-color: black;
  font-family: "Lora", serif;
  font-size: 15px;
  height: 20px;
  padding: 1px;
  min-width: 80px;
  text-align: center;
  border-radius: 2px;
  margin-top: 16px;
}

.bookButtonLink a:hover {
  color: rgb(120, 120, 120);
}
.addToCart {
  cursor: pointer;
  height: 38px;
  width: 40px;
  margin-left: 52px;
  position: relative;
}
</style>
