import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import moment from 'moment';
import { useRouter } from "next/router";
import { motion } from "framer-motion";

//semantic ui
import {
    Icon,
} from "semantic-ui-react";

//componentes
import Button from "../../Button";

//styles
import styles from "./styles.module.css";

//actions
import {toggleSideMenuMobile} from "../../../redux/generalsEffects/actions";
import { 
  searchChangeValues, 
  searchResetZonesServicesLanguage 
} from "../../../redux/searchActivity/actions";
import {logoutRequesting} from "../../../redux/auth/logout/actions";

// import {loginShowHiddenModal, loginChangeForm, loginResetStates} from "../../../redux/auth/login/actions";
const easing = [0.6, -0.05, 0.01, 0.99];

function MenuSideMobileModal() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [t, i18] = useTranslation("global");

  const [menuOption, setMenuOption] = useState("");

  const { language } = useSelector((state : any) => state.languageReducer);

  const {token, logged} = useSelector((state : any) => state.clientReducer);
  const {user} = useSelector((state : any) => state.userReducer);

  const handleSelectNavOption = (navOption:string) =>{
    const today = new Date();
    dispatch(searchChangeValues("language", language));
    dispatch(searchChangeValues("type", navOption));
    dispatch(searchChangeValues("levelExperience", 0));
    dispatch(searchChangeValues("startDate", moment(today).format('YYYY-MM-DD')));
    dispatch(searchChangeValues("page", 1));
    dispatch(searchChangeValues("limit", 20));
    dispatch(searchChangeValues("pax", 1));
    dispatch(searchChangeValues("minPrice", 0));
    dispatch(searchChangeValues("maxPrice", 0));
    dispatch(searchChangeValues("sortBy", "recent"));
    dispatch(searchChangeValues("sortOrder", "sdc"));
    dispatch(searchChangeValues("subCategory_id", ""));
    dispatch(searchResetZonesServicesLanguage());
    dispatch(toggleSideMenuMobile(false));
    router.push(`/search/${navOption}`);

  }

  const handleLogout = () => {
    dispatch(logoutRequesting(token));
  }

  return (
    <div className={styles.componet_wrapper}
     
    >
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: { duration: 0.3, easing: easing },
        }}
        className={`${styles.menu_side_mobile}`}
      >
        <div className={styles.logo_close_container}>
            <div className={styles.logo_container}>
                <Image src="/images/logo_db.svg" layout="fill"  objectFit="cover"/>
            </div>

            <button
             onClick={() => dispatch(toggleSideMenuMobile(false))}
            ><Icon name="x" size="large"/></button>
        </div>

        {logged && 
          <div className={styles.user_logged_container}>
            <Link href="/myprofile">
              <div className={styles.profile_nav_img_container}>
                  <Image src={user?.profilePicture ? user?.profilePicture : "/images/defaultUser.png"} layout="fill" objectFit='contain'/>
              </div>
            </Link>
            <h2>{user?.name}</h2>

            <Link href="/reservations">
               <div className={styles.option_row}>
                  <p>{t("navbar.your_reservations_txt")}</p>
               </div>
            </Link>
          </div>
        }

{/* ------------------------option-------------------------------- */}
        <div 
         className={styles.option_row}
         onClick={() => setMenuOption("Actividades acuáticas")}
        >
            <p>{t("navbar.aquatic_activities_txt")}</p>

            {menuOption === "Actividades acuáticas" ?
              <Icon name="chevron up" size="large"/>
            :
              <Icon name="chevron down" size="large"/>
            }
        </div>
            {menuOption === "Actividades acuáticas" &&
               <div className={styles.subOptions}>
                <p onClick={() => handleSelectNavOption("diving")}>{t("navbar.dive_txt")}</p>
                <p onClick={() => handleSelectNavOption("snorkel")}>Snorkel</p>
                <p onClick={() => handleSelectNavOption("others")}>{t("navbar.others_activities_txt")}</p>
                <p onClick={() => handleSelectNavOption("fishing")}>{t("navbar.fishing_txt")}</p>
                <p onClick={() => handleSelectNavOption("boats")}>{t("navbar.boats_and_yachts_txt")}</p>
               </div>
            }

