import React from 'react';

import styles from './styles.module.css';

interface SelectInputProps {
    bg?: string,
    children: React.ReactNode;
    handleChangeSelectInput: (event: React.ChangeEvent<HTMLSelectElement>, index:number) => void,
    inputName: string
    index?:number
}
function SelectInput({children, handleChangeSelectInput, inputName, bg, index}: SelectInputProps) {
    return (
        <label className={styles.select_wrapper} htmlFor={inputName} style={{background: bg}}>
            <select className={styles.select} name={inputName} id={inputName} onChange={(e) => handleChangeSelectInput(e,index)}>
                    {children}
            </select>
        </label>
    );
}

export default SelectInput;