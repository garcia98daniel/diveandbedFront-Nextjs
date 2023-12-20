import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toggleRoomsModal } from '../../redux/lodgingPage/actions';

import styles from "./styles.module.css";

interface ServiceCheckOutCardProps{
    lodging_id: string,
    lodging_name: string,
    lodging_rate: string,
    lodging_room_name:string,
    lodging_img: string,
    startDate: string,
    endDate: string,
    price_per_pax: number,

    pax: {
        name:string,
        email:string,
        tel:string,
        experience:number,
        language:string,
    }[],
}

function LodgingCheckOutCard({
    lodging_id,
    lodging_name,
    lodging_rate,
    lodging_room_name,
    lodging_img,
    startDate,
    endDate,
    price_per_pax,
    pax,
}:ServiceCheckOutCardProps){
    const dispatch = useDispatch();
    const [t, i18n] = useTranslation("global"); 

    return (
        <div className={styles.card}>
            <div className={styles.img_container}>
                <Image src={lodging_img ? lodging_img : "/images/checkout.jpg"} layout="fill"  objectFit="cover"/>
            </div>

            <div className={styles.body_card}
            >
                <h2>{lodging_name}</h2>
                <div className={styles.star_container}>
                    <div className={styles.star_logo}>
                        <Image src="/images/star.svg" layout="fill"  objectFit="contain"/>
                    </div>
                    <p>{lodging_rate}</p>
                </div>

                <div className={styles.row} onClick={() => dispatch(toggleRoomsModal(true))}>
                    <p>{lodging_room_name}</p>
                    <p>{t("common.edit_txt")}</p>
                </div>

                <div className={styles.row} onClick={() => dispatch(toggleRoomsModal(true))}>
                    <p>{pax?.length} {t("hotelCheckOut.people_txt")}</p>
                    <p>{t("common.edit_txt")}</p>
                </div>

                <div className={styles.row} onClick={() => dispatch(toggleRoomsModal(true))}>
                    <p>{t("hotelCheckOut.from_txt")} {startDate} {t("hotelCheckOut.until_txt")} {endDate}</p>
                    <p>{t("common.edit_txt")}</p>
                </div>

                <div className={styles.line}></div>

                <h3>{t("hotelCheckOut.price_txt")}</h3>
                <p>
                    {t("hotelCheckOut.payment_info_txt")}
                </p>

                <div className={styles.row}>
                    <p>${price_per_pax} x {pax?.length} {t("hotelCheckOut.people_txt")}</p>
                    <p>${pax?.length * price_per_pax}</p>
                </div>

                <div className={styles.row}>
                    <h3>{t("hotelCheckOut.amount_payment_txt")}</h3>
                    <p>${pax?.length * price_per_pax}</p>
                </div>
            </div>

            
        </div>
    );
}

export default LodgingCheckOutCard;