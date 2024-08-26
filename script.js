const API_KEY = "8f0879fae1d94b09b9a0dd3371573e0b";
const url = "https://newsapi.org/v2/everything?q=";

const blogContainer = document.getElementById("blog_container");
const searchButton = document.getElementById("search_button");
const searchBar = document.getElementById("input-field");

// Function to fetch random news
async function fetchRandom(query) {
    try {
        const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
}

// Function to display news
async function displayNews(articles) {
    const articlesWithImages = articles.filter(article => article.urlToImage);

    const limitedArticles = articlesWithImages.slice(0, 10);

    blogContainer.innerHTML = '';

    limitedArticles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('blog_card');

        const imgElement = document.createElement('img');
        imgElement.src = article.urlToImage;
        imgElement.alt = article.title;
        articleElement.appendChild(imgElement);

        const titleElement = document.createElement('h2');
        titleElement.textContent = article.title;
        articleElement.appendChild(titleElement);

        const descElement = document.createElement('p');
        descElement.textContent = article.description || 'No description available';
        articleElement.appendChild(descElement);

        blogContainer.appendChild(articleElement);
    });
}

// Function to handle search
async function search() {
    const query = searchBar.value;
    const articles = await fetchRandom(query);
    displayNews(articles);
}

// Function to load random US news on window load
async function loadInitialNews() {
    const query = 'us'; 
    const articles = await fetchRandom(query);
    displayNews(articles);
}

// Attach event listener to the search button
searchButton.addEventListener('click', search);

// Load random US news when the window loads
window.addEventListener('load', loadInitialNews);
