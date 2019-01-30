import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchImages, fetchImage } from '../actions';


class ImageList extends Component {
  componentDidMount() {
    this.props.fetchImages();
  }
  renderList() {
    return this.props.images.map(image => {
      return (
        <div className="p-1">
          <div key={image.id_key}>
              <div className="column">
                <img src={image.url} alt={image.title}
                 onClick={() => this.props.fetchImage(image.id_key)} />
              </div>
              <div className="item">
                <div className="right floated content">
                </div>
              </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className = "ui middle aligned center aligned">
        <div className="doubling ui grid">{this.renderList()}
        </div>
      </div>);
  }
}

const mapStateToProps = state => {
  return { 
    images: state.images};
};

export default connect(
  mapStateToProps,
  { fetchImages, fetchImage }
)(ImageList);