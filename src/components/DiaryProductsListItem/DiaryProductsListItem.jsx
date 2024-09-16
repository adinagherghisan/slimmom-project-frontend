import React from "react";
import css from './DiaryProductsListItem.module.css';


const DiaryProductsListItem = ({ product, onDelete }) => {
    const { productId, product_weight, product_Calories } = product;
    return (
        <div className={css.productItem}>
            <h4>{productId.title}</h4>
            <p> {product_weight}g</p>
            <p> {product_Calories} kcal</p>
            <button type="button" onClick={onDelete} className={css.btnDelete}>
                X
            </button>
        </div>
    );
};
export default DiaryProductsListItem;