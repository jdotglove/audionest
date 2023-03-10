import React from 'react';
import {
  RecommendationProviderState,
  SpotifyProviderProps,
} from '../../types';
import RecommendationContext from '../contexts/RecommendationContext';
// import * as tf from '@tensorflow/tfjs-node';
// import { 
//   input as tensorInput,
//   layers as tensorLayers,
//   model as tensorModel,
//   randomNormal,
//   randomUniform,
//   SymbolicTensor,
// } from '@tensorflow/tfjs-node';

class RecommendationProvider extends React.Component<
SpotifyProviderProps,
RecommendationProviderState
> {
  constructor(props) {
    super(props);
    this.state = {
      recommendations: '',
    };
  }
  setRecommendationData = () => {
    // Create an arbitrary graph of layers, by connecting them
    // via the apply() method.
    // const input = tf.input({ shape: [784] });
    // const dense1 = tf.layers.dense({ units: 32, activation: 'relu' }).apply(input);
    // const dense2 = tf.layers.dense({ units: 10, activation: 'softmax' }).apply(dense1);
    // const model = tf.model({ inputs: input, outputs: dense2 as tf.SymbolicTensor });
    // const data = tf.randomNormal([100, 784]);
    // const labels = tf.randomUniform([100, 10]);
    // function onBatchEnd(batch, logs) {
    //   console.log('Accuracy: ', logs.acc);
    //   console.log('Batch: ', batch);
    // }

    // model.fit(data, labels, {
    //   epochs: 5,
    //   batchSize: 32,
    //   callbacks: { onBatchEnd },
    // }).then(info => {
    //   console.log('Final accuracy', info.history.acc);
    // });
    // model.summary();
    // try {
   

    // } catch (err) {
    //   console.error('ERROR: Could not set chart data.', err);
    // }
  };

  render() {
    return (
      <RecommendationContext.Provider
        value={{
          recommendations: this.state.recommendations,
          setRecommendationData: this.setRecommendationData,
        }}
      >
        <div>{this.props.children}</div>
      </RecommendationContext.Provider>
    );
  }
}

export default RecommendationProvider;
