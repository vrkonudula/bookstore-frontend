const apiUrl = "https://venkat-bookstore.herokuapp.com/api";

export default {
  fetchBooks() {
    const url = apiUrl + "/books";
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .catch(reason => {
        console.log("Error fetching category data: " + reason);
      });
  },
  fetchCategories() {
    const url = apiUrl + "/categories";
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .catch(reason => {
        console.log("Error fetching category data: " + reason);
      });
  },
  fetchSelectedCategoryBooks(category) {
    const url = apiUrl + "/categories/name/" + category + "/books";
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .catch(reason => {
        console.log("Error fetching category data: " + reason);
      });
  },
  fetchRandomBooks(category) {
    let url;
    if (category === "History") {
      url =
        apiUrl + "/categories/name/" + category + "/suggested-books?limit=2";
    } else {
      url = apiUrl + "/books/random";
    }
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .catch(reason => {
        console.log("Error fetching category data: " + reason);
      });
  },
  placeOrder(order) {
    console.log("POSTing to " + `${apiUrl}/orders`);
    return fetch(`${apiUrl}/orders`, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }).then(stream => {
      if (stream.ok) {
        return stream.json();
      }
      throw new Error("Network response was not ok.");
    });
  }
};
