import React from "react";
import css from './CalculatorPage.module.css';
import CalculatorCalorieForm  from '../../components/CalculatorСalorieForm/CalculatorСalorieForm'
const CalculatorPage = () => {
    return (
        <div className={css.calcPage}>
            <div className={css.containerCalcPage}>
                <h1 className={css.title}>Calculate your daily calorie intake right now</h1>
                <CalculatorCalorieForm />
            </div>
        </div>
    
    );
};

export default CalculatorPage;