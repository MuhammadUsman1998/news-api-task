import Card from "./Card";

function Favourite({ favNews, deleteHandler }) {
  return (
    <div className="container">
      <div className="NewsApi heart">
        {favNews.length === 0 && <h1>There is no favourites right now</h1>}
        {favNews.length > 0 &&
          favNews.map((item, index) => {
            return (
              <Card key={index}>
                <p className="p1">{<img src={item.imageUrl}></img>}</p>
                <p className="p2">{item.author}</p>
                <p className="p3">{item.content}</p>
                <p className="p4">{item.time}</p>
                <p className="p5">{item.date}</p>
                <a href={item.readMoreUrl} className="p6" target="_blank">
                  <button type="button">Go To Page</button>
                </a>
                <i
                  onClick={() => deleteHandler(item)}
                  className="fa-solid fa-bookmark fa-icon"
                ></i>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default Favourite;
