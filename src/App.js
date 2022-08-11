import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Newsinput from "./Newsinput";
import Favourite from "./Favourite";
import { Routes, Route, useParams } from "react-router-dom";
import Header from "./Header";
import useLocalStorage from "./useLocalStorage";
function App() {
  const [allNews, setAllNews] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [favNews, setFavNews] = useLocalStorage("favNews", []);
  const [filledIcon, setFilledIcon] = useState([]);
  const submitHandler = async (e, catName) => {
    e.preventDefault();
    setValue(catName);
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://inshortsapi.vercel.app/news?category=${catName}`
      );
      const newsData = res.data.data;
      setTotalResults(newsData.length);
      setIsLoading(false);
      setAllNews(newsData);
    } catch (error) {}
  };
  useEffect(async () => {
    try {
      const res = await axios.get(
        `https://inshortsapi.vercel.app/news?category=all`
      );

      const newsData = res.data.data;
      setTotalResults(newsData.length);
      setIsLoading(false);
      setAllNews(newsData);
    } catch (error) {}
  }, []);
  const menuHandler = () => {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  };

  const deleteHandler = (item) => {
    const removeNews = favNews.filter((news) => {
      return item.imageUrl !== news.imageUrl;
    });
    setFavNews(removeNews);
    setFilledIcon((prevState) =>
      prevState.filter((item) => item.imageUrl !== prevState.imageUrl)
    );
    alert("This news has removed from favourites");
  };

  const clickIcon = (news_item) => {
    if (favNews.find((item) => item.imageUrl == news_item.imageUrl)) {
      deleteHandler(news_item);
    } else {
      alert("This news has been saved");
      setFavNews([...favNews, news_item]);
      setFilledIcon([...filledIcon, news_item.imageUrl]);

      // alert("this news already been saved");
      // localStorage.getItem("favNews", JSON.stringify(favNews));
      // setFavNews([...favNews, news_item]);
      // deleteHandler(news_item);
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("allNews", JSON.stringify(allNews));
  // }, []);

  // useEffect(() => {
  //   const ids = favNews.map((o) => o.id);
  //   const filtered = favNews.filter(
  //     ({ id }, index) => !ids.includes(id, index + 1)
  //   );
  //   localStorage.setItem("favNews", JSON.stringify(filtered));
  // }, [favNews]);

  let params = useParams();
  // console.log(params);

  return (
    <div className='App'>
      <div className='container'>
        <Header submitHandler={submitHandler} menuHandler={menuHandler} />

        <Routes>
          <Route
            path='/'
            element={
              <Newsinput
                submitHandler={submitHandler}
                clickIcon={clickIcon}
                allNews={allNews}
                totalResults={totalResults}
                setTotalResults={setTotalResults}
                setAllNews={setAllNews}
                value={value}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                filledIcon={filledIcon}
                setFilledIcon={setFilledIcon}
              />
            }
          />

          <Route
            path=':newsId'
            element={
              <Newsinput
                submitHandler={submitHandler}
                clickIcon={clickIcon}
                allNews={allNews}
                totalResults={totalResults}
                setTotalResults={setTotalResults}
                setAllNews={setAllNews}
                value={value}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                filledIcon={filledIcon}
                setFilledIcon={setFilledIcon}
              />
            }
          />

          <Route
            path='/fav'
            element={
              <Favourite favNews={favNews} deleteHandler={deleteHandler} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
