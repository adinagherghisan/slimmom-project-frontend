import React from "react";
import css from './Modal.module.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorRecommendations } from "../../redux/recommendations/selectors";
import { useAuth } from "../../hooks/useAuth";

const Modal = ({ closeModal}) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const handleRedirect = () => {
          if (isLoggedIn) {
            navigate('/diary');
        } else {
            navigate('/login');
        }
    }

    const products = useSelector(selectorRecommendations)
    console.log("Forbbiden products:", products);

    return (
        <div className={css.overlay} onClick={closeModal}>
            <div className={css.content} onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={closeModal} className={css.closeModal}>X</button>
                <div className={css.containerContent}>
                    <h2 className={css.title}> Your recommended daily calorie intake is</h2> 
                    <div>
                        <p  className={css.dailyCalories}>{products.dailyCalories} kal</p>
                        <hr/>
                        <h4 className={css.text}>Foods you should not eat</h4>
                        <ol className={css.orderList}>
                        {products.forbiddenProducts.length > 0 ? (
                            products.forbiddenProducts.map(product => (
                                <li key={product._id}>
                                    {product.title}
                                </li>
                            ))
                        ) : (
                            <li>No forbidden products found.</li>
                        )}
                    </ol>
                    </div>
                    <div className={css.btn}>
                        <button className={css.btnCancel} onClick={handleRedirect}>Start losing weight</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
export default Modal;