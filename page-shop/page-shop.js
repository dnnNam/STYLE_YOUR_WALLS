const linkAllProduct = "https://6707fd7a8e86a8d9e42db65d.mockapi.io/allProduct";
const productList = [
  { link: "./picture/allProduct/hinh1.png", price: "$25.00" },
  { link: "./picture/allProduct/hinh2.png", price: "$35.00" },
  { link: "./picture/allProduct/hinh3.png", price: "$30.00" },
  { link: "./picture/allProduct/hinh4.png", price: "$25.00" },
  { link: "./picture/allProduct/hinh5.png", price: "$25.00" },
  { link: "./picture/allProduct/hinh6.png", price: "$30.00" },
  { link: "./picture/allProduct/hinh7.png", price: "$25.00" },
  { link: "./picture/allProduct/hinh8.png", price: "$35.00" },
  { link: "./picture/allProduct/hinh9.png", price: "$25.00" },
];

class FastHttp {
  send(method, url, body) {
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error(response.statusText);
      }
    });
  }

  get(url) {
    return this.send("GET", url, null);
  }

  delete(url) {
    return this.send("DELETE", url, null);
  }

  post(url, body) {
    return this.send("POST", url, body);
  }

  put(url, body) {
    return this.send("PUT", url, body);
  }
}

function Store() {}

Store.prototype.add = (productList) => {
  // đẩy dữ liệu lên server
  let http = new FastHttp();
  productList.forEach((product) => {
    http.post(linkAllProduct, product);
  });
};

Store.prototype.get = async () => {
  let http = new FastHttp();
  const mockData = await http.get(linkAllProduct);
  return mockData || [];
};

// ông quản lý giao diện

function RenderUI() {}

RenderUI.prototype.add = ({ link, price }) => {
  let newProduct = document.createElement("div");
  newProduct.innerHTML = `
    <div class="card__block">
         <div class="card__img">
             <img src="${link}" class="img__element" alt="">
            <div class="quickView__element">Quick View</div>
        </div>
                    
        <div class="decsProduct">
             <p class="decsProduct__modifier">
                     I'M A <br>
                     PRODUCT
             </p>
            <div class="line__element">
                <hr class="line__modifier">
            </div>
                <span class="price__modifier">${price}</span>
                 <button class="btn__add">Add To Cart</button>
        </div>
               
     </div>   
    `;
  document.querySelector(".product__element").appendChild(newProduct);
};

RenderUI.prototype.renderAll = async () => {
  document.querySelector(".decsPage__modifier").textContent = "All Product";
  document.querySelector(".amount__modifier").textContent = "9 Product";
  document.querySelector(".pageTitle__modifier").textContent = "All Product";
  let ui = new RenderUI();
  let store = new Store();
  const allProductList = await store.get();
  for (const item of allProductList) {
    ui.add(item);
  }
};

RenderUI.prototype.renderFreedom = async () => {
  document.querySelector(".decsPage__modifier").textContent =
    "Freedom Collection";
  document.querySelector(".pageTitle__modifier").textContent =
    "Freedom Collection";
  document.querySelector(".amount__modifier").textContent = "3 Product";
  let store = new Store();
  const products = await store.get();
  console.log(products);
  //lọc ra những sản phẩm của trang freedom Collection
  const freeDomCollectionList = products.filter((item) => {
    return ["2", "1", "6"].includes(item.id);
  });

  let ui = new RenderUI();
  for (const item of freeDomCollectionList) {
    await ui.add(item);
  }
};

RenderUI.prototype.renderPricky = async () => {
  document.querySelector(".decsPage__modifier").textContent =
    "Prickly Collection";
  document.querySelector(".pageTitle__modifier").textContent =
    "Prickly Collection";
  document.querySelector(".amount__modifier").textContent = "3 Product";
  let store = new Store();
  const products = await store.get();
  console.log(products);
  //lọc ra những sản phẩm của trang freedom Collection
  const prickylyCollectionList = products.filter((item) => {
    return ["5", "8"].includes(item.id);
  });

  let ui = new RenderUI();
  for (const item of prickylyCollectionList) {
    await ui.add(item);
  }
};

