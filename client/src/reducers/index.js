import { combineReducers } from 'redux';
import { imageReducer, selectedImageReducer, 
	     nSimilarityReducer, setWordsReducer, getModelReducer } from './apiReducer';

export default combineReducers({
  selectedImage: selectedImageReducer,
  images: imageReducer,
  results: nSimilarityReducer,
  words: setWordsReducer,
  model: getModelReducer
});
  