// const API_KEY="f6c97f042bb14819b4b5fc488eb528f0";
const url="https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=>fetchNews("India"))

function reload(){
    window.location.reload()
}
async function fetchNews (query){
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`)

    const data=await res.json();
    console.log(data);
    bindData(data.articles)
}
function bindData(articles){
    const cardContainer=document.getElementById("cards-container")
    const newsCardTemplate=document.getElementById("template-news-card")
    cardContainer.innerHTML="";
    articles.forEach(article=> {
        if(!article.urlToImage)return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardContainer.appendChild(cardClone)
        
    });
}
function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-image')
    const newsTitle=cardClone.querySelector('#news-title')
    const newsSource=cardClone.querySelector('#news-source')
    const newsDesc=cardClone.querySelector('#news-desc')
newsImg.src=article.urlToImage;
newsTitle.innerHTML=article.title;
newsDesc.innerHTML=article.description;
const date=new Date(article.publishedAt).toLocaleString("en-us",{timeZone:"Asia/Jakarta"})
newsSource.innerHTML=`${article.source.name} . ${date}`
cardClone.firstElementChild.addEventListener('click',()=>{window.open(article.url,"_blank")})
}
let currentSelectedNav=null;
function onNavClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id)
    currentSelectedNav?.classList.remove('active')
    currentSelectedNav=navItem;
    currentSelectedNav.classList.add('active')
}

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById("search-button");
    const searchText = document.getElementById("search-text");

    if (searchButton && searchText) {
        searchButton.addEventListener('click', () => {
            const query = searchText.value;
            if (!query) return;
            fetchNews(query);
            // Additional code here
        });
    } else {
        console.error("Search button or search text input not found.");
    }
});
