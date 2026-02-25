const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

async function fetchImage() {
  const inputValue = document.getElementById("input").value;

  if (inputValue > 20 || inputValue < 1) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Number should be between 1 and 20";
    return;
  }

  let imgs = "";

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=vQ1ZD-c6ZJO_P_i0DIj0IRkNXfabmwygdgBwbFkBiaA`
    );

    const data = await res.json();
    console.log(data);

    if (data) {
      data.forEach((pics) => {
        imgs += `
          <img src="${pics.urls.small}" alt="image"/>
        `;
      });

      galleryEl.style.display = "block";
      galleryEl.innerHTML = imgs;
    }

    errorMessageEl.style.display = "none";
  } catch (error) {
    console.error("Error fetching images:", error);
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Something went wrong. Try again!";
  }
}

btnEl.addEventListener("click", fetchImage);