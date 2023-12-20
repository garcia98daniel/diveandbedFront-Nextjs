import React from 'react';

import styles from './styles.module.css';

interface CheckBoxProps{
    name: string,
    isChecked:boolean,
    handleCheck: (zone:string) => void
}
function CheckBox({name, isChecked, handleCheck}:CheckBoxProps) {
    return (
        <label className={styles.container}>{name}
            <input type="checkbox" checked={isChecked} onClick={() => handleCheck(name)}/>
            <span className={styles.checkmark}></span>
        </label>
    );
}

export default CheckBox;