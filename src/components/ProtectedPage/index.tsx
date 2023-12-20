import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from "./styles.module.css";
function ProtectedPage() {
    const [t, i18n] = useTranslation("global"); 

    return (
        <div className={styles.protected_page_container}>
            <div className={styles.logo_protected_container}>
                <Image src="/images/protectedPage.svg" layout="fill"  objectFit="contain"/>
            </div>
            <p>
                {t("hotelCheckOut_step2.protection_warning_txt")}
            </p>
        </div>
    );
}

export default ProtectedPage;