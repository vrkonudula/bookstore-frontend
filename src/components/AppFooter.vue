<template>
  <footer>
    <div id="leftFooter">
      &copy; 2020 Forever Bookstore
    </div>
    <div id="midFooter">
      <router-link to="/">Contacts</router-link> |
      <router-link to="/">Directions</router-link>
    </div>
    <div id="rightFooter">
      <router-link to="/">
        <img
          src="../assets/images/site/insta_logo.png"
          id="instagram"
          alt="instagram"
        />
      </router-link>
      <router-link to="/">
        <img
          src="../assets/images/site/twitter-icon.png"
          id="twitter"
          alt="twitter"
        />
      </router-link>
      <router-link to="/">
        <img
          src="../assets/images/site/facebook-icon.png"
          id="facebook"
          alt="facebook"
        />
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter"
};
</script>

<style scoped>
footer {
  min-width: 1000px;
  background: black;
  color: white;
  font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  font-size: 1vw;
  height: 55px;
  display: flex;
  justify-content: space-between;
}

#leftFooter {
  padding-top: 20px;
  padding-left: 10px;
  font-size: 12px;
  width: 15%;
}

#midFooter {
  width: 70%;
  display: flex;
  padding-top: 12px;
  justify-content: center;
  font-size: 23px;
}

#midFooter a:hover {
  color: rgb(120, 120, 120);
}

#rightFooter {
  width: 15%;
  padding-top: 7px;
  display: flex;
  flex-direction: row-reverse;
}

#facebook {
  width: 28px;
  height: 28px;
  padding-top: 6px;
}

#twitter {
  width: 41px;
  height: 41px;
  padding-left: 4px;
}

#instagram {
  width: 36px;
  height: 36px;
  padding-top: 2px;
  padding-left: 2px;
  padding-right: 6px;
}
</style>
