import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchModel } from '../actions';
import tsneplot from 'tsne-js';
import {ScatterPlot} from 'react-d3-components';

class TSNE extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    this.state = {
      data: [
        {
          label: 'somethingA',
          values: [{x: 0, y: 2}]
        }
      ],
      tokens: []
    }

    this.state.model = new tsneplot({
      dim: 2,
      perplexity: 30.0,
      earlyExaggeration: 4.0,
      learningRate: 100.0,
      nIter: 1000,
      metric: 'euclidean'
    });
  }

  componentDidMount() {
    this.props.fetchModel();
  }

  randomNumber() {
    return Math.random() * (40 - 0) + 0;
  }

  componentDidUpdate(prevProps, prevState) {

      let objectify = a => a.map(el => {
          var rObj = {};
          rObj['x'] = el[0];
          rObj['y'] = el[1];
          return rObj;
      });
      // only update chart if the data has changed
      if (prevProps.model.tokens !== this.props.model.tokens) {
          this.state.model.init({
              data: this.props.model.tokens,
              type: 'dense'
          });
          let [error, iter] = this.state.model.run();

          let tsneOutput = objectify(this.state.model.getOutput());
          this.setState({
              data: [{
                  label: 'somethingA',
                  values: tsneOutput
              }]
          });
      }
  }

  render() {
    return(
     <div>
      <div id="tsne-plot">    
      <ScatterPlot
                data={this.state.data}
                width={400}
                height={400}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
     </div>
    </div>
      );
  }
}

const mapStateToProps = state => {
  return { 
    model: state.model};
};


export default connect(
  mapStateToProps,
  { fetchModel }
)(TSNE);
