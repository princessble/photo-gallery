const btnEl = document.getElementById("btn")
const errorMessageE1 = document.getElementById("errorMessage")



function fetchImage(){
    const inputValue = document.getElementById("input").value;

    if(inputValue > 20 || inputValue < 1){
        errorMessageE1.style.display = "block";
        return

    }
    fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=1&client_id=vQ1ZD-c6ZJO_P_i0DIj0IRkNXfabmwygdgBwbFkBiaA`).then((res)=>res.json().then((data)=>{
        console.log(data);
    }))
}
btnEl.addEventListener("click", fetchImage)
