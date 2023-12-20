import React from 'react';
import { Icon } from 'semantic-ui-react'
import Image from "next/image";
import Link from 'next/link';

import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';

interface StepsCheckOutProps{
    step: 1|2|3,
}

function StepsCheckOut({step}:StepsCheckOutProps) {
    const [t, i18n] = useTranslation("global"); 
    
    return (
        <div className={styles.StepsCheckOut}>
            <Link href="/">
                <div className={styles.logo_container}>
                    <Image src="/images/logo_db.svg" layout="fill"  objectFit="cover"/>
                </div>
            </Link>

            <div className={styles.steps_container}>
                <div className={styles.step_circule_container}>
                    {step === 2 ||step === 3 ?
                        <div className={styles.step_circule_check}>
                            <Icon name="check"/>
                        </div>
                    :
                        <div className={styles.step_circule_check}>
                            1
                        </div>
                    }
                    <span className={styles.line}></span>
                    {step === 2 ?
                        <div className={styles.step_circule_check}>
                            2
                        </div>
                    :
                        step === 3 ?
                            <div className={styles.step_circule_check}>
                                <Icon name="check"/>
                            </div>
                        :
                        <div className={styles.step_circule}>
                            2
                        </div>
                    }
                    
                    

                    <span className={styles.line}></span>
                    {step === 3 ?
                        <div className={styles.step_circule_check}>
                            <Icon name="check"/>
                        </div>
                    :
                        <div className={styles.step_circule}>
                            3
                        </div>
                    }
                </div>

                <div className={styles.step_txt_container}>
                    <p>{t("stepComponent.step_1_txt")}</p>
                    <p>{t("stepComponent.step_2_txt")} </p>
                    <p>{t("stepComponent.step_3_txt")}</p>
                </div>
            </div>
        </div>
    );
}

export default StepsCheckOut;