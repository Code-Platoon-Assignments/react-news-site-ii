function Article(props) {
 
  return (
    <div>
      <h1>{ props.title }</h1>
      <p>{ props.created_at }</p>
      { props.url && <a href={ props.url }>{ props.url }</a> }
      <p>{ props.author }</p>
      <p>{ props.objectID }</p>
    </div>
  )
}

export default Article;

