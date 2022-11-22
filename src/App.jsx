import './App.css';
import { useState } from "react"
// data
import News from './data/news.json';
import navItemsData from './data/navItems.json';
// components
import AppNav from './components/AppNav/AppNav.jsx';
import ArticleTeaser from './components/ArticleTeaser/ArticleTeaser.jsx'
import Article from './components/Article/Article.jsx'

// seed values
const randomArticleIndex = Math.floor(Math.random() * News.length);
const randomArticle = News[randomArticleIndex];

function App() {
  // states
  const [navItems, setNavItems] = useState(navItemsData)
  const [article, setArticle] = useState({
    id: randomArticleIndex,
    title: randomArticle.title,
    url: randomArticle.url,
    author: randomArticle.author,
    created_date: randomArticle.created_at,
    object_id: randomArticle.objectID
  })

  // renders
  return (
    <div>
      <h1>AppNav Component</h1>
      <hr />

      <AppNav navItems={navItems} handleNavClick={(clickedItem) => { console.log(clickedItem) }} />

      <h1>ArticleTeaser Component</h1>
      <hr />

      <ArticleTeaser
        id={article.id}
        title={article.title}
        created_date={article.created_date}
        handleTitleClick={(articleID) => { console.log(articleID) }} />

      <h1>Article Component</h1>
      <hr />

      <Article {...article} />
    </div>
  );
}

export default App;
