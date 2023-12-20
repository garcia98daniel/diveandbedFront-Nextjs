import React, { useEffect } from "react";
import { useRouter } from "next/router";

import moment from "moment";
import { useTranslation } from "react-i18next";

//styles
import styles from "./styles.module.css";
//components
import { Icon } from "semantic-ui-react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import InputChangeLanguage from "../InputChangeLanguage";

//redux
import { useDispatch, useSelector } from "react-redux";
import { toggleSideMenuMobile } from "../../redux/generalsEffects/actions";
import {
    searchAddDiver,
    searchChangeValues,
    searchResetZonesServicesLanguage,
} from "../../redux/searchActivity/actions";
import { ISearchActivityState } from "../../ts-types/custom.types";

import { logoutRequesting } from "../../redux/auth/logout/actions";
import UpNav from "../UpNav";

function Nav() {
    const router = useRouter();

    const dispatch = useDispatch();

    const [t, i18] = useTranslation("global");

    const { language } = useSelector((state: any) => state.languageReducer);

    const {
        user, 
    } = useSelector((state:any) => state.userReducer);
    
    const {
        requesting,
        success,

        isOpen_whatwouldyouliketodo_modal,
        values,
    } = useSelector((state: ISearchActivityState) => state.searchActivityReducer);
    
    const { logged, token } = useSelector((state: any) => state.clientReducer);

    // ---------- this funtion move to anotherpage , but first reset the search values ------------
    const handleSelectNavOption = (navOption: string) => {
        const today = new Date();
        dispatch(searchChangeValues("language", language));
        dispatch(searchChangeValues("type", navOption));
        dispatch(searchChangeValues("levelExperience", 0));
        dispatch(
            searchChangeValues("startDate", moment(today).format("YYYY-MM-DD"))
        );
        let tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        dispatch(
            searchChangeValues("endDate", moment(tomorrow).format("DD-MM-YYYY"))
        );
        dispatch(searchChangeValues("page", 1));
        dispatch(searchChangeValues("limit", 20));
        // dispatch(searchAddDiver(
        //     {
        //         name:'',
        //         email:'',
        //         tel:'',
        //         experience:0,
        //         language:'es'
        //     }
        // ))
        dispatch(searchChangeValues("minPrice", 0));
        dispatch(searchChangeValues("maxPrice", 0));
        dispatch(searchChangeValues("sortBy", "recent"));
        dispatch(searchChangeValues("sortOrder", "sdc"));
        dispatch(searchChangeValues("subCategory_id", ""));
        dispatch(searchResetZonesServicesLanguage());
        router.push(`/search/${navOption}`);

    };

    const handleLogout = () => {
        dispatch(logoutRequesting(token));
    };

    return (
        <div className={styles.nav}>
            <h4 className={styles.cinta}>
                Dive & Bed V 1.0.0 BETA
            </h4>
            <div className={styles.nav_wrapper}>
                    <div className={styles.logo_container}>
                        <Link href="/">
                            <Image src="/images/logo_1_db.jpg" layout="fill" objectFit="cover" />
                        </Link>
                    </div>

                <div className={styles.hole_navs_container}>
                    <div className={styles.up_nav_wrapper}>
                        <UpNav/>
                    </div>
                    <div className={styles.down_nav_container}>

                        <div className={styles.links_page}>
                            {/* ------------------------- option ------------------------- */}
                            <div className={styles.nav_main_option_wrapper} >
                                <Link href={"/search/activity"}>
                                    <p className={styles.aquatic_activities_p} >{t("navbar.aquatic_activities_txt")}</p>
                                </Link>

                                <div className={styles.nav_options_container}>
                                    {/* <<<<<<<<<<< suboption >>>>>>>> */}
                                    <div
                                        className={styles.nav_option}
                                        onClick={() => handleSelectNavOption("diving")}
                                    >
                                        <div className={styles.logo_nav_option_container}>
                                            <Image
                                                src="/images/scubar.svg"
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                        <p>{t("navbar.dive_txt")}</p>
                                    </div>

                                    {/* <<<<<<<<<<< suboption >>>>>>>> */}
                                    <div
                                        className={styles.nav_option}
                                        onClick={() => handleSelectNavOption("snorkeling")}
                                    >
                                        <div className={styles.logo_nav_option_container}>
                                            <Image
                                                src="/images/snorkel.svg"
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                        <p>{t("navbar.snorkel_txt")}</p>
                                    </div>
                                    
                                    {/* <<<<<<<<<<< suboption >>>>>>>> */}
                                    <div
                                        className={styles.nav_option}
                                        onClick={() => handleSelectNavOption("fishing")}
                                    >
                                        <div className={styles.logo_nav_option_container}>
                                            {/* <Image
                                                src="/images/scubar.svg"
                                                layout="fill"
                                                objectFit="contain"
                                            /> */}
                                            <Icon name="anchor"/>
                                        </div>
                                        <p>{t("navbar.fishing_txt")}</p>
                                    </div>
                                    {/* <<<<<<<<<<< suboption >>>>>>>> */}
                                    <div
                                        className={styles.nav_option}
                                        onClick={() => handleSelectNavOption("boats")}
                                    >
                                        <div className={styles.logo_nav_option_container}>
                                            {/* <Image
                                                src="/images/scubar.svg"
                                                layout="fill"
                                                objectFit="contain"
                                            /> */}
                                            <Icon name="ship"/>
                                        </div>
                                        <p>{t("navbar.boats_and_yachts_txt")}</p>
                                    </div>

                                                                        
                                    {/* <<<<<<<<<<< suboption >>>>>>>> */}
                                    <div
                                        className={styles.nav_option}
                                        onClick={() => handleSelectNavOption("others")}
                                    >
                                        <div className={styles.logo_nav_option_container}>
                                            <Image
                                                src="/images/certificates.svg"
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                        <p>{t("navbar.others_activities_txt")}</p>
                                    </div>
                                </div>
                            </div>

                                                        {/* ------------------------- option ------------------------- */}
                            <div className={styles.nav_main_option_wrapper}
                                onClick={() => handleSelectNavOption("center")}>
                                <p>{t("navbar.dive_centers_txt")}</p>
                            </div>


                            {/* ------------------------- option ------------------------- */}
                            <div className={styles.nav_main_option_wrapper}
                                onClick={() => handleSelectNavOption("zone")}>
                                <p>{t("navbar.dive_zones_txt")}</p>
                            </div>


                            {/* ------------------------- option ------------------------- */}
                            <div
                                className={styles.nav_main_option_wrapper}
                                onClick={() => handleSelectNavOption("lodging")}
                            >
                                <p>{t("navbar.lodging_txt")}</p>
                            </div>
                            {/* ------------------------- option ------------------------- */}
                            {/* <div className={styles.nav_main_option_wrapper}>
                                <p>{t("navbar.destinations_txt")}</p>

                                <div className={styles.nav_options_container}>
                                    <Link href="/profile/zone/palancar">
                                        <div className={styles.nav_option}>
                                            <p>Palancar</p>
                                        </div>
                                    </Link>

                                    <Link href="/profile/zone/paraiso">
                                        <div className={styles.nav_option}>
                                            <p>Paraiso</p>
                                        </div>
                                    </Link>

                                    <Link href="/profile/zone/cedral">
                                        <div className={styles.nav_option}>
                                            <p>Cedral</p>
                                        </div>
                                    </Link>

                                    <Link href="/profile/zone/chankanaab">
                                        <div className={styles.nav_option}>
                                            <p>Chankanaab</p>
                                        </div>
                                    </Link>

                                    <Link href="/profile/zone/santa-rosa">
                                        <div className={styles.nav_option}>
                                            <p>Santa Rosa</p>
                                        </div>
                                    </Link>
                                </div>
                            </div> */}
                            {/* ------------------------- option ------------------------- */}
                            {/* <div className={styles.nav_main_option_wrapper}>
                                <p>{t("navbar.guides_txt")}</p>

                                <div className={styles.nav_options_container}>
                                    <div
                                        className={styles.nav_option}
                                        onClick={() => handleSelectNavOption("diving")}
                                    >
                                        <p>{t("navbar.diving_txt")}</p>
                                    </div>

                                    <div className={styles.nav_option}>
                                        <p>{t("navbar.destination_txt")}</p>
                                    </div>

                                    <div className={styles.nav_option}>
                                        <p>{t("navbar.activities_txt")}</p>
                                    </div>

                                    <div className={styles.nav_option}>
                                        <p>{t("navbar.reefs_txt")}</p>
                                    </div>
                                </div>
                            </div> */}
                            {/* ------------------------- option ------------------------- */}
                            <Link href={language === 'en' ? "https://web.diveandbed.com/allies/" : "https://web.diveandbed.com/es/aliados/"}>
                                <div className={styles.nav_main_option_wrapper}>
                                        <p>{t("navbar.allies_txt")}</p>
                                </div>
                            </Link>
                            <Link href={language === 'en' ? "https://web.diveandbed.com/news/" : "https://web.diveandbed.com/es/blog/ "}>
                                <div className={styles.nav_main_option_wrapper}>
                                        <p>Cozumel</p>
                                </div>
                            </Link>
                            <Link href={language === 'en' ? "https://web.diveandbed.com/acs/" : "https://web.diveandbed.com/es/acsdnb/"}>
                                <div className={styles.nav_main_option_wrapper}>
                                        <p>ACs</p>
                                </div>
                            </Link>
                        </div>

                        <div className={styles.up_nav_mobile_wrapper}>
                            <UpNav/>
                        </div>


                        <div
                            className={styles.burguer_btn}
                            onClick={() => dispatch(toggleSideMenuMobile(true))}
                        >
                            <Icon name="bars" size="large" />
                        </div>

                        {/* {logged ? (
                            <div
                                className={`${styles.nav_main_option_wrapper} ${styles.profile_nav_main_option_wrapper}`}
                            >
                                <Link href="/myprofile">
                                    <div className={styles.profile_nav_img_container}>
                                        <Image
                                            src={"/images/defaultUser.png"}
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </div>
                                </Link>

                                <div
                                    className={`${styles.nav_options_container} ${styles.profile_nav_options_container}`}
                                >
                                    <Link href="/reservations">
                                        <div className={styles.nav_option}>
                                            <p>Tus reservas</p>
                                        </div>
                                    </Link>

                                    <div className={styles.nav_option}>
                                        <p
                                            className={styles.log_out_p_txt}
                                            onClick={() => handleLogout()}
                                        >
                                            Cerrar sesión
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
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nav;
