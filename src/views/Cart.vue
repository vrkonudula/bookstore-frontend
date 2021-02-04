<template>
  <div>
    <div id="cart">
      <div id="cartStatus">
        <ul class="cartNav">
          <li
            class="continueShopping"
            v-if="$store.state.selectedCategoryName !== ''"
          >
            <router-link
              :to="{
                name: 'category',
                params: { name: $store.state.selectedCategoryName }
              }"
              >Continue shopping</router-link
            >
          </li>
          <li class="continueShopping" v-else>
            <router-link
              :to="{
                name: 'home'
              }"
              >Continue shopping</router-link
            >
          </li>
          <li class="subTotal">
            <span v-show="!cart.empty"
              >Cart subtotal : {{ cart.subtotal | asDollarsAndCents }}</span
            >
          </li>
          <li v-if="!cart.empty">
            <router-link :to="{ name: 'checkout' }"
              >Proceed to checkout</router-link
            >
          </li>
        </ul>
        <ul class="cartNav">
          <li class="cartDetails">
            <span v-if="cart.numberOfItems === 0"
              >Your cart is empty. Please add books to your cart.</span
            >
            <span v-else-if="cart.numberOfItems === 1"
              >Your cart : {{ cart.numberOfItems }} item</span
            >
            <span v-else>Your cart : {{ cart.numberOfItems }} items</span>
          </li>
          <li>
            <button v-if="!cart.empty" @click="clearCart" class="clearButton">
              Clear cart
            </button>
          </li>
        </ul>
      </div>
    </div>
    <cart-table />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CartTable from "@/components/CartTable.vue";
import { SELECTED_CATEGORY } from "@/store";
export default {
  name: "Cart",
  components: {
    CartTable
  },
  created() {
    const categoryName = localStorage.getItem(SELECTED_CATEGORY);
    if (categoryName) {
      this.$store.dispatch("selectCategory", categoryName);
    }
  },
  methods: {
    ...mapActions(["clearCart"])
  },
  computed: {
    ...mapState(["cart"])
  }
};
</script>

<style scoped>
#cart {
  display: flex;
  justify-content: space-evenly;
  min-width: 1000px;
  height: 100px;
}
#cartStatus {
  font-family: Lora, serif;
  font-size: 20px;
  text-align: center;
  min-width: 920px;
  min-height: 100px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
}
.clearButton {
  background-color: white;
  font-size: 20px;
  padding: 5px;
  color: black;
  border: 1px black solid;
  border-radius: 3px;
  cursor: pointer;
}
.clearButton:hover {
  background-color: black;
  color: white;
}
.cartNav {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}
a:link,
a:visited {
  background-color: black;
  font-size: 20px;
  color: rgb(120, 120, 120);
  padding: 14px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
}

a:hover,
a:active {
  background-color: black;
  color: #ffc000;
}
.subTotal {
  padding-top: 10px;
  font-size: 30px;
}
.continueShopping a {
  background-color: white;
  color: black;
  border: 1px black solid;
}
.continueShopping a:hover {
  color: #ffc000;
  background-color: black;
}
.cartDetails {
  font-size: 25px;
}
</style>
