import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {
  constructor(props){
    super(props);
    this.state={
      articles:[],
      page:1,
      totalResults:0,
      loading:false
    }
  }
  
  async componentDidMount(){
     this.setState({loading:true})
     this.props.setProgress(30);
     const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=6bbde6f04cc5455790c25f85b159ac1e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
     let data = await fetch(url);
     this.props.setProgress(60);
     let parsedData = await data.json();
     this.props.setProgress(90);
     this.setState({
       articles:parsedData.articles,
       totalResults:parsedData.totalResults,
       loading:false
     })
     this.props.setProgress(100);
  }
  handleNextClick = async()=>{
      this.setState({loading:true})
      this.props.setProgress(30);
      const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=6bbde6f04cc5455790c25f85b159ac1e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      this.props.setProgress(60);
      let parsedData = await data.json();
      this.props.setProgress(90);
      this.setState({
        articles:parsedData.articles,
        page:this.state.page+1,
        loading:false
      })
      this.props.setProgress(100);
  }
  handlePrevClick = async()=>{
    this.setState({loading:true})
    this.props.setProgress(30);
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=6bbde6f04cc5455790c25f85b159ac1e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
     let data = await fetch(url);
     this.props.setProgress(60);
    let parsedData = await data.json();
    this.props.setProgress(90);
    this.setState({
      articles:parsedData.articles,
      page:this.state.page-1,
      loading:false
    })
    this.props.setProgress(100);
  }
  render() {
    return (
        <>
          <div className="container">
              <h2 className="text-center my-2">News Today - Top Headlines</h2>
              {this.state.loading && <Spinner />}
              <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                 return   <div className="col-md-4 mt-3"  key={element.url}>
                              <NewsItem title={element.title}  description={element.description} imageUrl={element.urlToImage} 
                                author={!element.author?"Unknown":element.author} publishedAt={new Date(element.publishedAt).toUTCString()}
                                url={element.url}
                          />
                          </div>
                })}
              </div>
              <div className="d-flex my-2 justify-content-between">
                  <button disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                  <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
              </div>
          </div>
        </>
    )
  }
}

export default News;
