import React, { useEffect, useState } from "react";
import css from './DiaryPage.module.css';
import DiaryAddProductForm from "../../components/DiaryAddProductForm​/DiaryAddProductForm​";
import DiaryProductsList from "../../components/DiaryProductsList/DiaryProductsList";

import { fetchAllProducts } from "../../redux/diary/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectconsumedProductsError, selectDiary, selectIsLoading } from "../../redux/diary/selectors";
import Spinner from "../../components/Spinner/Spinner";
import DiaryDateСalendar from "../../components/DiaryDateСalendar/DiaryDateСalendar";


const DiaryPage = () => {
    
    const consumedProducts = useSelector(selectDiary);
    console.log('consumed products:', consumedProducts);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectconsumedProductsError);
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
  
    useEffect(() => {
        const dateString = selectedDate.toISOString().split('T')[0];
    
      
        dispatch(fetchAllProducts({ date: dateString }));
    }, [selectedDate, dispatch]);
  
    const handleDateChange = (event) => {
        setSelectedDate(new Date(event.target.value));
    };
  
    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <p>Error: {error}</p>
    }
    return (
        <div className={css.wrapper}>
            <DiaryDateСalendar selectedDate={selectedDate} handleDateChange={handleDateChange} />
            <DiaryAddProductForm />
      
            {consumedProducts &&
                <DiaryProductsList consumedProducts={consumedProducts} selectedDate={selectedDate} />
            }
        </div>
    )
};

export default DiaryPage;