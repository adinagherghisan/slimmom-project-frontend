import React from 'react';
import css from './MainPage.module.css';
import DailyCaloriesForm from 'components/DailyCaloriesForm/DailyCaloriesForm';

const MainPage = () => {
  return (
    <div className={css.mainPage}>
      <div className={css.containerMainPage}>
        <h1 className={css.title}>Calculate your daily calorie intake right now</h1>
        <DailyCaloriesForm />
      </div>
    </div>
    
  );
};

export default MainPage;