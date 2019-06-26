import React from 'react';
import {FormGroup, Label, Col, FormFeedback, Input} from 'reactstrap';
import PropTypes from 'prop-types';


const FormElement = props => {
	let formControlChildren;

	if(props.type === "select" && props.options) {
		formControlChildren = props.options.map(option => {
			return <option value={option._id} key={option._id}>{option.name}</option>});

		formControlChildren.unshift(
			<option value="" key={1}  disabled selected>Please select {props.name}...</option>);
	}

	return (
		<FormGroup row>
			<Label for='username' className='col-sm-4'>{props.title}</Label>
			<Col sm={8}>
				<Input
					type={props.type}
					name={props.name}
					value={props.value}
					placeholder={props.placeholder}
					onChange={props.onChange}
					invalid={!!props.error}
					required={props.required}
					{...props}

				>
					{formControlChildren}
				</Input>

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
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.object)
};
