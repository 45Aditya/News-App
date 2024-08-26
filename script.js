const API_KEY = "8f0879fae1d94b09b9a0dd3371573e0b";
const url = "https://newsapi.org/v2/everything?q=";

const container = document.getElementById("blog_container");
const searchBtn = document.getElementById("search_button");
const input = document.getElementById("input-field");

// Function to fetch news
async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data.articles;
    } catch (err) {
        console.error("Error fetching news", err);
        return [];
    }
}

// Function to display news
async function showNews(articles) {
    const articlesWithImages = articles.filter(article => article.urlToImage);
    const limitedArticles = articlesWithImages.slice(0, 10);

    container.innerHTML = '';

    limitedArticles.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('blog_card');

        // Create a link element to wrap the entire card
        const link = document.createElement('a');
        link.href = article.url;
        link.target = '_blank';
        link.classList.add('article-link');

        const image = document.createElement('img');
        image.src = article.urlToImage;
        image.alt = article.title;
        card.appendChild(image);

        const title = document.createElement('h2');
        title.textContent = article.title;
        card.appendChild(title);

        const desc = document.createElement('p');
        desc.textContent = article.description || 'No description available';
        card.appendChild(desc);

        // Append the card to the link, and the link to the container
        link.appendChild(card);
        container.appendChild(link);
    });
}

// Function to handle search
async function search() {
    const query = input.value;
    const articles = await fetchNews(query);
    showNews(articles);
}

// Function to load random US news on window load
async function loadNews() {
    const query = 'us'; 
    const articles = await fetchNews(query);
    showNews(articles);
}

// Attach event listener to the search button
searchBtn.addEventListener('click', search);

// Load random US news when the window loads
window.addEventListener('load', loadNews);
