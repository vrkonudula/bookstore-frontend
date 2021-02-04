<template>
  <div>
    <div class="emptyCart" v-if="cart.empty">
      <ul class="checkoutNav">
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
        <li><br /></li>
        <li><span>Please add items to cart.</span></li>
      </ul>
    </div>
    <div id="checkout" v-else>
      <section class="categoryView">
        <p
          style="text-align: center;font-family: Lora, serif;font-weight: bold;font-size: 25px"
        >
          <u>Checkout</u>
        </p>
        <form @submit.prevent="submitOrder">
          <div class="formElement">
            <div class="input">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                v-model.lazy="$v.name.$model"
              />
            </div>
            <div class="error" v-show="$v.name.$error">
              <span v-if="!$v.name.required">Name is required</span>
              <span v-else-if="!$v.name.minLength">
                Name must have at least
                {{ $v.name.$params.minLength.min }} letters.
              </span>
              <span class="error" v-else-if="!$v.name.maxLength">
                Name can have at most
                {{ $v.name.$params.maxLength.max }} letters.
              </span>
              <span v-else>
                An unexpected error occurred.
              </span>
            </div>
          </div>
          <div class="formElement">
            <div class="input">
              <label for="address">Address</label>
              <input
                class="textField"
                type="text"
                id="address"
                name="address"
                v-model.lazy="$v.address.$model"
              />
            </div>
            <div class="error" v-show="$v.address.$error">
              <span v-if="!$v.address.required">Address is required</span>
              <span v-else-if="!$v.address.minLength">
                Address must have at least
                {{ $v.address.$params.minLength.min }} letters.
              </span>
              <span v-else-if="!$v.address.maxLength">
                Address can have at most
                {{ $v.address.$params.maxLength.max }} letters.
              </span>
              <span v-else>
                An unexpected error occurred.
              </span>
            </div>
          </div>

          <div class="formElement">
            <div class="input">
              <label for="phone">Phone</label>
              <input
                class="textField"
                type="text"
                id="phone"
                name="phone"
                v-model.lazy="$v.phone.$model"
              />
            </div>
            <div class="error" v-show="$v.phone.$error">
              <span v-if="!$v.phone.required">Phone is required.</span>
              <span v-else-if="!$v.phone.phone"
                >Please enter a valid phone number.</span
              >
              <span v-else>
                An unexpected error occurred.
              </span>
            </div>
          </div>

          <div class="formElement">
            <div class="input">
              <label for="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                v-model.lazy="$v.email.$model"
              />
            </div>
            <div class="error" v-show="$v.email.$error">
              <span v-if="!$v.email.required">Email is required.</span>
              <span v-else-if="!$v.email.email">
                Please enter a valid email ID.
              </span>
              <span v-else>
                An unexpected error occurred.
              </span>
            </div>
          </div>

          <div class="formElement">
            <div class="input">
              <label for="ccNumber">Credit card</label>
              <input
                type="text"
                id="ccNumber"
                name="ccNumber"
                v-model.lazy="$v.ccNumber.$model"
              />
            </div>
            <div class="error" v-show="$v.ccNumber.$error">
              <span v-if="!$v.ccNumber.required"
                >Credit card number is required.</span
              >
              <span v-else-if="!$v.ccNumber.creditCard">
                Please enter a valid credit card number.
              </span>
              <span v-else>
                An unexpected error occurred.
              </span>
            </div>
          </div>

          <div class="formElement">
            <div class="input">
              <label>Exp Date</label>
              <div class="select">
                <select v-model="ccExpiryMonth">
                  <option
                    v-for="(month, index) in months"
                    :key="index"
                    :value="index + 1"
                    >{{ month }}</option
                  >
                </select>
                <select v-model="ccExpiryYear">
                  <option
                    v-for="index in 16"
                    :key="index"
                    :value="yearFrom(index - 1)"
                  >
                    {{ yearFrom(index - 1) }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="submitButton">
            <input
              type="submit"
              name="submit"
              :disabled="checkoutStatus === 'PENDING'"
              value="Complete Purchase"
            />
          </div>
        </form>
        <div class="confirmation">
          <div class="checkoutInfo">
            <span
              >Your credit card will be charged
              <strong>{{
                (cart.subtotal + cart.surcharge) | asDollarsAndCents
              }}</strong
              >.</span
            >
            <br />
            <span
              >Cart Total :
              <strong> {{ cart.subtotal | asDollarsAndCents }}</strong></span
            >
            <br />
            <span
              >Shipping :<strong>
                {{ cart.surcharge | asDollarsAndCents }}</strong
              ></span
            >
          </div>
          <section v-show="checkoutStatus !== ''" class="checkoutInfo">
            <div v-if="checkoutStatus === 'ERROR'">
              <strong>Error</strong> : Please fix the problems above and try
              again.
            </div>

            <div v-else-if="checkoutStatus === 'PENDING'">
              Processing...
            </div>

            <div v-else-if="checkoutStatus === 'OK'">
              Order placed...
            </div>

            <div v-else>
              An unexpected error occurred, please try again.
            </div>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

import isCreditCard from "validator/lib/isCreditCard";
import isMobilePhone from "validator/lib/isMobilePhone";
import { SELECTED_CATEGORY } from "@/store";

const phone = value => isMobilePhone(value, "en-US");
const creditCard = value => isCreditCard(value);

export default {
  created() {
    const categoryName = localStorage.getItem(SELECTED_CATEGORY);
    if (categoryName) {
      this.$store.dispatch("selectCategory", categoryName);
    }
  },
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      email: "",
      ccNumber: "",
      ccExpiryMonth: new Date().getMonth() + 1,
      ccExpiryYear: new Date().getFullYear(),
      checkoutStatus: ""
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(45)
    },
    address: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(45)
    },
    phone: {
      required,
      phone
    },
    email: {
      required,
      email
    },
    ccNumber: {
      required,
      creditCard
    }
  },

  computed: {
    cart() {
      return this.$store.state.cart;
    },
    months() {
      return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
    }
  },

  methods: {
    submitOrder() {
      console.log("Submit order");
      this.$v.$touch(); // Ensures validators always run
      if (this.$v.$invalid) {
        this.checkoutStatus = "ERROR";
      } else {
        this.checkoutStatus = "PENDING";
        this.$store
          .dispatch("placeOrder", {
            name: this.name,
            address: this.address,
            phone: this.phone,
            email: this.email,
            ccNumber: this.ccNumber,
            ccExpiryMonth: this.ccExpiryMonth,
            ccExpiryYear: this.ccExpiryYear
          })
          .then(() => {
            this.checkoutStatus = "OK";
            this.$router.push({ name: "confirmation" });
          })
          .catch(reason => {
            this.checkoutStatus = "SERVER_ERROR";
            console.log("Error placing order", reason);
          });
      }
    },

    /* NOTE: For example yearFrom(0) == 2019 */
    yearFrom(index) {
      return new Date().getFullYear() + index;
    }
  }
};
</script>
<style scoped>
/* TODO: Adapt these styles to your page */
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
.continueShopping {
  margin-top: 20px;
  margin-left: 40px;
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
.submitButton input {
  background-color: rgb(200, 200, 200);
  color: black;
  border: 1px black solid;
  font-family: Lora, serif;
  font-size: 20px;
  padding: 10px;
}
.submitButton input:hover {
  color: #ffc000;
  background-color: black;
}
.checkoutInfo {
  font-family: Lora, serif;
  margin-top: 20px;
  font-size: 20px;
  padding-bottom: 20px;
}
.categoryView {
  display: flex;
  flex-direction: column;
  margin: 15px;
  width: 400px;
}

.submitButton {
  width: 400px;
  display: flex;
  justify-content: center;
}

form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.error {
  color: red;
  text-align: left;
  font-size: 14px;
}

#checkout {
  display: flex;
  justify-content: space-evenly;
  min-width: 1000px;
  height: 520px;
  overflow-y: scroll;
}

.input {
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 18px;
}

input {
  border-radius: 3px;
  padding: 5px;
}
select {
  margin-top: 3px;
  border-radius: 3px;
}

.emptyCart {
  display: flex;
  justify-content: center;
  font-family: Lora, serif;
  font-size: 28px;
  margin-bottom: 20px;
  height: 480px;
}
.select {
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  width: 215px;
  justify-content: space-between;
}

.formElement {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  font-family: "Lora", serif;
  text-align: center;
}
</style>
