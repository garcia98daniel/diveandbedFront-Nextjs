import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { checkOutServiceToggleModal } from '../../redux/checkOutService/actions';
import moment from 'moment';

import styles from "./styles.module.css";

interface ServiceCheckOutCardProps{
    service_id: string,
    service_name: string,
    service_rate: string,
    service_img: string,
    date: string,
    price_per_pax: number,

    pax: {
        name:string,
        email:string,
        tel:string,
        experience:number,
        language:string,
    }[],
}

function ServiceCheckOutCard({
    service_id,
    service_name,
    service_rate,
    service_img,
    date,
    price_per_pax,
    pax,
}:ServiceCheckOutCardProps) {
    
    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <div className={styles.card}>
            <div className={styles.img_container}>
                <Image src={service_img ? service_img : "/images/checkout.jpg"} layout="fill"  objectFit="cover"/>
            </div>

            <div className={styles.body_card}
            >
                <h2>Conoce el arrecife de {service_name}</h2>
                <div className={styles.star_container}>
                    <div className={styles.star_logo}>
                        <Image src={"/images/star.svg"} layout="fill"  objectFit="contain"/>
                    </div>
                    <p>{service_rate}</p>
                </div>

                <div className={styles.row}>
                    <p>{pax?.length} personas</p>
                    <p onClick={() => dispatch(checkOutServiceToggleModal(true))}>Editar</p>
                </div>
                <div className={styles.row}>
                    <p>El {date}</p>
                    <p onClick={() => dispatch(checkOutServiceToggleModal(true))}>Editar</p>
                </div>

                <div className={styles.line}></div>

                <h3>Precio</h3>
                <p>
                    El pago de la actividad se realizará 
                    directamente en el centro de buceo
                </p>

                <div className={styles.row}>
                    <p>${price_per_pax} x {pax?.length} personas</p>
                    <p>{pax?.length * price_per_pax}</p>
                </div>

                <div className={styles.row}>
                    <h3>Total a pagar en el lugar</h3>
                    <p>{pax?.length * price_per_pax}</p>
                </div>
            </div>
        </div>
    );
}

export default ServiceCheckOutCard;