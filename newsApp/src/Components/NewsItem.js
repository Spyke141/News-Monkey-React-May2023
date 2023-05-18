import React from "react";

const NewsItem =(props) => {
  
    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    return (
      <div className="my-3">
        <div className="card" style={{ height: "30rem" }}>
          <span
            className="position-relative top-0 start-80 translate-middle badge bg-danger"
            style={{ left: "83%", zIndex: "1", width: "40%" }}
          >
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img
            src={
              !imageUrl
                ? "http://thumbs.dreamstime.com/b/business-news-concept-tablet-pc-19301952.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <div className="card-footer my-2">
              <small className="text-danger">
                By {author} on {new Date(date).toGMTString()}{" "}
              </small>
            </div>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
