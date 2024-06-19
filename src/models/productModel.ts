import { Schema, model } from 'mongoose';

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		imageUrl: {
			type: String,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Product = model('Product', productSchema);
export { Product };
