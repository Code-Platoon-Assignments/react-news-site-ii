import './App.css';
import { useState } from "react"
// data
import News from './data/news.json';
import sectionsData from './data/sections.json';
// components
import AppNav from './components/AppNav/AppNav.jsx';
import ArticleTeaser from './components/ArticleTeaser/ArticleTeaser.jsx'
import Article from './components/Article/Article.jsx'

// seed values
const randomArticleIndex = Math.floor(Math.random() * News.length);
const randomArticle = News[randomArticleIndex];

function App() {
  // states
  const [sections, setSections] = useState(sectionsData)
  const [article, setArticle] = useState({
    objectID: randomArticle.objectID,
    title: randomArticle.title,
    created_at: randomArticle.created_at,
    url: randomArticle.url,
    author: randomArticle.author
  })

  // renders
  return (
    <div>
      <h1>AppNav Component</h1>
      <hr />

      <AppNav sections={sections} handleNavClick={(clickedItem) => { console.log(clickedItem) }} />

      <h1>ArticleTeaser Component</h1>
      <hr />

      <ArticleTeaser
        objectID={article.objectID}
        title={article.title}
        created_at={article.created_at}
        handleTitleClick={(articleID) => { console.log(articleID) }} />

      <h1>Article Component</h1>
      <hr />

      <Article {...article} />
    </div>
  );
}

export default App;
