import React from 'react';
import Image from "next/image";

//components
import {Icon} from "semantic-ui-react";

//styles
import styles from "./styles.module.css";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface CardProps{
    imgUrl : string,
    title: string,
    stars: number,
    price?: number,
    activities?: string | number,
    per_txt?: string,
    onClickGoTo?: string,
}

function Card({imgUrl, title, stars, price, activities, per_txt, onClickGoTo}: CardProps) {
  const [t, i18n] = useTranslation("global");

    return (
        <div className={styles.space_card_wrapper}>
            <Link href={onClickGoTo ? onClickGoTo : ""}>
                <div className={styles.card}>
                    <div className={styles.card_img}>
                        <Image src={imgUrl ? imgUrl : "/images/diverCard.jpeg"} layout="fill"  objectFit="cover"/>
                    </div>
                    <h3 className={styles.card_title}>{title}</h3>
                    <div className={styles.activities_and_stars_qualification_container}>
                        {activities && 
                            <small>{activities} {t("common.activities_txt")}</small>
                        }
                        <div className={styles.stars_qualification_container}>
                            {stars === -1 ?
                                <></>
                              :
                                <div className={styles.star_logo}>
                                    <Image src="/images/star.svg" layout="fill"  objectFit="contain"/>
                                </div>
                            }
                            {stars == 0 ?
                                <small>{t("common.no_rate_txt")}</small>
                              :
                                
                                stars !== -1 ? 
                                <small>{stars}</small>
                                :
                                <></>
                            }
                        </div>
                    </div>
                    {price && 
                        <h3 className={styles.card_title}>$ {price} {per_txt}</h3>
                    }
                </div>
            </Link>
        </div>
    );
}

export default Card;