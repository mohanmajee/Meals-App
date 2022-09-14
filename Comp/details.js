// retrive meal id form local storage 
let mealId=localStorage.getItem("id");

// collecting api link attaching it with id 
let alphabet="https://www.themealdb.com/api/json/v1/1/lookup.php?i="+mealId;

// declaring xmlhttp request 
let httpReq = new XMLHttpRequest();
httpReq.open("get", alphabet,false);

httpReq.onload = function() {
    data = JSON.parse(httpReq.response);

    // iterating on data fetched from server 
    for(let meal of data.meals){

        // storing data in dom 
        document.getElementById('heading').innerHTML=meal.strMeal;
        document.getElementById('instruction').innerHTML=meal.strInstructions;
        document.getElementById('category').innerHTML=document.getElementById('category').innerHTML+meal.strCategory;
        document.getElementById('img').setAttribute("src", meal.strMealThumb);
        document.getElementById('yt').setAttribute("href", meal.strYoutube);
        break;
    }

}
httpReq.send();