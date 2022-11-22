function Article(props) {
 
  return (
    <div>
      <h1>{ props.title }</h1>
      <p>{ props.created_date }</p>
      <h2>{ props.author }</h2> 
      { props.image && <img src={ props.image }/> }
      <p>{ props.object_id }</p>
    </div>
  )
}

export default Article;

