let layout = document.querySelector(".layout");
let imgClicked = document.querySelector(".layout .box");
let x = document.getElementById("close");
let next = document.getElementById("next");
let prev = document.getElementById("back");

if (localStorage.getItem("api") !== null) {
  let api = JSON.parse(localStorage.getItem("api"));
  showdata(api);
}


async function getData(catego) {
  let data = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${catego != null ? catego : "carrot"}`
  );

  let result = await data.json();
  localStorage.setItem("api", JSON.stringify(result))
  showdata(result);
}
getData()


function handleClick() {
  let btns = document.querySelectorAll(".btn")
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      console.log(btn.innerHTML);
      showdata(getData(btn.innerHTML));
    });
  });
}
handleClick()



// async function getData() {
//   let arr = [
//     "carrot",
//     "broccoli",
//     "asparagus",
//     "cauliflower",
//     "corn",
//     "cucumber",
//   ];
// }

// getData();


function showdata(result) {
  let box = ``;
  for (let i = 0; i < result.recipes.length; i++) {
    box += `
            <div class="col-lg-4 col-md-6 my-3">
                        <img  src="${result.recipes[i].image_url}" class="w-100 h-300 img" alt="">
                        <p class = "text-center my-3">${result.recipes[i].title}</p>
                    </div>
        `;
  }
  document.getElementById("row").innerHTML = box;
  let imgs = document.querySelectorAll(".img");
  clickimage(imgs);
}

function clickimage(imgs) {
  imgs.forEach((img) => {
    img.addEventListener("click", (e) => {
      layout.style.display = "block";

      let arrimgs = Array.from(imgs);

      let indexOfImg = arrimgs.indexOf(e.target);

      imgClicked.style.cssText = `background-image: url(${arrimgs[indexOfImg].src}) !important`;

      nextbtn(arrimgs, indexOfImg);
      backbtn(arrimgs, indexOfImg);
    });
  });
}

function closebtn() {
  x.addEventListener("click", (e) => {
    layout.style.display = "none";
  });
}
closebtn();

function nextbtn(arrimgs, indexOfImg) {
  next.addEventListener("click", () => {
    indexOfImg++;
    if (indexOfImg == arrimgs.length) {
      indexOfImg = 0;
    }
    imgClicked.style.cssText = `background-image: url(${arrimgs[indexOfImg].src}) !important`;
  });
}

layout.addEventListener("click", () => {
  layout.style.display = "none";
  imgClicked.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

function backbtn(arrimgs, indexOfImg) {
  prev.addEventListener("click", () => {
    indexOfImg--;
    if (indexOfImg < 0) {
      indexOfImg = arrimgs.length - 1;
    }
    imgClicked.style.cssText = `background-image: url(${arrimgs[indexOfImg].src}) !important`;
  });
}
