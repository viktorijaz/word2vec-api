'''
Simple web service wrapping a Word2Vec as implemented in Gensim
Example call: curl http://127.0.0.1:5000/wor2vec/n_similarity/ws1=Sushi&ws1=Shop&ws2=Japanese&ws2=Restaurant
@TODO: Add more methods
@TODO: Add command line parameter: path to the trained model
@TODO: Add command line parameters: host and port
'''
from __future__ import print_function
from flask import Flask, request, jsonify
from flask_restful  import Resource, Api, reqparse
import gensim
from gensim.models.word2vec import Word2Vec as w
from gensim import utils, matutils
import numpy as np
from numpy import exp, dot, zeros, outer, random, dtype, get_include, float32 as REAL,\
     uint32, seterr, array, uint8, vstack, argsort, fromstring, sqrt, newaxis, ndarray, empty, sum as np_sum
import _pickle as cPickle
import argparse
import base64
import sys
from flask_cors import CORS
import json


import gensim.downloader as downloader

parser = reqparse.RequestParser()


def filter_words(words):
    if words is None:
        return
    return [word for word in words if word in word_vectors.vocab]


class N_Similarity(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('ws1', type=str, action='append')
        parser.add_argument('ws2', type=str, action='append')
        #parser.add_argument('ws1', type=str, required=True, help="Word set 1 cannot be blank!", action='append')
        #parser.add_argument('ws2', type=str, required=True, help="Word set 2 cannot be blank!", action='append')
        args = parser.parse_args()
        #result = word_vectors.most_similar(positive=['woman', 'king'], negative=['man'])
        #print("{}: {:.4f}".format(*result[0]))
       # print("{}: {:.4f}".format(*result[0]))
        #return args
        #sim =  word_vectors.n_similarity(['sushi', 'shop'], ['japanese', 'restaurant'])
        sim =  word_vectors.n_similarity([x.lower() for x in args['ws1']],[x.lower() for x in args['ws2']])
        print("{:.4f}".format(sim))
        return {'similarity': str(sim)}
        #return model.n_similarity(filter_words(args['ws1']),filter_words(args['ws2']))


class Similarity(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('w1', type=str, required=True, help="Word 1 cannot be blank!")
        parser.add_argument('w2', type=str, required=True, help="Word 2 cannot be blank!")
        args = parser.parse_args()
        return model.similarity(args['w1'], args['w2'])

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)
class GetModel(Resource):
    def get(self):
        labels = []
        tokens = []
        limit = 100
        for index,word in enumerate(word_vectors.wv.vocab):
            if index == limit:
                break
            tokens.append(word_vectors[word])
            labels.append(word)
        model_obj = {}
        model_obj['labels'] = labels
        model_obj['tokens'] = tokens
        json_dump = json.dumps(model_obj, cls=NumpyEncoder)
        return json_dump


class MostSimilar(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('positive', type=str, required=False, help="Positive words.", action='append')
        parser.add_argument('negative', type=str, required=False, help="Negative words.", action='append')
        parser.add_argument('topn', type=int, required=False, help="Number of results.")
        args = parser.parse_args()
        pos = filter_words(args.get('positive', []))
        neg = filter_words(args.get('negative', []))
        t = args.get('topn', 10)
        pos = [] if pos == None else pos
        neg = [] if neg == None else neg
        t = 10 if t == None else t
        print ("positive: " + str(pos) + " negative: " + str(neg) + " topn: " + str(t))
        try:
            res = model.most_similar_cosmul(positive=pos,negative=neg,topn=t)
            return res
        except e:
            print (e)
            print (res)


class Model(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('word', type=str, required=True, help="word to query.")
        args = parser.parse_args()
        try:
            res = model[args['word']]
            res = base64.b64encode(res)
            return res
        except requests.exceptions.RequestException as e:
            print (e)
            return

class ModelWordSet(Resource):
    def get(self):
        try:
            res = base64.b64encode(cPickle.dumps(set(model.index2word)))
            return res
        except e:
            print (e)
            return

app = Flask(__name__)
api = Api(app)
CORS(app)

@app.errorhandler(404)
def pageNotFound(error):
    return "page not found"

@app.errorhandler(500)
def raiseError(error):
    return error

if __name__ == '__main__':
    global model
    global word_vectors

    #----------- Parsing Arguments ---------------
    p = argparse.ArgumentParser()
    p.add_argument("--model", help="Path to the trained model")
    p.add_argument("--binary", help="Specifies the loaded model is binary")
    p.add_argument("--host", help="Host name (default: localhost)")
    p.add_argument("--port", help="Port (default: 5000)")
    p.add_argument("--path", help="Path (default: /word2vec)")
    args = p.parse_args()

    model_path = args.model if args.model else "./model.bin.gz"
    binary = True if args.binary else False
    host = args.host if args.host else "localhost"
    path = args.path if args.path else "/word2vec"
    port = int(args.port) if args.port else 5000
    if not args.model:
        print ("Usage: word2vec-apy.py --model path/to/the/model [--host host --port 1234]")
    #model = gensim.models.KeyedVectors.load_word2vec_format(model_path, binary=binary)
    word_vectors = downloader.load("glove-wiki-gigaword-100")  # load pre-trained word-vectors from gensim-data
    
    #print('result is ', result)
    api.add_resource(N_Similarity, path+'/n_similarity')
    api.add_resource(Similarity, path+'/similarity')
    api.add_resource(MostSimilar, path+'/most_similar')
    api.add_resource(Model, path+'/model')
    api.add_resource(ModelWordSet, '/word2vec/model_word_set')
    api.add_resource(GetModel, '/word2vec/get_model')
    app.run(host=host, port=port)
