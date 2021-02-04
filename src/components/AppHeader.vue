<template>
  <header>
    <div id="leftHeader">
      <div id="logo">
        <router-link to="/">
          <img
            src="../assets/images/site/bookstore-logo.png"
            id="logoImage"
            alt="Forever Bookstore Logo"
          />
        </router-link>
      </div>
      <div id="logoText">
        <router-link to="/">
          <img
            src="../assets/images/site/logo-text.png"
            id="textImage"
            alt="Forever Bookstore text"
          />
        </router-link>
      </div>
    </div>
    <div id="midHeader">
      <header-search-bar></header-search-bar>
    </div>
    <div id="rightHeader">
      <div id="loginAndCategory">
        <header-category-dropdown></header-category-dropdown>
      </div>
      <div id="cartButton">
        <router-link :to="{ name: 'cart' }"
          ><img src="../assets/images/site/ww.png" id="cart" alt="Cart Icon" />
          <div id="cartCount" v-if="$store.state.cart.numberOfItems < 10">
            {{ $store.state.cart.numberOfItems }}
          </div>
          <div id="cartCountModified" v-else>
            {{ $store.state.cart.numberOfItems }}
          </div>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import HeaderSearchBar from "@/components/HeaderSearchBar";
import HeaderCategoryDropdown from "@/components/HeaderCategoryDropdown";
export default {
  name: "AppHeader",
  components: { HeaderSearchBar, HeaderCategoryDropdown }
};
</script>

<style scoped>
header {
  background: black;
  color: white;
  font-family: Calibri, serif;
  height: 105px;
  display: flex;
  min-width: 1000px;
  justify-content: space-between;
}

#leftHeader {
  width: 350px;
  display: flex;
  padding: 5px;
  margin-top: 2px;
  margin-left: 20px;
}

#logoImage {
  width: 70px;
  height: 95px;
}

#textImage {
  height: 85px;
  width: 140px;
  padding-top: 1px;
  padding-left: 2px;
}

#midHeader {
  width: 650px;
  padding-top: 35px;
  padding-left: 10px;
}

#rightHeader {
  width: 400px;
  display: flex;
  justify-content: space-around;
}

#loginAndCategory {
  display: flex;
  align-items: center;
}

#cartButton {
  padding-right: 10px;
  padding-top: 30px;
  position: relative;
}

#cart {
  margin: 3px 10px 10px;
}

#cartCount {
  position: absolute;
  color: #ffc000;
  font-size: 27px;
  font-weight: bold;
  padding-left: 34px;
  top: -10px;
  padding-top: 34px;
}

#cartCountModified {
  position: absolute;
  color: #ffc000;
  font-size: 27px;
  font-weight: bold;
  padding-left: 27.5px;
  top: -12px;
  padding-top: 34px;
}
</style>
