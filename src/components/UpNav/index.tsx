import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { logoutRequesting } from '../../redux/auth/logout/actions';
import Button from '../Button';
import InputChangeLanguage from '../InputChangeLanguage';


import styles from "./styles.module.css";

function UpNav() {
    const router = useRouter();

    const dispatch = useDispatch();

    const [t, i18] = useTranslation("global");

    const { language } = useSelector((state: any) => state.languageReducer);

    const { logged, token } = useSelector((state: any) => state.clientReducer);

    const {
        user, 
    } = useSelector((state:any) => state.userReducer);

    const handleLogout = () => {
        dispatch(logoutRequesting(token));
    };

    return (
        <div className={styles.up_nav_container}>
        {/* ------------------------- option ------------------------- */}
       
        <Link href={language === "en" ? "https://web.diveandbed.com/about-us/" :"https://web.diveandbed.com/es/nosotros/"} >
            {/* <div className={styles.nav_main_option_wrapper}> */}
                    <p className={styles.about_us_link_p}>{t("navbar.about_as_txt")}</p>
            {/* </div> */}
        </Link>
        <Link href={language === "en" ? "https://web.diveandbed.com/" :"https://web.diveandbed.com/es/inicio/"} >
            {/* <div className={styles.nav_main_option_wrapper}> */}
                    <p className={styles.about_us_link_p}>{t("navbar.guides_txt")}</p>
            {/* </div> */}
        </Link>


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

        <div className={styles.language_wrapper_up_nav}>
            <InputChangeLanguage />
        </div>
        
        <Link href={"https://www.guestassist.mx/portal/en/Index.php"}>
         <a target="_blank" rel="noopener noreferrer" className={styles.cross_icon}>
                <Icon name="x" size={"big"} color="red"/>
        </a>
        </Link>

        <div className={styles.login_wrapper}>
        {logged ? (
            <div
                className={`${styles.nav_main_option_wrapper} ${styles.profile_nav_main_option_wrapper}`}
            >
                <Link href="/myprofile">
                    <div className={styles.profile_nav_img_container}>
                        <Image
                            src={user?.profilePicture ? user?.profilePicture : "/images/defaultUser.png"}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </Link>

                <div className={`${styles.nav_options_container} ${styles.profile_nav_options_container}`}>
                    <Link href="/reservations">
                        <div className={styles.nav_option}>
                            <p>{t("navbar.your_reservations_txt")}</p>
                        </div>
                    </Link>

                    <div className={styles.nav_option}>
                        <p
                            className={styles.log_out_p_txt}
                            onClick={() => handleLogout()}
                        >
                            {t("common.logout_txt")}
                        </p>
                    </div>
                </div>
            </div>
        ) : (
            <div className={styles.btn_wrapper}>
                <Button
                    handleClick={() => router.push("/login")}
                    inverted
                    height={"36px"}
                >
                    {t("common.sign_in_txt")}
                </Button>
                <Button
                    handleClick={() => router.push("/register")}
                    inverted
                    height={"36px"}
                >
                    {t("common.sign_up_txt")}
                </Button>
            </div>
        )}
        </div>
    </div>
    );
}

export default UpNav;