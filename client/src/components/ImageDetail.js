import React from 'react';
import { connect } from 'react-redux';

const ImageDetail = ({ image }) => {
  let header;
  let main = '';
  if (!image) {
    header = <div>Select an image</div>;
  } else {
    header = <div>Select an image</div>;
    main = <p>
        The class for this image is {image.image}
      </p>;
  }

  return (
    <div className="card bg-blue card-h text-wh text-center">
      <div className="card-header">{header}</div>
      {main}
    </div>
  );
};

const mapStateToProps = state => {
  return { image: state.selectedImage };
};

export default connect(mapStateToProps)(ImageDetail);