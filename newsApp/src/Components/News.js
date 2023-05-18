import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

  const capsFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title=`News Monkey - ${capsFirstLetter(props.category)}`;
    updateNews();
    //eslint-disable-next-line
  }, [])
  
   const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  }

    return (
      <>
        <h2 className="d-flex justify-content-center">NewsMonkey - Top Headlines {capsFirstLetter(props.category)} </h2>
        {loading && <Spinner />}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        > 

        <div className="container">
        <div className="row">
        {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                  <NewsItem
                    // title={element.title ? element.title.slice(0,45) : ""}
                    title={
                      element.title
                        ? element.title.length >= 55
                          ? element.title.slice(0, 45):
                        element.title
                        : ""
                    }
                    // description={element.description ? element.description.slice(0,60) : ""}
                    description={
                      element.description
                        ? element.description.length >= 75
                          ? element.description.slice(0, 65)
                          : element.description
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={!element.author ? "Anonymous" : element.author}
                    date={!element.publishedAt ? "" : element.publishedAt}
                    source={element.source.name}
                  />
                </div>
            })}
        </div>
        </div>
        </InfiniteScroll>
        
      </>
    )
}

 News.defautProps = {
  country: "in",
  pageSize: "6",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

// using buttons


 // const handleNextClick = async () => {
  //   setPage(page + 1)
  //   updateNews();
  // };

  // const handlePrevClick = async () => {
  //   setPage(page - 1)
  //   updateNews();
  // };

  
        // <div className="container d-flex justify-content-between fixed-bottom my-4">
        //   <button
        //     disabled={this.state.page <= 1}
        //     type="button"
        //     className="btn btn-primary"
        //     onClick={this.handlePrevClick}
        //   >
        //     &larr; Previous
        //   </button>
        //   <button
        //     disabled={
        //       this.state.page + 1 >
        //       Math.ceil(this.state.totalResults / props.pageSize)
        //     }
        //     type="button"
        //     className="btn btn-primary"
        //     onClick={this.handleNextClick}
        //   >
        //     Next &rarr;
        //   </button>
        // </div>