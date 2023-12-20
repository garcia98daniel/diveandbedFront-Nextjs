import React from 'react';
import Image from "next/image";

import styles from "./styles.module.css";
interface CertificationProps {
    name:string,
}
function Certification({name} : CertificationProps) {
    return (
        <div className={styles.certification}>
            
            <div className={styles.check_img_container}>
                <Image src={"/images/check.svg"} layout="fill" object-fit="contain"/>
            </div>

            <p>{name}</p>
        </div>
    );
}

export default Certification;