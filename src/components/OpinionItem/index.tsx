import React from 'react';
import Image from 'next/image';
//styles
import styles from './styles.module.css';

//components
import { Rating } from 'semantic-ui-react';

interface OpinionItemProps{
    userImg: string,
    userName: string,
    userOpinion: string,
    date: string,
    rate: number,
}
function OpinionItem({userImg, userName, userOpinion, date,rate}: OpinionItemProps) {
    return (
        <div className={styles.OpinionItem}>
            <div className={styles.user_OpinionItem_img_container}>
                <Image src={userImg} layout="fill" objectFit="contain"/>
            </div>
            <div className={styles.OpinionItem_info_container}>
                <h2>{userName}</h2>
                <div className={styles.rate_date_container}>
                    <Rating maxRating={5} rating={rate} />

                    <small>{date}</small>
                </div>
                <p>
                    {userOpinion}
                </p>
            </div>
        </div>
    );
}

export default OpinionItem;