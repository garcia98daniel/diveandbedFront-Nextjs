import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';

//styles
import styles from "./styles.module.css";

interface SubcategoryItemProps{
    urlIcon: string,
    name: string,
    id: string|number,
    selected:boolean,
    handleClick: (id: string|number) => void,
}

function SubcategoryItem({id, urlIcon, name, selected, handleClick}: SubcategoryItemProps) {
    
    return (
        <div className={selected ? styles.subcategory_active : styles.subcategory} onClick={() => handleClick(id)}>
            <div className={styles.icon_container}>
                <Image src={urlIcon} layout="fill" objectFit="contain"/>
            </div>
            <p>{name}</p>
        </div>
    );
}

export default SubcategoryItem;