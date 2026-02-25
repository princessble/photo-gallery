const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

// ⚠️ Your Unsplash Access Key (public on GitHub Pages can be abused)
const ACCESS_KEY = "vQ1ZD-c6ZJO_P_i0DIj0IRkNXfabmwygdgBwbFkBiaA";

async function fetchImage() {
  const inputValue = Number(document.getElementById("input").value);

  // validate input
  if (inputValue > 20 || inputValue < 1) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Number should be between 1 and 20";
    return;
  }

  // loading UI
  errorMessageEl.style.display = "none";
  btnEl.disabled = true;
  galleryEl.innerHTML = `<div class="spinner"></div>`;

  try {
    const page = Math.floor(Math.random() * 1000) + 1;

    const res = await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${page}`,
      {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      }
    );

    // handle non-JSON errors like "Rate Limit Exceeded"
    if (!res.ok) {
      const text = await res.text();

      if (res.status === 403 && text.toLowerCase().includes("rate")) {
        throw new Error("RATE_LIMIT");
      }

      throw new Error(`REQUEST_FAILED_${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("BAD_RESPONSE");
    }

    galleryEl.innerHTML = data
      .map((pic) => `<img src="${pic.urls.small}" alt="image" />`)
      .join("");
  } catch (error) {
    console.error("Error fetching images:", error);

    galleryEl.innerHTML = "";

    errorMessageEl.style.display = "block";
    if (error.message === "RATE_LIMIT") {
      errorMessageEl.innerText =
        "Unsplash rate limit exceeded. Try again later or use a new API key.";
    } else {
      errorMessageEl.innerText = "Something went wrong. Try again!";
    }
  } finally {
    btnEl.disabled = false;
  }
}

btnEl.addEventListener("click", fetchImage);