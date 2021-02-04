<template>
  <section>
    <div id="customerInfo">
      <h2>Order details</h2>
      <ul>
        <li>
          <strong>Confirmation #</strong>:
          {{ $store.state.orderDetails.order.confirmationNumber }}
        </li>
        <li><strong>Time</strong>: {{ getDate() }}</li>
        <li>
          <strong>Sub-total</strong>:
          {{
            ($store.state.orderDetails.order.amount -
              $store.state.cart.surcharge)
              | asDollarsAndCents
          }}
        </li>
        <li>
          <strong>Surcharge</strong>:
          {{ $store.state.cart.surcharge | asDollarsAndCents }}
        </li>
        <li>
          <strong>Total</strong>:
          {{ $store.state.orderDetails.order.amount | asDollarsAndCents }}
        </li>
      </ul>
      <hr />
      <h2>Customer details</h2>
      <ul>
        <li>{{ $store.state.orderDetails.customer.customerName }}</li>
        <li>{{ $store.state.orderDetails.customer.address }}</li>
        <li>{{ $store.state.orderDetails.customer.email }}</li>
        <li>703-555-1212</li>
        <li>{{ getCCNumber() }} ({{ getExpiryDate() }})</li>
      </ul>
    </div>
    <confirmation-table></confirmation-table>
  </section>
</template>

<script>
import ConfirmationTable from "@/components/ConfirmationTable";

export default {
  name: "Confirmation",
  components: { ConfirmationTable },
  methods: {
    getDate: function() {
      let createdDate = this.$store.state.orderDetails.order.dateCreated;
      createdDate = new Date(createdDate);
      return createdDate.toLocaleString();
    },
    getExpiryDate: function() {
      let expiryDate = this.$store.state.orderDetails.customer.ccExpDate;
      expiryDate = new Date(expiryDate);
      let year = expiryDate.getFullYear();
      let month = expiryDate.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      return month + "/" + year;
    },
    getCCNumber: function() {
      let ccNumber = this.$store.state.orderDetails.customer.ccNumber.toString();
      return "**** **** **** " + ccNumber.substr(12, 16);
    }
  }
};
</script>

<style scoped>
section {
  display: flex;
  min-height: 500px;
  min-width: 1000px;
}
#customerInfo {
  min-width: 400px;
  font-family: "Lora", serif;
  background: #ffc000;
  font-size: 35px;
  overflow-y: scroll;
}

#customerInfo::-webkit-scrollbar-thumb {
  background: linear-gradient(to top right, rgb(120, 120, 120), black);
  border: 0 solid transparent;
  border-radius: 50px;
}
ul {
  text-align: left;
  margin-left: 5px;
}
ul > li {
  margin: 0.25em;
  font-size: 22px;
}

h2 {
  font-family: "Merienda", cursive;
  text-align: center;
  padding-top: 5px;
}
hr {
  color: black;
  border: 1px solid black;
}
</style>
