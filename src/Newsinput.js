import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Loader from "./Loader";
import AutoComplete from "./AutoComplete";
import { Link, useParams } from "react-router-dom";

function Newsinput({
  clickIcon,
  allNews,
  submitHandler,
  totalResults,
  setTotalResults,
  setAllNews,
  isLoading,
  setIsLoading,
  filledIcon,
}) {
  let params = useParams();
  // console.log(params.newsId);

  useEffect(async () => {
    try {
      const res = await axios.get(
        `https://inshortsapi.vercel.app/news?category=${params.newsId || "all"}`
      );

      const newsData = res.data.data;
      setTotalResults(newsData.length);
      setIsLoading(false);
      setAllNews(newsData);
    } catch (error) {}
  }, [params.newsId]);

  const reloadHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://inshortsapi.vercel.app/news?category=${params.newsId}`
      );
      const newsData = res.data.data;
      setTotalResults(newsData.length);
      setIsLoading(false);
      setAllNews(newsData);
    } catch (error) {}
  };

  // const location = useLocation();
  // console.log(location);
  return (
    <div className='Api'>
      <div className='parentapi'>
        <div className='apiform'>
          <div className='textload'>
            <button onClick={reloadHandler} className='btn'>
              Reload News
            </button>
          </div>

          <div className='hearticon'>
            <Link to='/fav' className='fa-solid fa-heart'>
              Favourite
            </Link>
          </div>
        </div>
      </div>

      <AutoComplete
        submitHandler={submitHandler}
        suggestions={[
          "all",
          "business",
          "sports",
          "world",
          "politics",
          "technology",
          "startup",
          "entertainment",
          "science",
          "automobile",
          "hatke",
        ]}
      />

      <h4 className='result'>
        {totalResults} Total Results Of {params.newsId ? params.newsId : "all"}
      </h4>
      <div className='loadingDiv'>{isLoading && <Loader />}</div>
      {allNews.length > 0 && !isLoading && (
        <div className='NewsApi'>
          {allNews.map((news_item, index) => {
            return (
              <Card key={index}>
                <p className='p1'>{<img src={news_item.imageUrl}></img>}</p>
                <p className='p2'>{news_item.author}</p>
                <p className='p3'>{news_item.content}</p>
                <p className='p4'>{news_item.time}</p>
                <p className='p5'>{news_item.date}</p>
                <a href={news_item.readMoreUrl} className='p6' target='_blank'>
                  <button type='button'>Go To Page</button>
                </a>
                <i
                  onClick={() => {
                    clickIcon(news_item);
                  }}
                  className={`${
                    filledIcon.includes(news_item.imageUrl)
                      ? `fa-solid`
                      : `fa-regular`
                  } fa-bookmark fa-icon`}
                />
                {/* {filledIcon === index ? (
                    <i
                      onClick={() => clickIcon(news)}
                      className="fa-solid fa-bookmark"
                    ></i>
                  ) : (
                    <i
                      onClick={() => clickIcon(news)}
                      className="fa-regular fa-bookmark"
                    ></i>
                  )} */}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Newsinput;