{/* ------------------------option-------------------------------- */}
        <div className={styles.option_row}>
            <p onClick={() => handleSelectNavOption("center")}>{t("navbar.dive_centers_txt")}</p>

        </div>
{/* ------------------------option-------------------------------- */}
        <div className={styles.option_row}>
            <p onClick={() => handleSelectNavOption("zone")}>{t("navbar.dive_zones_txt")}</p>

        </div>
{/* ------------------------option-------------------------------- */}
        <div className={styles.option_row}>
            <p onClick={() => handleSelectNavOption("lodging")}>{t("navbar.lodging_txt")}</p>

        </div>


{/* ------------------------option-------------------------------- */}
        {/* <div 
         className={styles.option_row}
         onClick={() => setMenuOption("Destinos")}
        >
            <p>Destinos</p>

            {menuOption === "Destinos" ?
              <Icon name="chevron up" size="large"/>
            :
              <Icon name="chevron down" size="large"/>
            }
        </div>
            {menuOption === "Destinos" &&
               <div className={styles.subOptions} onClick={() => dispatch(toggleSideMenuMobile(false))}>
                <Link href="/profile/zone/palancar">
                  <p>Palancar</p>
                </Link>

                <Link href="/profile/zone/paraiso">
                  <p>Paraiso</p>
                </Link>

                <Link href="/profile/zone/cedral">
                  <p>Cedral</p>
                </Link>

                <Link href="/profile/zone/chankanaab">
                  <p>Chankanaab</p>
                </Link>

                <Link href="/profile/zone/santa-rosa">
                  <p>Santa Rosa</p>
                </Link>

               </div>
            } */}

{/* ------------------------option-------------------------------- */}
      <Link href={language === "en" ? "https://web.diveandbed.com/" :"https://web.diveandbed.com/es/inicio/"} >
        <div 
         className={styles.option_row}
        >
            <p>{t("navbar.guides_txt")}</p>

        </div>
      </Link>
       

{/* ------------------------option-------------------------------- */}
      <Link href={language === "en" ? "https://web.diveandbed.com/about-us/" :"https://web.diveandbed.com/es/nosotros/"} >
        <div 
         className={styles.option_row}
        >
            <p>{t("navbar.about_as_txt")}</p>
        </div>
      </Link>
{/* ------------------------- option ------------------------- */}
        <Link href={language === 'en' ? "https://web.diveandbed.com/allies/" : "https://web.diveandbed.com/es/aliados/"}>
          <div 
          className={styles.option_row}
          >
              <p>{t("navbar.allies_txt")}</p>
          </div>
        </Link>
{/* ------------------------- option ------------------------- */}
        <Link href={language === 'en' ? "https://web.diveandbed.com/news/" : "https://web.diveandbed.com/es/blog/ "}>
          <div 
          className={styles.option_row}
          >
              <p>Cozumel</p>
          </div>
        </Link>
{/* ------------------------- option ------------------------- */}
        <Link href={language === 'en' ? "https://web.diveandbed.com/acs/" : "https://web.diveandbed.com/es/acsdnb/"}>
          <div 
          className={styles.option_row}
          >
              <p>ACs</p>
          </div>
        </Link>

      {logged ? 
        <p className={styles.log_out_txt} onClick={() => handleLogout()}>{t("common.logout_txt")}</p>
      :
        <div className={styles.btn_wrapper}>
              <Button 
              handleClick={() => router.push("/login")}
              height={"36px"}
              >{t("common.sign_in_txt")}</Button>
        </div>
      }

      </motion.div>
    </div>
  );
}

export default MenuSideMobileModal;
