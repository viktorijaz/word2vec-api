import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchImages, fetchImage, fetchNSimilarity } from '../actions';


class Query extends Component {
  componentDidMount() {
    //this.props.fetchImages();
  }

  state = { word1: '', word2: '' };

  onInputChange = event => {
    this.setState({ word1: event.target.value });
  };

  onInputChange2 = event => {
    this.setState({ word2: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    //this.props.onFormSubmit(this.state.term);
    this.props.fetchNSimilarity([this.state.word1, this.state.word2])
  };

  render() {
    return (
      <div className = "sidebar-sticky">
        <form onSubmit={this.onFormSubmit} >
          <div className = "form-group">
            <label htmlFor="exampleInputEmail1">First word</label>
            <input className="form-control" 
                   id="firstWord" 
                   aria-describedby="emailHelp" 
                   placeholder="Enter query word"
                   value={this.state.word1}
                   onChange={this.onInputChange} />           
          </div>
          <div className = "form-group">
            <label htmlFor ="exampleInputPassword1">Second word</label>
            <input  className = "form-control" 
                    id="secondWord" 
                    placeholder="Second word"
                    value={this.state.word2}
                    onChange={this.onInputChange2} />
          </div>
          <button type="submit" className = "btn btn-primary">Submit</button>
        </form>
      </div>
      );
  }
}

const mapStateToProps = state => {
  return { 
    images: state.images};
};

export default connect(
  mapStateToProps,
  { fetchImages, fetchImage, fetchNSimilarity }
)(Query);