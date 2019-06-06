import React from 'react';
import {FormGroup, Label, Col, FormFeedback, Input} from 'reactstrap';
import PropTypes from 'prop-types';


const FormElement = props => {
	return (
		<FormGroup row>
			<Label for='username'>{props.title}</Label>
			<Col sm={10}>
				<Input
					type={props.type}
					name={props.name}
					value={props.value}
					placeholder={props.placeholder}
					onChange={props.onChange}
					invalid={!!props.error}
					required={props.required}

				/>
				{props.error &&
				(<FormFeedback>
					{props.error}
				</FormFeedback>)
				}

			</Col>
		</FormGroup>
	);
};


export default FormElement;

FormElement.propTypes = {
	name: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	required: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string,
};
