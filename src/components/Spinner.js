import React, { Component } from 'react';
import loading from './loading.gif';

export class Spinner extends Component {
  render() {
    return(
        <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
            <img src={loading} alt="loading..." />
        </div>
    )
  }
}

export default Spinner;
