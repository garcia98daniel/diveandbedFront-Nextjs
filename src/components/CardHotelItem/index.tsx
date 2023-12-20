import React from 'react';
import Image from "next/image";

//components
import {Icon} from "semantic-ui-react";

//styles
import styles from "./styles.module.css";

interface CardProps{
    imgUrl : string,
    title: string,
    price: number,
    bed: number,
    bathroom: number,
    space: number,
}

function CardHotelItem({imgUrl, title, price, bed, bathroom, space}: CardProps) {
    return (
        <div className={styles.card}>

             <div className={styles.card_img}>
                <Image src={imgUrl ? imgUrl : 'https://react.semantic-ui.com/images/wireframe/image.png'} layout="fill"  objectFit="cover"/>
             </div>

            <h3 className={styles.card_title}>{title}</h3>
            
            <div className={styles.card_details}>
                <div>
                    <div className={styles.card_detail_img_conatiner}>
                        <Image src={"/images/bed.svg"} layout="fill"  objectFit="contain"/>
                    </div>
                        <small>{bed}</small>
                </div>
                <div>
                    <div className={styles.card_detail_img_conatiner}>
                        <Image src={"/images/bath.svg"} layout="fill"  objectFit="contain"/>
                    </div>
                        <small>{bathroom}</small>
                </div>
                <div>
                    <div className={styles.card_detail_img_conatiner}>
                        <Image src={"/images/space.svg"} layout="fill"  objectFit="contain"/>
                    </div>
                        <small>{space}</small>
                </div>
            </div>

            <div className={styles.card_title}>
                <h1>${price}/</h1> noche
            </div>
        </div>
    );
}

export default CardHotelItem;