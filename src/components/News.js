import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
  constructor(props){
    super(props);
    this.state={
      articles:[],
      page:1,
      totalResults:0
    }
  }
  async componentDidMount(){
     let data = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=6bbde6f04cc5455790c25f85b159ac1e&page=${this.state.page}&pageSize=${this.props.pageSize}`);
     let parsedData = await data.json();
    //  console.log(parsedData);
     this.setState({
       articles:parsedData.articles,
       totalResults:parsedData.totalResults
     })
  }
  handleNextClick = async()=>{
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/5))){
      let data = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=6bbde6f04cc5455790c25f85b159ac1e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`);
      let parsedData = await data.json();
      // console.log(parsedData);
      this.setState({
        articles:parsedData.articles,
        page:this.state.page+1
      })
    }
  }
    handlePrevClick = async()=>{
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=6bbde6f04cc5455790c25f85b159ac1e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`);
     let parsedData = await data.json();
    //  console.log(parsedData);
     this.setState({
       articles:parsedData.articles,
       page:this.state.page-1
     })
  }
  render() {
    return (
        <>
          <div className="container">
              <h2 className="text-center my-2">News Today - Top Headlines</h2>
              <div className="row">
                {this.state.articles.map((element)=>{

                 return   <div className="col-md-4 mt-3"  key={element.url}>
                              <NewsItem title={element.title}  description={element.description} imageUrl={element.urlToImage} 
                                author={!element.author?"Unknown":element.author} publishedAt={new Date(element.publishedAt).toUTCString()}
                                url={element.url}
                          />
                          </div>
                })}
              </div>
              <div className="d-flex my-2 justify-content-between">
                  <button disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Prev</button>
                  <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/5)} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
              </div>
          </div>
        </>
    )
  }
}

export default News;