const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

const ACCESS_KEY = "vQ1ZD-c6ZJO_P_i0DIj0IRkNXfabmwygdgBwbFkBiaA"; // Unsplash Access Key

async function fetchImage() {
  const inputValue = Number(document.getElementById("input").value);

  if (inputValue > 20 || inputValue < 1) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Number should be between 1 and 20";
    return;
  }

  errorMessageEl.style.display = "none";
  btnEl.disabled = true;

  // ✅ CSS spinner (no svg file needed)
  galleryEl.style.display = "grid";
  galleryEl.innerHTML = `<div class="spinner"></div>`;

  try {
    const page = Math.floor(Math.random() * 1000) + 1;

    const res = await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${page}&client_id=${ACCESS_KEY}`
    );

    // ✅ If API fails, don't try res.json()
    if (!res.ok) {
      const errorText = await res.text(); // often "Rate Limit Exceeded"
      throw new Error(`Unsplash error ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    let imgs = "";
    data.forEach((pics) => {
      imgs += `<img src="${pics.urls.small}" alt="image" />`;
    });

    galleryEl.innerHTML = imgs;
  } catch (error) {
    console.error("Error fetching images:", error);

    errorMessageEl.style.display = "block";

    if (String(error.message).includes("Rate Limit")) {
      errorMessageEl.innerText =
        "Unsplash rate limit exceeded. Try again later or use a new API key.";
    } else {
      errorMessageEl.innerText = "Something went wrong. Try again!";
    }

    galleryEl.innerHTML = "";
  } finally {
    btnEl.disabled = false;
  }
}

btnEl.addEventListener("click", fetchImage);