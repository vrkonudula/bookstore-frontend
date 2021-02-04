import Vue from "vue";
import Vuex from "vuex";
import ApiService from "@/services/ApiService";
import { ShoppingCart } from "@/models/ShoppingCart";

Vue.use(Vuex);

export const CART_STORAGE_KEY = "cart";
export const SELECTED_CATEGORY = "select";
export const ORDER_DETAILS_STORAGE_KEY = "orderDetails";
export default new Vuex.Store({
  state: {
    categories: [],
    selectedCategoryName: "",
    selectedCategoryBooks: [],
    bestSellerBooks: [],
    dealsBooks: [],
    allBooks: [],
    filteredBooks: [],
    cart: new ShoppingCart(),
    orderDetails: null
  },
  mutations: {
    SET_CATEGORIES: (state, newCategories) => {
      state.categories = newCategories;
    },
    SELECT_CATEGORY: (state, categoryName) => {
      state.selectedCategoryName = categoryName;
    },
    SET_SELECTED_CATEGORY_BOOKS: (state, categoryBooks) => {
      state.selectedCategoryBooks = categoryBooks;
      localStorage.setItem(SELECTED_CATEGORY, state.selectedCategoryName);
    },
    SET_BEST_SELLER_BOOKS: (state, bestSellerBooks) => {
      state.bestSellerBooks = bestSellerBooks;
    },
    SET_DEALS_OF_THE_DAY: (state, dealsBooks) => {
      state.dealsBooks = dealsBooks;
    },
    SET_ALL_BOOKS: (state, allBooks) => {
      state.allBooks = allBooks;
    },
    SET_FILTERED_BOOKS: (state, filteredBooks) => {
      state.filteredBooks = filteredBooks;
    },
    ADD_TO_CART: (state, book) => {
      state.cart.addItem(book, 1);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    },
    UPDATE_CART(state, { book, quantity }) {
      state.cart.update(book, quantity);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    },
    CLEAR_CART(state) {
      state.cart.clear();
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    },
    SET_CART(state, shoppingCart) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(shoppingCart));
      let newCart = new ShoppingCart();
      shoppingCart.items.forEach(item => {
        newCart.addItem(item.book, item.quantity);
      });
      state.cart = newCart;
    },
    CLEAR_ORDER_DETAILS(state) {
      sessionStorage.removeItem(ORDER_DETAILS_STORAGE_KEY);
      state.orderDetails = null;
    },
    SET_ORDER_DETAILS(state, orderDetails) {
      sessionStorage.setItem(
        ORDER_DETAILS_STORAGE_KEY,
        JSON.stringify(orderDetails)
      );
      state.orderDetails = orderDetails;
    }
  },
  actions: {
    fetchCategories: context => {
      ApiService.fetchCategories()
        .then(categories => context.commit("SET_CATEGORIES", categories))
        .catch(reason => console.log("Error: " + reason));
    },
    selectCategory: (context, categoryName) => {
      context.commit("SELECT_CATEGORY", categoryName);
    },
    fetchSelectedCategoryBooks: context => {
      ApiService.fetchSelectedCategoryBooks(context.state.selectedCategoryName)
        .then(categoryBooks =>
          context.commit("SET_SELECTED_CATEGORY_BOOKS", categoryBooks)
        )
        .catch(reason => console.log("Error: " + reason));
    },
    fetchAllBooks: context => {
      ApiService.fetchBooks().then(allBooks => {
        context.commit("SET_ALL_BOOKS", allBooks);
      });
    },
    fetchFilteredBooks: (context, filteredBooks) => {
      context.commit("SET_FILTERED_BOOKS", filteredBooks);
    },
    addToCart: (context, book) => {
      context.commit("ADD_TO_CART", book);
    },
    updateCart: (context, updateDetails) => {
      context.commit("UPDATE_CART", updateDetails);
    },
    clearCart: context => {
      context.commit("CLEAR_CART");
    },
    fetchBestSellerBooks: context => {
      ApiService.fetchRandomBooks("random")
        .then(bestSellerBooks =>
          context.commit("SET_BEST_SELLER_BOOKS", bestSellerBooks)
        )
        .catch(reason => console.log("Error: " + reason));
    },
    fetchDealsOfTheDay: context => {
      ApiService.fetchRandomBooks("History")
        .then(dealsBooks => context.commit("SET_DEALS_OF_THE_DAY", dealsBooks))
        .catch(reason => console.log("Error: " + reason));
    },
    placeOrder({ commit, state }, customerForm) {
      commit("CLEAR_ORDER_DETAILS");
      return ApiService.placeOrder({
        cart: state.cart,
        customerForm: customerForm
      }).then(orderDetails => {
        commit("CLEAR_CART");
        commit("SET_ORDER_DETAILS", orderDetails);
      });
    }
  }
});
