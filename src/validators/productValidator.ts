// import yup from 'yup';
const yup = require('yup');

export const productValidationSchema = yup.object().shape({
	name: yup
		.string()
		.required('Please enter a product name.')
		.min(3, 'Product name should be at least 3 characters long.')
		.max(100, 'Product name should not be more than 100 characters long.'),
});

