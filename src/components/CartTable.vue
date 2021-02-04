<template>
  <div class="cartTable">
    <table v-if="!cart.empty">
      <template v-for="item in cart.items">
        <tr :key="item.book.bookId" v-if="item.quantity > 0">
          <td>
            <img
              :src="
                require('@/assets/images/books/' +
                  bookImageFileName(item.book.title))
              "
              :alt="item.book.title"
              class="bookImage"
            />
          </td>
          <td class="title">
            <div class="details">
              <div class="titleText">{{ item.book.title }}</div>
            </div>
          </td>
          <td class="price">
            {{ item.book.price | asDollarsAndCents }}
          </td>
          <td class="quantity">
            <input
              class="quantityText"
              type="number"
              min="0"
              max="99"
              v-model.trim.number.lazy="item.quantity"
              @change="updateCart({ book: item.book, quantity: item.quantity })"
            />
            <button
              class="deleteButton"
              @click="updateCart({ book: item.book, quantity: 0 })"
            >
              Delete
            </button>
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "CartTable",
  methods: {
    ...mapActions(["updateCart"]),
    bookImageFileName: function(bookName) {
      let name = bookName.toLowerCase();
      name = name.replace(/ /g, "-");
      name = name.replace(/:/g, "");
      name = name.replace(/,/g, "");
      return `${name}.png`;
    }
  },
  computed: {
    ...mapState(["cart"])
  }
};
</script>

<style scoped>
.cartTable::-webkit-scrollbar-thumb {
  background: linear-gradient(to top right, rgb(120, 120, 120), black);
  border: 0 solid transparent;
  border-radius: 50px;
}
.cartTable {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  min-width: 1000px;
  height: 400px;
  overflow-y: scroll;
}
table {
  border-collapse: collapse;
}

td {
  font-size: 20px;
  font-family: Lora, serif;
  border-bottom: 1px solid black;
}
.price {
  width: 60px;
  text-align: right;
}
.title {
  width: 450px;
}
.titleText {
  padding-left: 30px;
  width: 380px;
  padding-top: 60px;
  padding-bottom: 65px;
}
.details {
  display: flex;
}
.quantity {
  width: 290px;
}
.quantityText {
  margin-left: 120px;
  width: 50px;
}
.bookImage {
  width: 100px;
  height: 130px;
  margin-left: 15px;
}
.deleteButton {
  font-family: serif;
  font-size: 20px;
  background-color: white;
  color: black;
  border: 1px black solid;
  border-radius: 3px;
  margin-left: 10px;
  cursor: pointer;
}
.deleteButton:hover {
  background-color: black;
  color: white;
}
</style>
