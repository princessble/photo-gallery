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

  let imgs = "";

  try {
    errorMessageEl.style.display = "none";
    btnEl.disabled = true;

    // ✅ CSS spinner (no svg file needed)
    galleryEl.style.display = "grid";
    galleryEl.innerHTML = `<div class="spinner"></div>`;

    const res = await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.floor(Math.random() * 1000) + 1}&client_id=vQ1ZD-c6ZJO_P_i0DIj0IRkNXfabmwygdgBwbFkBiaA`
    );

    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Unexpected API response");

    data.forEach((pics) => {
      imgs += `<img src="${pics.urls.small}" alt="image" />`;
    });

    galleryEl.innerHTML = imgs;
  } catch (error) {
    console.error("Error fetching images:", error);
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Something went wrong. Try again!";
    galleryEl.innerHTML = "";
  } finally {
    btnEl.disabled = false;
  }
}

btnEl.addEventListener("click", fetchImage);