RenderUI.prototype.renderTropical = async () => {
  document.querySelector(".decsPage__modifier").textContent =
    "Tropical Collection";
  document.querySelector(".pageTitle__modifier").textContent =
    "Tropical Collection";

  document.querySelector(".amount__modifier").textContent = "3 Product";
  let store = new Store();
  const products = await store.get();
  console.log(products);
  //lọc ra những sản phẩm của trang freedom Collection
  const TropicalCollectionList = products.filter((item) => {
    return ["3", "4", "7"].includes(item.id);
  });

  let ui = new RenderUI();
  for (const item of TropicalCollectionList) {
    await ui.add(item);
  }
};

document
  .querySelector(".navTab__element")
  .addEventListener("click", async (event) => {
    let id = event.target.id;
    document.querySelector(".product__element").innerHTML = "";
    let ui = new RenderUI();
    if (id == "2") {
      await ui.renderFreedom();
    } else if (id == "3") {
      await ui.renderPricky();
    } else if (id == "4") {
      await ui.renderTropical();
    } else {
      await ui.renderAll();
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  let ui = new RenderUI();
  ui.renderAll();
});

// làm thanh thu gọn phần filter
document
  .querySelector(".PriceButton__modifier")
  .addEventListener("click", (event) => {
    const filterTaskBar = document.querySelector(".filter__taskBar");

    if (event.target.textContent == "-") {
      event.target.textContent = `+`;
      if (filterTaskBar) {
        filterTaskBar.classList.remove("show");
      }
    } else {
      if (filterTaskBar) {
        filterTaskBar.classList.add("show");
      }
      event.target.textContent = "-";
    }
  });
// render ra sản phẩm theo giá tiền -----------------------------------------------------------------------------------
RenderUI.prototype.renderAllowPrice = async function (min, max, productList) {
  productList = productList.filter((product) => {
    // ép về số để dễ so sánh
    const productPrice = parseFloat(product.price.replace("$", ""));

    return productPrice >= min && productPrice <= max;
  });

  const amoutProduct = productList.length;

  document.querySelector(".amount__modifier").innerHTML =
    amoutProduct + " products";
  for (const product of productList) {
    await this.add(product);
  }
};

// xử lí filter và render ra những sản phẩm ---------------------------------------------------------------------
const rangeInput = document.querySelectorAll(".range-input input");
const rangeText = document.querySelectorAll(".range-text div");
const progress = document.querySelector(".progress");
// lấy giá trị max của mỗi ô input
const priceMax = parseFloat(rangeInput[0].max);
//cách chỉnh min max không kéo linh tinh
let priceGap = 10;
rangeInput.forEach((input) => {
  // cần hiểu nếu muốn ful cây là 35.00$
  // nhưng có trường hợp min nó ko phải là 25.00$ thì sao
  // mình phải tính nếu min thì progress nó phải thu hẹp nhiêu

  input.addEventListener("input", async (event) => {
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);
    // không cho 2 nút min max kéo lung tung
    if (maxVal - minVal < 10) {
      if (event.target.className == "range-min") {
        // min bằng bằng max trừ đi khoảng cách hợp lệ
        minVal = rangeInput[0].value = maxVal - priceGap;
      } else {
        maxVal = rangeInput[1].value = minVal + priceGap;
      }
    }

    // khoảng cách left
    let positionMin = (minVal / priceMax) * 100;
    // khoảng cách từ phải qua
    let positionMax = 100 - (maxVal / priceMax) * 100;
    // thấy đổi css cách left của css
    progress.style.left = positionMin + "%";
    progress.style.right = positionMax + "%";
    rangeText[0].style.left = positionMin + "%";
    rangeText[1].style.right = positionMax + "%";
    rangeText[0].innerText = minVal + ".00$";
    rangeText[1].innerText = maxVal + ".00$";
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("change", async (event) => {
    let priceRenderMin = parseFloat(rangeText[0].innerText.replace("$", ""));
    let priceRenderMax = parseFloat(rangeText[1].innerText.replace("$", ""));

    let store = new Store();
    let productList = await store.get();

    const freeDomCollectionList = productList.filter((item) => {
      return ["2", "1", "6"].includes(item.id);
    });

    const prickylyCollectionList = productList.filter((item) => {
      return ["5", "8"].includes(item.id);
    });

    const TropicalCollectionList = productList.filter((item) => {
      return ["3", "4", "7"].includes(item.id);
    });

    document.querySelector(".product__element").innerHTML = "";
    const title = document.querySelector(".pageTitle__modifier").textContent;
    let ui = new RenderUI();
    // await ui.renderAllowPrice(priceRenderMin, priceRenderMax, productList);
    if (title == "Freedom Collection") {
      await ui.renderAllowPrice(
        priceRenderMin,
        priceRenderMax,
        freeDomCollectionList
      );
    } else if (title == "Prickly Collection") {
      await ui.renderAllowPrice(
        priceRenderMin,
        priceRenderMax,
        prickylyCollectionList
      );
    } else if (title == "Tropical Collection") {
      await ui.renderAllowPrice(
        priceRenderMin,
        priceRenderMax,
        TropicalCollectionList
      );
    } else {
      await ui.renderAllowPrice(priceRenderMin, priceRenderMax, productList);
    }
  });
});

// sự kiện render ra các sản phẩm theo dropDown
document.querySelector(".select-btn").addEventListener("click", (event) => {
  // bắt sự mở bấm tiêu đề hay mũi tên đều hiện bảng
  // dùng 1 toggle là 1 method giúp chuyển đổi trạng thái
  // nếu có thì xóa còn nếu không có thì thêm vào
  const isActive = document
    .querySelector(".options")
    .classList.toggle("actived");

  if (isActive) {
    // Khi dropdown mở
    document.querySelector(".select-btn").innerHTML = `
        <span class="sBtn-text">Sort by: </span>
        <i class="fa-solid fa-angle-up"></i>
      `;
  } else {
    // Khi dropdown đóng
    document.querySelector(".select-btn").innerHTML = `
        <span class="sBtn-text">Sort by: </span>
         <i class="fa-solid fa-angle-down"></i>
      `;
  }
});

// render ra sản phẩm
// hàm sắp xếp sản phẩm tăng dần
Store.prototype.ascSort = (productList) => {
  return productList.sort((proA, proB) => {
    const priceA = parseFloat(proA.price.replace("$", ""));
    const priceB = parseFloat(proB.price.replace("$", ""));
    return priceA - priceB;
  });
};
// hàm sắp xếp sản phẩm giảm dần
Store.prototype.dscSort = (productList) => {
  return productList.sort((proA, proB) => {
    const priceA = parseFloat(proA.price.replace("$", ""));
    const priceB = parseFloat(proB.price.replace("$", ""));
    return priceB - priceA;
  });
};

// render
document.querySelector(".options").addEventListener("click", async (event) => {
  console.log(event.target.value);

  let ui = new RenderUI();
  let store = new Store();
  const productList = await store.get();
  // console.log(productList);
  const freeDomCollectionList = productList.filter((item) => {
    return ["2", "1", "6"].includes(item.id);
  });

  const prickylyCollectionList = productList.filter((item) => {
    return ["5", "8"].includes(item.id);
  });

  const TropicalCollectionList = productList.filter((item) => {
    return ["3", "4", "7"].includes(item.id);
  });

  document.querySelector(".product__element").innerHTML = "";
  const title = document.querySelector(".pageTitle__modifier").textContent;
  let arrSorted = [];

  if (title == "All Product") {
    if (event.target.id == "re") {
      document.querySelector(".sBtn-text").textContent = `
          Sort by: Recommend
      `;
      ui.renderAll();
    } else if (event.target.id == "lth") {
      document.querySelector(".sBtn-text").textContent = `
          Sort by: Price(low to high)
      `;
      arrSorted = store.ascSort(productList);
    } else if (event.target.id == "htl") {
      document.querySelector(".sBtn-text").textContent = `
          Sort by: Price(high to low)
      `;
      arrSorted = store.dscSort(productList);
    }

    arrSorted.forEach((product) => {
      ui.add(product);
    });
  } else if (title == "Freedom Collection") {
    if (event.target.id == "re") {
      document.querySelector(".sBtn-text").textContent = `
          Sort by: Recommend
      `;
      ui.renderAll();
    } else if (event.target.id == "lth") {
      document.querySelector(".sBtn-text").textContent = `
          Sort by: Price(low to high)
      `;
      arrSorted = store.ascSort(freeDomCollectionList);
    } else if (event.target.id == "htl") {
      document.querySelector(".sBtn-text").textContent = `
          Sort by: Price(high to low)
      `;
      arrSorted = store.dscSort(freeDomCollectionList);
    }

    arrSorted.forEach((product) => {
      ui.add(product);
    });
  } else if (title == "Prickly Collection") {
    if (event.target.id == "re") {
      document.querySelector(".sBtn-text").textContent = `
          Sort by: Recommend
      `;
      ui.renderAll();
    } else if (event.target.id == "lth") {
      document.querySelector(".sBtn-text").textContent = `
          Sort by: Price(low to high)
      `;
      arrSorted = store.ascSort(prickylyCollectionList);
    } else if (event.target.id == "htl") {
      document.querySelector(".sBtn-text").textContent = `
          Sort by: Price(high to low)
      `;
      arrSorted = store.dscSort(prickylyCollectionList);
    }

    arrSorted.forEach((product) => {
      ui.add(product);
    });
  } else {
    if (event.target.id == "re") {
      document.querySelector(".sBtn-text").textContent = `
          Sort by: Recommend
      `;
      ui.renderAll();
    } else if (event.target.id == "lth") {
      document.querySelector(".sBtn-text").textContent = `
          Sort by: Price(low to high)
      `;
      arrSorted = store.ascSort(TropicalCollectionList);
    } else if (event.target.id == "htl") {
      document.querySelector(".sBtn-text").textContent = `
          Sort by: Price(high to low)
      `;
      arrSorted = store.dscSort(TropicalCollectionList);
    }

    arrSorted.forEach((product) => {
      ui.add(product);
    });
  }
});

//sự kiện thu gon droptown color
document
  .querySelector(".ButtonColor__modifier")
  .addEventListener("click", (event) => {
    const filter__taskBar = document.querySelector(".optionColors");
    if (event.target.textContent == "-") {
      event.target.textContent = `+`;
      if (filter__taskBar) {
        filter__taskBar.classList.remove("actived");
      }
    } else {
      if (filter__taskBar) {
        filter__taskBar.classList.add("actived");
      }
      event.target.textContent = "-";
    }
  });
// sự kiên render ra các sản phẩm theo màu
Store.prototype.filterAllowColor = (color, productList) => {
  return (productList = productList.filter((item) => {
    return item.color == color;
  }));
};

document
  .querySelector(".optionColors")
  .addEventListener("click", async (event) => {
    let ui = new RenderUI();
    let store = new Store();
    const productList = await store.get();

    const freeDomCollectionList = productList.filter((item) => {
      return ["2", "1", "6"].includes(item.id);
    });

    const prickylyCollectionList = productList.filter((item) => {
      return ["5", "8"].includes(item.id);
    });

    const TropicalCollectionList = productList.filter((item) => {
      return ["3", "4", "7"].includes(item.id);
    });
    document.querySelector(".product__element").innerHTML = "";
    const title = document.querySelector(".pageTitle__modifier").textContent;
    let arrFiltered = [];
    if (title == "All Product") {
      if (event.target.id == "lightgreen") {
        arrFiltered = store.filterAllowColor("lightgreen", productList);
      } else if (event.target.id == "green") {
        arrFiltered = store.filterAllowColor("green", productList);
      } else if (event.target.id == "lightBlue") {
        arrFiltered = store.filterAllowColor("lightBlue", productList);
      } else if (event.target.id == "pink") {
        arrFiltered = store.filterAllowColor("pink", productList);
      } else if (event.target.id == "red") {
        arrFiltered = store.filterAllowColor("red", productList);
      } else {
        arrFiltered = store.filterAllowColor("white", productList);
      }
      const amoutProduct = arrFiltered.length;

      document.querySelector(".amount__modifier").innerHTML =
        amoutProduct + " products";

      arrFiltered.forEach((product) => {
        ui.add(product);
      });
    } else if (title == "Freedom Collection") {
      if (event.target.id == "lightgreen") {
        arrFiltered = store.filterAllowColor(
          "lightgreen",
          freeDomCollectionList
        );
      } else if (event.target.id == "green") {
        arrFiltered = store.filterAllowColor("green", freeDomCollectionList);
      } else if (event.target.id == "lightBlue") {
        arrFiltered = store.filterAllowColor(
          "lightBlue",
          freeDomCollectionList
        );
      } else if (event.target.id == "pink") {
        arrFiltered = store.filterAllowColor("pink", freeDomCollectionList);
      } else if (event.target.id == "red") {
        arrFiltered = store.filterAllowColor("red", freeDomCollectionList);
      } else {
        arrFiltered = store.filterAllowColor("white", freeDomCollectionList);
      }
      const amoutProduct = arrFiltered.length;

      document.querySelector(".amount__modifier").innerHTML =
        amoutProduct + " products";
      arrFiltered.forEach((product) => {
        ui.add(product);
      });
    } else if (title == "Prickly Collection") {
      if (event.target.id == "lightgreen") {
        arrFiltered = store.filterAllowColor(
          "lightgreen",
          prickylyCollectionList
        );
      } else if (event.target.id == "green") {
        arrFiltered = store.filterAllowColor("green", prickylyCollectionList);
      } else if (event.target.id == "lightBlue") {
        arrFiltered = store.filterAllowColor(
          "lightBlue",
          prickylyCollectionList
        );
      } else if (event.target.id == "pink") {
        arrFiltered = store.filterAllowColor("pink", prickylyCollectionList);
      } else if (event.target.id == "red") {
        arrFiltered = store.filterAllowColor("red", prickylyCollectionList);
      } else {
        arrFiltered = store.filterAllowColor("white", prickylyCollectionList);
      }
      const amoutProduct = arrFiltered.length;

      document.querySelector(".amount__modifier").innerHTML =
        amoutProduct + " products";
      arrFiltered.forEach((product) => {
        ui.add(product);
      });
    } else {
      if (event.target.id == "lightgreen") {
        arrFiltered = store.filterAllowColor(
          "lightgreen",
          TropicalCollectionList
        );
      } else if (event.target.id == "green") {
        arrFiltered = store.filterAllowColor("green", TropicalCollectionList);
      } else if (event.target.id == "lightBlue") {
        arrFiltered = store.filterAllowColor(
          "lightBlue",
          TropicalCollectionList
        );
      } else if (event.target.id == "pink") {
        arrFiltered = store.filterAllowColor("pink", TropicalCollectionList);
      } else if (event.target.id == "red") {
        arrFiltered = store.filterAllowColor("red", TropicalCollectionList);
      } else {
        arrFiltered = store.filterAllowColor("white", TropicalCollectionList);
      }
      const amoutProduct = arrFiltered.length;

      document.querySelector(".amount__modifier").innerHTML =
        amoutProduct + " products";
      arrFiltered.forEach((product) => {
        ui.add(product);
      });
    }
  });

// làm sự kiện scroll
const scrollFunc = () => {
  const product__elementList = document.querySelectorAll(".product__element");
  window.addEventListener("scroll", () => {
    const triggerBottom = (window.innerHeight / 2) * 4;
    product__elementList.forEach((product__element, index) => {
      const product__elementTop = product__element.getBoundingClientRect().top; // cách top nhiêu

      if (index == 0) {
        product__element.classList.add("show");
      } else if (product__elementTop < triggerBottom) {
        // Thêm độ trễ 3 giây cho các phần tử khác
        setTimeout(() => {
          product__element.classList.add("show");
        }, 3000);
      } else {
        product__element.classList.remove("show");
      }
    });
  });
};

scrollFunc();
