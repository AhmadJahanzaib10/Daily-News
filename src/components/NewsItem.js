import React from 'react';

const NewsItem = (props) => {
    let {title, description, imgUrl, newsUrl, time , author} = props;
    return (
      <>
            <div className="card mb-3 col-lg-4 ">
              <img src={imgUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{description}</p>
                  <p className="card-text"><small className='txt-muted'>By {!author?"Unknown":author} on {new Date(time).toGMTString()}</small></p>
                  <a  href={newsUrl} target="_blank" className="btn btn-primary ">Read More</a>
                </div>
            </div>
      </>
    )
}
export default NewsItem;
