import * as Yup from 'yup';

export const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Name field is required"),
    description: Yup.string().required("Description field is required"),
    stocks: Yup.number().required("Stocks field is required"),
    price: Yup.number().required("Price field is required"),
    // image: Yup.array().required("Image field is required"),
});
