import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNSimilarity, fetchModel} from '../actions';
import TSNE from './T-SNE';

class Results extends Component {

  componentDidMount() {
    this.props.fetchNSimilarity(['love', 'woman']);
    this.props.fetchModel();
  }

  returnLabels() {
    return this.props.model.tokens;
  }
  render() {
    return (
      <div className="row">
        <div className="graph-wrapper col-md-9 ml-sm-auto col-lg-9 pt-3 px-4">
          <TSNE />
        </div>
        <div className="results-wrapper col-md-3 pt-3 px-4">
            Similarity between <strong>{this.props.words[0]}</strong> and <strong>{this.props.words[1]}</strong> is {this.props.results.similarity}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    results: state.results,
    words: state.words,
    model: state.model
  };
};

export default connect(
  mapStateToProps,
  { fetchNSimilarity, fetchModel }
)(Results);