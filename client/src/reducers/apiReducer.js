import {
  FETCH_IMAGE,
  FETCH_IMAGES,
  FETCH_N_SIMILARITY,
  FETCH_WORDS,
  FETCH_MODEL
} from '../actions/types';

export const imageReducer = (state = [], action) => {
  if (action.type === FETCH_IMAGES) {
    return [ ...action.payload.images ];
  }
  return state;
};

export const selectedImageReducer = (selectedImage = null, action) => {
  if (action.type === FETCH_IMAGE) {
    return action.payload;
  }
  return selectedImage;
};

export const nSimilarityReducer = (similarity = {}, action) => {
  if (action.type === FETCH_N_SIMILARITY) {
    return action.payload;
  }
  return similarity;
};

export const queryWordsReducer = (similarity = {}, action) => {
  if (action.type === FETCH_N_SIMILARITY) {
    return action.payload;
  }
  return similarity;
};

export const setWordsReducer = (words=[], action) => {
  if (action.type === FETCH_WORDS) {
    return [ ...action.payload.words ];
  }
  return words;
};

export const getModelReducer = (model = {"tokens":""}, action) => {
  if (action.type === FETCH_MODEL) {
    return JSON.parse(action.payload);
  }
  return model;
};