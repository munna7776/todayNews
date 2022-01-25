import React, { Component } from 'react';
import  Navbar  from './components/Navbar'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  constructor(){
    super();
    this.state={
      progress:0
    }
  }
  
  setProgress=(progress)=>{
      this.setState({
        progress:progress
      })
  }
  render() {
    return (
        <div>
            <Navbar />
            <LoadingBar color='#f11946' progress={this.state.progress}/>
            <News pageSize={5} setProgress={this.setProgress}/>
        </div>
    )
  }
}

export default App;

