export default function Card(props) {
  return (
    <div className="card" onClick={props.handleClick}>
      <h1 className="card-title">{props.title}</h1>
      <div className="card-header">
        <img src={props.src} className="card-img" />
        <div className="card-detail">
          <div className="detail-cont">
            {props.rating !== "" && (
              <div className="detail">
                <img src="/imgs/star.svg" />
                <span>Rating: </span>
                  {props.rating}
              </div>
            )}
            {props.servings !== "" && (
              <div className="detail">
                <img src="/imgs/servings.svg" />
                  <span>Serving Size: </span>
                  {props.servings}
              </div>
            )}
            {props.time !== "" && (
              <div className="detail">
                <img src="/imgs/time.svg" />
                <span>Prep Time: </span>
                {props.time}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="list-cont">
        <h2 className="card-subtitle">Ingredients</h2>
        <ul>
          {props.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        </div>
      <div className="list-cont">
        <h2 className="card-subtitle">Instructions</h2>
        <ul>
          {props.instructions.map((instructions, index) => (
            <li key={index}>{instructions}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
