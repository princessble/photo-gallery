const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

async function fetchImage() {
  const inputValue = Number(document.getElementById("input").value);

  if (inputValue > 20 || inputValue < 1) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Number should be between 1 and 20";
    return;
  }

  errorMessageEl.style.display = "none";
  btnEl.disabled = true;

  // show spinner (CSS spinner)
  galleryEl.innerHTML = `<div class="spinner"></div>`;

  try {
    const seedBase = Date.now(); // changes each click so images change
    const imgs = Array.from({ length: inputValue }, (_, i) => {
      const seed = seedBase + i;
      return `<img src="https://picsum.photos/seed/${seed}/600/400" alt="random image" />`;
    }).join("");

    galleryEl.innerHTML = imgs;
  } catch (error) {
    console.error("Error fetching images:", error);
    galleryEl.innerHTML = "";
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Something went wrong. Try again!";
  } finally {
    btnEl.disabled = false;
  }
}

btnEl.addEventListener("click", fetchImage);