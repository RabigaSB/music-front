import React from 'react';
import config from '../../config';
import defaultPicture from '../../assets/images/image_not_available.png';

const ProductThumbnail = props => {
	let image = defaultPicture;

	if (props.image) {
		image = config.apiURL + '/uploads/' + props.image;
	}

	return <img width="100" height="100" src={image} alt={props.image}/>
};

export default ProductThumbnail;
