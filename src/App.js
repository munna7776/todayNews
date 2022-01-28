import React, { Component } from 'react';
import  Navbar  from './components/Navbar'
// import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import News2 from './components/News2'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export class App extends Component {
  constructor(){
    super();
    this.state={
      progress:0
    }
  }
  pageSize = 6;
  country = 'in';
  apiKey = process.env.REACT_APP_NEWS_API
  setProgress=(progress)=>{
      this.setState({
        progress:progress
      })
  }
  render() {
    return (
        <div>
          <Router >
            <Navbar />
            <LoadingBar color='#f11946' progress={this.state.progress}/>
            {/* 
              if you want the previous and next button to paginate the results then use News componenet otherwise use News2
              component which has infinite scroll features.
              <News pageSize={5} setProgress={this.setProgress}/>
              
            */}
            <Switch>
              <Route exact path="/">
                <News2 key="general" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country}  setProgress={this.setProgress} category="general"/>
              </Route>
              <Route exact path="/business">
                <News2 key="business" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country}  setProgress={this.setProgress} category="business"/>
              </Route>
              <Route exact path="/entertainment">
                <News2 key="entertainment" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country}  setProgress={this.setProgress} category="entertainment"/>
              </Route>
              <Route exact path="/health">
                <News2 key="health" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country}  setProgress={this.setProgress} category="health"/>
              </Route>
              <Route exact path="/science">
                <News2 key="science" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country}  setProgress={this.setProgress} category="science"/>
              </Route>
              <Route exact path="/sports">
                <News2 key="sports" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country}  setProgress={this.setProgress} category="sports"/>
              </Route>
              <Route exact path="/technology">
                <News2 key="technology" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country}  setProgress={this.setProgress} category="technology"/>
              </Route>
            </Switch>
            </Router>
        </div>
    )
  }
}

export default App;

