import React, { useState, useEffect } from "react";
import css from './DiaryAddProductForm​.module.css'; 
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, fetchDiaryConsumed } from "../../redux/diary/operations";
import { fetchSearchProducts } from "../../redux/searchProducts/operations";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import add_btn from '../../svg/add_btn.png';
import { selectorSearchProducts } from "../../redux/searchProducts/selector";

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const DiaryAddProductForm = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectorSearchProducts);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearchQuery) {
            dispatch(fetchSearchProducts({ query: debouncedSearchQuery }));
        }
    }, [debouncedSearchQuery, dispatch]);

    

    const handleAddProduct = async (values, { resetForm }) => {
    if (selectedProduct && values.productWeight) {
        // Adăugarea produsului
        await dispatch(fetchDiaryConsumed({ productId: selectedProduct._id, product_weight: values.productWeight }));
        
        // Reîmprospătarea listei de produse consumate
        const dateString = new Date().toISOString().split('T')[0]; 
        dispatch(fetchAllProducts({ date: dateString }));
        
        resetForm(); 
        setSelectedProduct(null); 
        setSearchQuery(""); 
    }
};

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setSearchQuery(product.title);
    }; 

    return (
        <div>
            {/* Formular pentru căutarea produsului */}
            <Formik
                initialValues={{ productQuery: searchQuery, productWeight: "" }}
                validationSchema={Yup.object({
                    productQuery: Yup.string().required('Enter a product name'),
                    productWeight: Yup.number()
                        .typeError('Weight must be a number')
                        .positive('Weight must be greater than zero')
                        .required('Product weight is required'),
                })}
                onSubmit={handleAddProduct}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <div className={css.FieldGroup}>
                            <Field
                                type="text"
                                name="productQuery"
                                placeholder="Enter product name"
                                className={css.inputField}
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setFieldValue("productQuery", e.target.value); 
                                }}
                            />
                            <ErrorMessage name="productQuery" component="div" className={css.error} />
                        </div>

                        {/* Afișare rezultate dinamic */}
                        {products && products.length > 0 && searchQuery && (
                            <div className={css.results}>
                                <ul>
                                    {products.map(product => (
                                        <li
                                            key={product._id}
                                            onClick={() => handleSelectProduct(product)}
                                            className={selectedProduct?._id === product._id ? css.selected : ''}
                                        >
                                            {product.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Formular pentru adăugarea produsului selectat */}
                        <div>
                            <Field
                                type="number"
                                name="productWeight"
                                placeholder="Grams"
                                className={css.inputField}
                            />
                            <ErrorMessage name="productWeight" component="div" className={css.error} />
                        </div>

                        <div className={css.FieldGroup}>
                            <button type="submit" disabled={isSubmitting || !selectedProduct}>
                                <img src={add_btn} alt="Add product" />
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DiaryAddProductForm;
