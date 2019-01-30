import React from 'react';
import ImageList from './ImageList';
import ImageDetail from './ImageDetail';
import Query from './Query';
import Results from './Results';

const App = () => {
  return (
    <div className="container-fluid">
        <div className = "row">
          <nav className = "col-md-2 d-none d-md-block bg-light sidebar">
            < Query />
          </nav>
          <main role="main" className = "main-content bg-prime col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <Results />
          </main>
        </div>

     </div>
  );
};

/*
const App = () => {
  return (
    <div className="d-flex justify-content-center">
        <div className="col-md-6 p-0 box-shadow">
          <div className="card card-h">
            <div className="card-header">
              Choose from a l ist of images
            </div>
            <div className="card-body p-4 flex-md-row">
              <ImageList />
            </div>
            </div>
        </div>
        <div className="col-md-6 p-0  pulled-down">
            <ImageDetail />
        </div>
     </div>
  );
};
*/
export default App;