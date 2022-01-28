import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News2 extends Component {
  static defaultProps = {
    country: 'in',
    pageSize:5,
    category:'general'
  }
  static propTypes = {
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
  }

    constructor(props){
        super(props);
        this.state={
          articles:[],
          page:1,
          totalResults:0,
          loading:true
        }
      }


      



      async componentDidMount(){
        this.props.setProgress(30);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=6bbde6f04cc5455790c25f85b159ac1e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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

     fetchMoreData = async()=>{
        this.setState({page:this.state.page+1})
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=6bbde6f04cc5455790c25f85b159ac1e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults
        })
     }

  render() {
    return (
        <>
          <div>
              <h2 className="text-center my-2">News Today - Top Headlines</h2>
              {this.state.loading && <Spinner />}
              <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element)=>{
                            return   <div className="col-md-4 mt-3"  key={element.url}>
                                    <NewsItem title={element.title?element.title:''}  description={element.description} imageUrl={element.urlToImage} 
                                        author={!element.author?"Unknown":element.author} publishedAt={new Date(element.publishedAt).toUTCString()}
                                        url={element.url} source = {element.source.name}
                                        />
                                </div>
                        })}
                    </div>
                </div>
              </InfiniteScroll>
          </div>
        </>
    )
    }
}

export default News2;
