function ArticleTeaser(props) {

  const { objectID, title, created_at, handleTitleClick } = props
  
  return (
    <div>
      <h2><a href="#" onClick={ () => handleTitleClick(objectID) }>{ title }</a></h2>
      <p>{ created_at }</p>
    </div>
  )
}

export default ArticleTeaser;


// // class-based component equivalent code:
// import React, { Component } from 'react';

// class ArticleTeaser extends Component {
//   render() {
//     const { id, title, created_date: createdDate, handleTitleClick } = this.props;
//     return (
//       <div>
//         <a onClick={ () => handleTitleClick(id) }>{ title }</a>
//         <p>{ createdDate }</p>
//       </div>
//     )
//   }
// }

// export default ArticleTeaser;


