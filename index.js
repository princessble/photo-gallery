const btnEl = document.getElementById("btn")


function fetchImage(){
    const inputValue = document.getElementById("input").value;

    if(inputValue > 10 || inputValue < 1){
        
    }
    fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=1&client_id=vQ1ZD-c6ZJO_P_i0DIj0IRkNXfabmwygdgBwbFkBiaA`).then((res)=>res.json().then((data)=>{
        console.log(data);
    }))
}
btnEl.addEventListener("click", fetchImage)
