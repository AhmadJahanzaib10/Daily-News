import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types';
const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalRes] = useState(0);
  // document.title = `${props.category} | News Monkey`
  const updateNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=afa0a852bbfd4ca181b08e4a40118d89&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(30);
    let data = await fetch(url);
    let paresdData = await data.json();
    props.setProgress(60);
    setArticles(paresdData.articles);
    setTotalRes(paresdData.totalResults);
    setLoading(false);
    props.setProgress(100);
    setPage(page + 1)
  }

  useEffect(() => {
    updateNews();
  }, []);
  
  const fetchMoreData = async () => {
    // yahan par page ko +1 karny se khuch nahi horaha tha because async function state update karny ke sath sath url ko bhi fetch kar raha tha isi liye pehlli dfa updatNews() ke chalty hi page + 1 kar diya aur fetchMoreData() main url fetch karny ke baad page + 1 kardiya taky next time ke liye new page render ho
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page}&apiKey=afa0a852bbfd4ca181b08e4a40118d89&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let paresdData = await data.json();
    setArticles(articles.concat(paresdData.articles));
    setTotalRes(paresdData.totalResults);
    setLoading(false)
    setPage(page + 1);
  };
  // handleNextClick = async () => {
  //   if (state.page + 1 <= Math.ceil(state.totalResults / props.pageSize)) {
  //     this.setState({ page: state.page + 1 });
  //     this.updateNews();
  //   }
  //   else { }
  // }
  // handlePrevClick = async () => {
  //   this.setState({ page: state.page - 1 });
  //   this.updateNews();
  // }
    return (
      <>
        <h2 className='text-center my-3'>News Monkey - Top {props.category} Headlines</h2>
        {/* {state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} time={element.publishedAt} author={element.author} />
              })
              }
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-2">
          <button disabled={state.page <= 1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={state.page + 1 > Math.ceil(state.totalResults / props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
}

News.defaultProps = { // functionName.defaultProps in functional component
  country: "us",
  pageSize: 9,
  category: "general"
}

News.propTypes = {   // functionName.proptypes in functional component
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News;