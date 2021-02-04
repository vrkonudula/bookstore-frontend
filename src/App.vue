<template>
  <div id="app">
    <app-header></app-header>
    <router-view id="router-view" :key="$route.fullPath"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { CART_STORAGE_KEY, ORDER_DETAILS_STORAGE_KEY } from "@/store";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
  created() {
    const cartString = localStorage.getItem(CART_STORAGE_KEY);
    if (cartString) {
      const shoppingCart = JSON.parse(cartString);
      this.$store.commit("SET_CART", shoppingCart);
    }
    const orderDetails = sessionStorage.getItem(ORDER_DETAILS_STORAGE_KEY);
    if (orderDetails) {
      this.$store.commit("SET_ORDER_DETAILS", JSON.parse(orderDetails));
      console.log(orderDetails);
    }
    this.$store.dispatch("fetchCategories");
    this.$store.dispatch("fetchBestSellerBooks");
    this.$store.dispatch("fetchDealsOfTheDay");
    this.$store.dispatch("fetchAllBooks");
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Merienda&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,500;1,700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Crimson+Text:ital@1&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fondamento&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Acme&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lora:wght@500&display=swap");
#app {
  font: 1em comic sans ms, cursive, sans-serif;
  color: black;
  font-size: 2vw;
  display: flex;
  height: 100%;
  flex-direction: column;
}

a,
a:visited,
input[type="submit"] {
  color: white;
}

a:hover,
a:active,
input[type="submit"]:hover,
ul.buttons a:hover {
  color: rgb(120, 120, 120);
}
</style>
