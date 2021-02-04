<template>
  <div class="cartTable">
    <table>
      <tr
        v-for="(item, index) in this.$store.state.orderDetails.lineItems"
        :key="item.productId"
      >
        <td class="titleText">
          {{ $store.state.orderDetails.books[index].title }}
        </td>
        <td class="quantityText">
          {{ item.quantity }}
        </td>
        <td class="priceText">
          {{
            ($store.state.orderDetails.books[index].price * item.quantity)
              | asDollarsAndCents
          }}
        </td>
      </tr>
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
  display: flex;
  padding-top: 10px;
  justify-content: space-evenly;
  align-content: center;
  width: 100%;
  height: 490px;
  overflow-y: scroll;
}
table {
  border-collapse: collapse;
  border: 1px solid black;
}

td {
  font-size: 20px;
  font-family: Lora, serif;
  border-bottom: 1px solid black;
}
tr {
  background-color: white;
}
.titleText {
  padding-left: 30px;
  width: 420px;
  padding-top: 30px;
  padding-bottom: 30px;
}
.quantityText {
  margin-left: 50px;
  width: 50px;
}
.priceText {
  width: 100px;
  text-align: right;
  padding-right: 25px;
}
</style>
