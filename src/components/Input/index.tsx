import React from 'react';
//style
import styles from "./styles.module.css";

interface InputProps{
    labelName: string,
    inputType: string,
    handleChangeInput: (inputName:string, value: string, index?:number) => void,
    inputValue: any,
    inputName: string
    error?: string
    bg?: string,
    placeHolder?: string,
    index?: number,
    required?:boolean,
}

function Input({labelName, inputType, handleChangeInput, inputValue, inputName, error, bg, placeHolder, index, required} : InputProps) {
    return (
        <div className={styles.input_component}>
            <label htmlFor={labelName}>{labelName}</label>
            <div className={styles.input_container}  style={{background: bg}}>
                <input 
                className={styles.input_element} 
                id={labelName} type={inputType} 
                value={inputValue} 
                onChange={(e) => handleChangeInput(inputName, e.target.value, index)}
                placeholder={placeHolder}
                required={required}
                />
            </div>
            {true &&
                <small className={styles.error_input_message}>{error}</small>
            }
        </div>
    );
}

export default Input;