import React from "react";
import css from './DiaryDateСalendar.module.css'

const DiaryDateСalendar = ({selectedDate, handleDateChange}) => {
    return (
        <div className={css.datePicker}>
            <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
            />
        </div>
    )
};

export default DiaryDateСalendar;