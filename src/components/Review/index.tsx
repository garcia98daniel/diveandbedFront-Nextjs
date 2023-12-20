
import React from 'react';
import Image from 'next/image';
//styles
import styles from './styles.module.css';

interface ReviewProps{
    userImg: string,
    userName: string,
    userOpinion: string,
}

function Review({userImg, userName, userOpinion}: ReviewProps) {
    return (
        <div className={styles.review}>
            <div className={styles.user_review_img_container}>
                <Image src={userImg} layout="fill" objectFit="contain"/>
            </div>
            <div className={styles.review_info_container}>
                <h2>{userName}</h2>
                <div className={styles.user_review_user_say_img_container}>
                    <Image src={"/images/userSay.svg"} layout="fill" objectFit="cover"/>
                </div>
                <p>
                    {userOpinion}
                </p>
            </div>
        </div>
    );
}

export default Review;