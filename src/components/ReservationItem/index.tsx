import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

interface ReservationItemProps{
    name: string,
    status: string,
    peopleQuantity: number,
    date: string,
    price: number | string,
}

function ReservationItem({name, status, peopleQuantity, date, price}:ReservationItemProps) {
    const [t, i18n] = useTranslation("global"); 

    return (
        <div className={styles.ReservationItem_container}>
            <div className={styles.img_container}>
                <Image src="/images/cardImg.png" layout="fill" object-fit="cover"/>
            </div>
            
            <div className={styles.info_reservation_container}>
                <h3>{name}</h3>
                <small className={status === "confirmed" ?  styles.status_confirmed : styles.status_pending}>
                    {status}
                </small>
                <p>{peopleQuantity} {t("reservations.people_txt")} • {date}</p>
                <h3>$ {price}</h3>
            </div>
        </div>
    );
}

export default ReservationItem;