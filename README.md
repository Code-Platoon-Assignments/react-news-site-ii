# News Site Part II

** Note: the structuring of the components here will be a bit different than the code we saw in class. This document describes instructions of what we want to do but you might find that implementing certain functionalities in a different way will work better. 
** Example: You might want to put the link in the article teaser because that is where our title is, or you might have a function that is handling the click that will return the link tag somewhere else.

## Initial Setup
Each day of the News Site app will build on the previous day's code.

Today, we are going to create 1 new component, 2 pages, and a routing system to build up News Site II. A large majority of this code has already been written for you either here or in the previous day's code. We'll be moving quite a bit of code from one place to another.

The goal of this exercise is to:

1. put the list of articles in an `ArticleList` component

2. create a `HomePage` and an `ArticlePage` component and add routing

3. Edit the click handler on the article teaser to reroute to the `ArticlePage` and display more info about the article that was clicked on 

Your choice: for this challenge, we have provided the solutions to `news-site-i` in the starting code here. It is up to you whether you would like to use our code or your own code from yesterday.

### Set up

1. Create a new React app from your terminal (Vite needs Node 20.19+ or 22.12+, React Router 8 needs Node 22.22+; the devcontainer uses Node 24):

```sh
npm create vite@latest news-site-ii -- --template react
cd news-site-ii
npm install
```

2. Copy over the `components`, `data`, and `pages` directories from this repo to the `src/` of your new React project. If you would like to use your own code from `news-site-I`, replace the following files in the `components` directories with your files from `news-site-i`: `Article/Article.jsx`, `ArticleTeaser/ArticleTeaser.jsx`, and `AppNav/AppNav.jsx`. 

3. Copy over the `App.jsx` from either this repo or your `news-site-i` into your new `news-site-ii` project.

