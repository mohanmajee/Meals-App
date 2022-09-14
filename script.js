let alphabet;
let httpReq = new XMLHttpRequest();
var itemSet=new Set();

// fetching data and storing to itemset 
try{
    let list=localStorage.getItem("list").split("-");
    for(let id of list){
        if(id!=""){
            itemSet.add(id);
        }
    }
}catch(err){

    // handling error 
    localStorage.setItem("list", "");
}

// getting all category data and populating into cat div 
function getCatData(alphabet){
    let httpReq = new XMLHttpRequest();
    httpReq.open("get", alphabet,false);

    // removing all childs from cat div 
    const myNode = document.getElementById("cat-list");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
    httpReq.onload = function() {
        data = JSON.parse(httpReq.response);

        // iterating on all data 
        for(let meal of data.meals){


            parent=document.createElement("div");
            parent.id="cat-items";
            // parent item 
            div=document.createElement("div");
            img=document.createElement("img");
            img.src=meal.strMealThumb;
            div.appendChild(img);

            // title of meal 
            title=document.createElement("h5");
            a=document.createElement("a");
            title.id=meal.idMeal;
            title.innerHTML = meal.strMeal;
            
            a.setAttribute("href", "Comp/details.html");
            a.appendChild(title);
            title.setAttribute("onclick", "detailsClicked(this.id)");

            // add favorites button
            button=document.createElement("button");
            button.innerHTML = "Add to Favorite";
            button.id= meal.idMeal;
            
            button.setAttribute("onclick", "fav_click(this.id)" );

            // adding child to parent 
            parent.appendChild(div);
            parent.appendChild(a);
            parent.appendChild(button);
            
            document.getElementById("cat-list").appendChild(parent);
        }

    }
    httpReq.send();
}

// adding all category  data 
httpReq.open("get", "https://www.themealdb.com/api/json/v1/1/list.php?c=list", false);
const myNode = document.getElementById("select-cat");

httpReq.onload = function() {
        data = JSON.parse(httpReq.response);
        for(let category of data.meals){
            node=document.createElement("option");
            node.innerHTML = category.strCategory;
            node.setAttribute("value", category.strCategory );
            node.setAttribute("onclick", "cat_click(this.value)" );
            document.getElementById("select-cat").appendChild(node);
        }

}
httpReq.send();

// category is clicked 
function cat_click(char){
    alphabet ="https://www.themealdb.com/api/json/v1/1/filter.php?c="+ char;
    getCatData(alphabet);
}

// add favorite butto is clicked 
function fav_click(name){
    if(itemSet.size==0){
        const myNode = document.getElementById("fav-list");
        myNode.removeChild(myNode.lastChild);
    }
    if(!itemSet.has(name)){
        itemSet.add(name);
        localStorage.setItem("list",localStorage.getItem("list")+name+"-" );
        alphabet ="https://www.themealdb.com/api/json/v1/1/lookup.php?i="+ name;
        getFavData(alphabet);
    }    
}

getCatData("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
getData("https://www.themealdb.com/api/json/v1/1/search.php?f=s");

var searchSet=new Set();
// searching data and reloading data

// search bar key up handle 
function keyupHandle() {
    const myNode = document.getElementById("search-result");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
    searchText=document.getElementById("searchtext").value;
    
    if(searchText.length!=0){
        if(searchText.length==1){
            loadSearchedData("https://www.themealdb.com/api/json/v1/1/search.php?f="+searchText);
        }else{
            loadSearchedData("https://www.themealdb.com/api/json/v1/1/search.php?s="+searchText);
        }   
    }        
}

// loading searched data 
function loadSearchedData(alphabet){
    
    httpReq.open("get", alphabet, true);
    searchSet=new Set(); 
    console.log(alphabet);
    httpReq.onload = function() {
        data = JSON.parse(httpReq.response);
        // ietratong on fetched data 
        for(let meal of data.meals){
            searchSet.add(meal.strMeal);
            li=document.createElement("li");
            a1=document.createElement("a");
            a1.innerHTML = meal.strMeal;
            a1.id=meal.idMeal;
            a1.setAttribute("onclick", "detailsClicked(this.id)");
            a1.setAttribute("href", "Comp/details.html");
            a1.setAttribute("target", "_blank");
            p=document.createElement("p");
            p.id=meal.idMeal;
            p.innerHTML = "Add to Favourites";
            p.setAttribute("onclick", "fav_click(this.id)");
            li.appendChild(a1);
            li.appendChild(p)
            document.getElementById("search-result").appendChild(li);
        }
    }
    httpReq.send();
}

// show detailes meal clickedd 
function detailsClicked(id){

    // storing to local 
    localStorage.setItem("id", id);
}