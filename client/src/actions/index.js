import images from '../apis/images';
import word2vec from '../apis/word2vec';
import {
  FETCH_IMAGES,
  FETCH_IMAGE,
  FETCH_N_SIMILARITY,
  FETCH_WORDS,
  FETCH_MODEL
} from './types';

export const fetchImages = () => async dispatch => {
  const response = await images.get(`/images`);
  dispatch({ type: FETCH_IMAGES, payload: response.data });  
};

export const fetchImage = id => async dispatch => {
  const response = await images.get(`/images/${id}`);
  dispatch({ type: FETCH_IMAGE, payload: response.data });
};

export const fetchNSimilarity = ([word1, word2]) => async dispatch => {
  const response = await word2vec.get(`/n_similarity?ws1=${word1}&ws2=${word2}`);
  dispatch({ type: FETCH_N_SIMILARITY, payload: response.data });
  dispatch({ type: FETCH_WORDS, payload: {'words': [word1, word2]} });
};

export const fetchModel = () => async dispatch => {
  const response = await word2vec.get(`/get_model`);
  dispatch({ type: FETCH_MODEL, payload: response.data });  
};