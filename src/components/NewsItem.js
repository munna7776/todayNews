import React, { Component } from 'react';


export class NewsItem extends Component {
  render() {
      let {title,description,imageUrl,publishedAt,author,url,source}=this.props;
    return (
            <div className="card h-100">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left:'92%',zIndex:'1' }}>
                {source}</span>
                <img src={imageUrl?imageUrl:"https://nypost.com/wp-content/uploads/sites/2/2022/01/st-patricks-jason-rivera.png?w=1024"} 
                    className="card-img-top" alt="..." style={{ height:'13.5rem' }} 
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author} at {publishedAt}</small></p>
                </div>
                <div className="ms-3">
                    <a href={url} rel="noreferrer" target={"_blank"} className="btn btn-sm btn-dark mb-2" style={{ paddingTop:"0.2rem",paddingBottom:"0.2rem" }}>Read more</a>
                </div>
            </div>
    )
  }
}

export default NewsItem;
