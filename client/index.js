fetch("../server/data.json")
        .then((response) => response.json())
        .then((data) => {
          let i = 0;
          
          for (const item in data) {
                var e_0 = document.createElement("div");
                e_0.setAttribute("class", "col-md-4");
                var e_1 = document.createElement("div");
                e_1.setAttribute("class", "product-item");
                var e_2 = document.createElement("div");
                e_2.setAttribute("class", "product-thumb");
                var e_3 = document.createElement("img");
                e_3.setAttribute("class", "img-responsive");
                e_3.setAttribute("src", data[i].img);
                e_3.setAttribute("alt", "product-img");
                e_2.appendChild(e_3);
                var e_4 = document.createElement("div");
                e_4.setAttribute("class", "preview-meta");
                var e_5 = document.createElement("ul");
                var e_6 = document.createElement("li");
                var e_7 = document.createElement("span");
                e_7.setAttribute("data-toggle", "modal");
                e_7.setAttribute("data-target", "#product-modal");
                var e_8 = document.createElement("i");
                e_8.setAttribute("class", "tf-ion-ios-search-strong");
                e_7.appendChild(e_8);
                e_6.appendChild(e_7);
                e_5.appendChild(e_6);
                var e_9 = document.createElement("li");
                var e_10 = document.createElement("a");
                e_10.setAttribute("href", "#");
                var e_11 = document.createElement("i");
                e_11.setAttribute("class", "tf-ion-ios-heart");
                e_10.appendChild(e_11);
                e_9.appendChild(e_10);
                e_5.appendChild(e_9);
                var e_12 = document.createElement("li");
                var e_13 = document.createElement("a");
                e_13.setAttribute("href", "#!");
                var e_14 = document.createElement("i");
                e_14.setAttribute("class", "tf-ion-android-cart");
                e_13.appendChild(e_14);
                e_12.appendChild(e_13);
                e_5.appendChild(e_12);
                e_4.appendChild(e_5);
                e_2.appendChild(e_4);
                e_1.appendChild(e_2);
                var e_15 = document.createElement("div");
                e_15.setAttribute("class", "product-content");
                var e_16 = document.createElement("h4");
                var e_17 = document.createElement("a");
                e_17.setAttribute("href", "product-single.html");
                e_17.appendChild(document.createTextNode(data[i].name));
                e_16.appendChild(e_17);
                e_15.appendChild(e_16);
                var e_18 = document.createElement("p");
                e_18.setAttribute("class", "price");
                e_18.appendChild(document.createTextNode(data[i].price));
                e_15.appendChild(e_18);
                e_1.appendChild(e_15);
                e_0.appendChild(e_1);
                document.getElementById("products").appendChild(e_0);
                i++;
            }
        });

      function submitChannel() {
        const searchTerm = document.querySelector(".channel-input").value;
        const size = document.querySelector(".size").value;
        const type = document.querySelector(".type").value;
        fetch("http://localhost:3000/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm, size, type }),
        });
        fetch("./server/user.json")
          .then((response) => {
            return response.json();
          })
          .then((jsondata) => console.log(jsondata));
      }

      function newEl(type, attrs = {}) {
        const el = document.createElement(type);
        for (let attr in attrs) {
          const value = attrs[attr];
          if (attr == "innerText") el.innerText = value;
          else el.setAttribute(attr, value);
        }
        return el;
      }
    