4. Later today, we will be adding some styling. There are many libraries out there but the one we are going to use is [react bootstrap](https://react-bootstrap.github.io/). React Bootstrap is a component libraries for React that uses Bootstrap styles under the hood. 

```sh
$ npm install react-bootstrap bootstrap
```

5. If you're using react-boostrap, add `import 'bootstrap/dist/css/bootstrap.min.css'` to your `src/main.jsx` (above `import './index.css'`). We'll come back to style this app a bit later - at this point, start up your new app with `npm run dev` and open [http://localhost:5173](http://localhost:5173). Your code should operate exactly like it did with `news-site-I`. **Do not move forward unless it's the same.**

6. At the moment, the `<a>` links in your `ArticleTeaser` component appends a `#` to the URL when clicked. This can cause a problem when handling route/url changes later today. Let's modify the `onClick` event handler to alleviate this changing `onClick` to this:
```javascript
onClick={(event) => {
  event.preventDefault();
  props.handleTitleClick(props.objectID);
}}
```
`event.preventDefault()` is the key line here - this will prevent the default behavior of the `<a>` tag. This default behavior is what's responsible for adding this hashtag to the URL.


## Component I: ArticleList
Currently, this code is showing us a random article, we want our homepage to show a list of article teasers. Your mission is to handle the `props` that are being passed in appropriately and create the content that the component should render.

Props for `ArticleList`:
1. `articles` - an array of article objects
2. `handleTitleClick` - a function (this function could alternately be defined inside `ArticleList`)

The `ArticleList` component will receive an array of `articles` (if you want a refresher on the data shape, take a look at `src/data/news.json`). `map` over this array and create an array of `ArticleTeaser`s. When you `map` over the `articles` array, it's good to use arrow functions. Take a look at what your `ArticleTeaser` component requires (you may want to utilize the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)):
- objectID (every article in `news.json` already has one - it also makes a good `key`)
- title
- created_at
- handleTitleClick

Don't worry about this not doing anything yet - we will wire it up in the next section.

## React Router
[React Router](https://reactrouter.com/) (version 8) is a popular open source library that's used to control routing in a single page app. Using this library, you can load `component`s based on URL paths. For example, you can configure React Router to load ComponentX when the URL `http://localhost:5173/componentx` is requested.

To utilize React Router, let's install:
```sh
$ npm install react-router
```

(`react-router-dom` stopped at version 7 - everything is in `react-router` now - so skip tutorials that install `react-router-dom` or use `<HashRouter>`, `<Routes>` in `App.jsx`, `useHistory` or `history.push`.)

Create `src/router.jsx` and bring in `createBrowserRouter` from the package you just installed:

```javascript
import { createBrowserRouter } from 'react-router';
import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'articles/:articleID', element: <ArticlePage /> },
    ],
  },
]);

export default router;
```

In `src/main.jsx`, render the router instead of `<App />`:

```javascript
import { RouterProvider } from 'react-router/dom';
import router from './router.jsx';

// inside createRoot(...).render( ... ):
<RouterProvider router={router} />
```

Let's rewrite the `return` in `App.jsx` (`import { Outlet } from 'react-router';` at the top):
```javascript
return (
  <div>
    <h1>AppNav Component</h1>
    <hr />
    <AppNav sections={sections} handleNavClick={(clickedItem) => console.log(clickedItem)} />
    <Outlet />
  </div>
);
```

Here `App` is the parent route: it always shows the `AppNav`, and the `<Outlet />` is where React Router renders the child route that matches the URL - `HomePage` at `/`, `ArticlePage` at `/articles/:articleID`. Because we think of these components as different pages in our app, we've kept them in a `pages` directory and named them accordingly.

With this rewrite, we are no longer utilizing `article` or the imported `ArticleTeaser` and `Article` components in `App.jsx`. Go ahead and delete those imports and state instantiation.

At this time, you may see a number of warnings and errors - how do you bring `HomePage` and `ArticlePage` (found in `src/pages/`) into `router.jsx`?

Once the `HomePage` component is succesfully brought in, it's about 60% complete - once you've defined your route - and assuming you successfully built the `ArticleList` `component` in the step above - you should see a full list of articles at the `/` path (`http://localhost:5173/`).

You also should be able to see the `ArticlePage` `component` (`src/pages/ArticlePage.jsx`) by navigating to `http://localhost:5173/articles/1`. It should simply have the NavBar at the top and the words `Article Page` (boilerplate).

If you are seeing the behavior above, you may continue to the next step. If not, ask your classmates or instructional staff for help.


## ArticlePage Component
The `ArticlePage` component should render the `Article` component, and provide the necessary props to the child component. If you remember, `Article` accepts a variety of props from a single article object in `src/data/news.json` array. In order to determine the array object to use, we need to obtain the params from the router logic. To do this, we can employ the `useParams()` hook. The `objectID` of the article you want will be contained within `params.articleID`, which corresponds to `[articleID]` portion in this URL: `http://localhost:5173/articles/[articleID]`

__useParams()__

You can use the `useParams` hook to retrieve dynamic params from the current URL (ex: `articleID`) that were matched by the Route Path.

Example for url: http://localhost:5173/articles/:articleID
```js
import { useParams } from 'react-router';

const ArticlePage = () => {
  let { articleID } = useParams();

  return (
    <div>
      <div>Article Page</div>
      <div>Article ID: { articleID }</div>
    </div>
  )
}
```

## HomePage Component

The one piece of functionality left to complete is the `handleTitleClick` function being passed into the `ArticleList` `component`. Ultimately, this function should trigger a page change. React Router doesn't pass any routing props to your pages; instead it gives you a hook and a component.
We can call the `useNavigate()` hook inside `HomePage` and use the function it returns in `handleTitleClick`:

```js
import { useNavigate } from 'react-router';

  const navigate = useNavigate();
  const handleTitleClick = (articleID) => navigate(`/articles/${articleID}`);
```

Or we can use the `Link` component from `react-router` to navigate to a route path (for example in the `ArticleTeaser`). Ultimately, this should look something like 

```js
import { Link } from 'react-router';

  <Link to={`/articles/${articleID}`}> title </Link>

```

`articleID` is the article's `objectID`, and is a parameter already being passed into this function. You should be able to click links in your homepage and be able to hit different urls that correspond with the article that you clicked.


Write the code necessary to find the news article and pass it into the `Article` component and render it all out on the screen. The Article page should render the article's:
- Title
- Created Date
- Author
- object ID

As of right now, keep in mind that people are able to type any ID into the URL, like `/articles/0`, and no article in the JSON file has that `objectID`. How can we alter `ArticlePage` so it shows a message instead of crashing when the article isn't found?

## Style with Bootstrap
Style everything using React-bootstrap! Let's make the Nav bar, the list of ArticleTeasers, and the Articles look nice.

