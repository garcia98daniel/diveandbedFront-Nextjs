import React from 'react';
import Image from 'next/image';
//styles
import styles from "./styles.module.css";
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import InputChangeLanguage from '../InputChangeLanguage';
import { useDispatch, useSelector } from 'react-redux';

function Footer() {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

    return (
        <div className={styles.footer}>
            <div className={styles.driver_img_wrapper}>
                <div className={styles.diver_img_container}>
                    <Image src={"/images/diver.png"} layout="fill" objectFit="cover"/>
                </div>
            </div>

            <div className={styles.first_container}>
                <div className={styles.contactus_container}>
                    <div className={styles.logo_container}>
                        <Image src={"/images/logo_db.svg"} layout="fill" objectFit="cover"/>
                    </div>
                    <div className={styles.location_container}>
                        <div className={styles.location_img_container}>
                            <Image src={"/images/location.svg"} layout="fill" objectFit="contain"/>
                        </div>
                        <p>
                        {t("footer.address_txt")}
                        </p>
                    </div>
                    <div className={styles.social_medias_container}>
                    <Link href="https://wa.me/529841069387">
                        <a target="_blank" rel="noopener noreferrer">
                            <div className={styles.social_media_img_container}>
                                <Image src={"/images/wApp.svg"} layout="fill" objectFit="contain"/>
                            </div>
                        </a>
                        </Link>

                        <Link href={"https://www.facebook.com/diveandbed"}>
                        <a target="_blank" rel="noopener noreferrer" >
                            <div className={styles.social_media_img_container}>
                                <Image src={"/images/facebook.svg"} layout="fill" objectFit="contain"/>
                            </div>
                        </a>
                        </Link>

                        <Link href={"https://www.instagram.com/diveandbed/"}>
                        <a target="_blank" rel="noopener noreferrer" >
                            <div className={styles.social_media_img_container}>
                                <Image src={"/images/ig.svg"} layout="fill" objectFit="contain"/>
                            </div>
                        </a>
                        </Link>
                    </div>
                </div>

                <div className={styles.footer_navigation_container}>
                    <div className={styles.footer_row}>
                        <div className={styles.navigation_container}>
                            <h3>{t("footer.about_dnb_txt")}</h3>
                            <Link href="https://web.diveandbed.com/about-us/">{t("footer.from_cozumel_to_the_world_txt")}</Link>
                            <Link href="https://web.diveandbed.com/about-us/">{t("footer.social_enterprise_txt")}</Link>
                            <Link href="https://web.diveandbed.com/about-us/">{t("footer.sustainable_model_txt")}</Link>
                            <Link href="https://web.diveandbed.com/about-us/">{t("footer.contact_txt")}</Link>
                            <Link href="">{t("footer.work_with_us_txt")}</Link>
                        </div>
                        <div className={styles.navigation_container}>
                            <h3>{t("footer.participate_in_dnb_txt")}</h3>
                            <Link href="">{t("footer.registration_diving_center_txt")}</Link>
                            <Link href="">{t("footer.registration_hotel_lodging_txt")}</Link>
                            <Link href="https://form.jotform.com/230544716237859">{t("footer.registration_commercial_partner_txt")}</Link>
                        </div>
                    </div>
                    <div className={styles.footer_row}>
                        {/* <div className={styles.navigation_container}>
                            <h3>{t("footer.destinations_txt")}</h3>
                            <Link href="">Palancar</Link>
                            <Link href="">Paraiso</Link>
                            <Link href="">Cedral</Link>
                            <Link href="">Chankanaab</Link>
                            <Link href="">Santa Rosa</Link>
                        </div> */}
                        {/* <div className={styles.navigation_container}>
                            
                        </div> */}
                        <div className={styles.navigation_container}>
                            <h3>{t("footer.explore_txt")}</h3>
                            <Link href="https://web.diveandbed.com/es/inicio/">{t("footer.guides_txt")}</Link>
                            <Link href="https://diveandbed.com/search/center">{t("footer.diving_centers_txt")}</Link>
                            <Link href="https://diveandbed.com/search/activity">{t("footer.activities_txt")}</Link>
                            <Link href="https://diveandbed.com/search/lodging">{t("footer.hotels_txt")}</Link>
                            <Link href="https://diveandbed.com/search/zone">{t("footer.dive_zones_txt")}</Link>
                            <Link href="https://web.diveandbed.com/es/aliados/">{t("footer.commercial_allies_txt")}</Link>
                            <Link href="https://web.diveandbed.com/acs/">{t("footer.civil_associations_txt")}</Link>
                            <Link href="https://web.diveandbed.com/news/">{t("footer.cozumels_txt")}</Link>
                        </div>
                    </div>
                    <div className={styles.footer_row}>
                        <div className={styles.navigation_container}>
                            <h3>{t("footer.contributes_to_conservation_txt")}</h3>
                            <Link href="https://web.diveandbed.com/es/inicio/">{t("footer.guides_txt")}</Link>
                            <Link href="https://web.diveandbed.com/es/acsdnb/">{t("footer.ACs_txt")}</Link>
                            <Link href={`https://wa.me/+5219841069387}`}>{t("footer.participate_with_DnB_txt")}</Link>
                        </div>
                    </div>

                    <div className={styles.terms_container}>

                        <div className={styles.select_lenguajes_container}>
                            <label htmlFor="Idioma">{t("footer.language_txt")}</label> 
                            <InputChangeLanguage/>
                        </div>

                        <div className={styles.line}></div>
                        <div className={styles.terms}>
                            <Link href="">{t("footer.terms_of_use_txt")}</Link>
                            <Link href="">{t("footer.privacy_policies_txt")}</Link>
                        </div>
                        <Link href="">© 2022 Dive & Bed</Link>
                    </div>
                </div>
            </div>

            <div className={styles.lenguajes_terms_container}>
                <div className={styles.select_lenguajes_container}>
                    <label htmlFor="Idioma">{t("footer.language_txt")}</label> 
                    <InputChangeLanguage/>
                </div>

                <div className={styles.terms_container_desktop}>
                    <Link href="">{t("footer.terms_of_use_txt")}</Link>
                    <Link href="">{t("footer.privacy_policies_txt")}</Link>
                    <Link href="">© 2022 Dive & Bed</Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;