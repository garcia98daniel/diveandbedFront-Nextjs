import React, { useCallback } from 'react';

import styles from './styles.module.css';

interface InputDateProps{
    onDateChange : (key:string, value: string) => void;
    value : string
    name : string
}

function InputDate({onDateChange, value, name}: InputDateProps) {
    
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onDateChange(name, event.target.value);
    };

    return (
        <input onChange={(e) => handleDateChange(e)} 
        className={styles.input} id="meeting" type="date" value={value}/>
    );
}

export default InputDate;