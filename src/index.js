function formResults(event){
    event.preventDefault();
    let city = document.querySelector("#current-city");
    let searchInput = document.querySelector("#search-input");
    console.log(searchInput.value)
    city.innerHTML= `${searchInput.value}`;
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", formResults);
