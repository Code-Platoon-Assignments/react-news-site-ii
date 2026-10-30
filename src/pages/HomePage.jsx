import ArticleList from '../components/ArticleList/ArticleList.jsx'
import News from '../data/news.json';

function HomePage() {
  const handleTitleClick = (articleID) => console.log(`TODO - use React Router's useNavigate() hook (or a <Link>) to change the page to /articles/${articleID}`);

  return (
    <div>
      <ArticleList 
        articles={News} 
        handleTitleClick={handleTitleClick} 
      />
    </div>
  );
}

export default HomePage;
