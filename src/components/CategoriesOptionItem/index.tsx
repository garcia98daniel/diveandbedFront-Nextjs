import React from 'react';
import Image from "next/image";

//styles
import styles from './styles.module.css';

interface CategoriesOptionItemProps{
    urlIcon: string,
    name: string,
    handleClick: () => void,
}

function CategoriesOptionItem({urlIcon, name, handleClick}: CategoriesOptionItemProps){
    return (
        <div className={styles.category} onClick={handleClick}>
            <div className={styles.icon_container}>
                <Image src={urlIcon} layout="fill" objectFit="contain"/>
            </div>
            <p>{name}</p>
        </div>
    );
}

export default CategoriesOptionItem;