import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

const ExpirationDate = () => {
    const [date, setDate] = useState({
        startDate: null,
        endDate: null
    });

    const handleDateChange = (newDate) => {
        console.log('newDate:', newDate);
        setDate(newDate);
    }

    return (
        <Datepicker
            primaryColor={"green"}
            placeholder={'Expiration date'}
            asSingle={true}
            value={date}
            onChange={handleDateChange}
            showShortcuts={true}
        />
    )
}

export default ExpirationDate;
