import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

import Button from "../Button";
import Certification from "../Certification";

import styles from "./styles.module.css";
import { Icon } from "semantic-ui-react";
import { Router, useRouter } from "next/router";

//interfaces typeScript
import { IService, InfoServiceCardProps, ISearchActivityState } from "../../ts-types/custom.types"; 

//actions
import {
  checkOutServiceChangeValues,
} from "../../redux/checkOutService/actions";

import moment from 'moment';
import { searchChangePaxValues, searchChangeValues } from "../../redux/searchActivity/actions";
import { useTranslation } from "react-i18next";

function InfoServiceCard({
  serviceLogo,
  serviceTitle,
  serviceLocation,
  qualification,
  price,
  centerTitle,
  service,
}: InfoServiceCardProps) {

  const [t, i18n] = useTranslation("global"); 
  const router = useRouter();
  const dispatch = useDispatch();

  const [openCenterInfo, setOpenCenterInfo] = useState<boolean>(false);

  const {
    values:{
        type,
        levelExperience,
        startDate,
        endDate,
        pax,
    },
  } = useSelector((state: ISearchActivityState) => state.searchActivityReducer);
  const { language } = useSelector((state : any) => state.languageReducer);

  const { logged } = useSelector((state:any) => state.clientReducer);
  const { 
    user:{
      id,
      role,
      email,
      name,
      telephone,
    },
  } = useSelector((state:any) => state.userReducer);

  // console.log(service)

  const handleGoToCheckOut = () => {
    router.push("/checkout/service");
  }

  useEffect(() =>{
    dispatch(checkOutServiceChangeValues("service_id", service._id));
    dispatch(checkOutServiceChangeValues("service_name", service.name));
    dispatch(checkOutServiceChangeValues("service_rate", service.avgRating));
    dispatch(checkOutServiceChangeValues("service_img", service.frontImage));
    dispatch(checkOutServiceChangeValues("price_per_pax", service.price));
    
    if(!startDate){
      const today = new Date();
      dispatch(searchChangeValues("startDate", moment(today).format('DD-MM-YYYY')));
    }

    if(pax.length > 0){
      if(logged){ //si esta loggeado 
        dispatch(searchChangePaxValues("name", name, 0));
        dispatch(searchChangePaxValues("email", email, 0));
        dispatch(searchChangePaxValues("experience", levelExperience, 0));
        dispatch(searchChangePaxValues("tel", telephone, 0));
        dispatch(searchChangePaxValues("language", "es", 0));
      }
    }
  },[])
  
  return (
    <div className={styles.InfoServiceCard}>

        <div className={styles.InfoServiceCard_header}>
            <h1>{serviceTitle}</h1>
        </div>

        <div className={styles.qualification_container}>
          <div className={styles.icon_container}>
              <Image src={"/images/star.svg"} layout="fill" objectFit="contain"/>
          </div>
          <p>{qualification}</p>
        </div>

        <div className={styles.InfoServiceCard_body}>

            <div className={styles.location_container}>
                <div className={styles.icon_container}>
                    <Image src={"/images/location.svg"} layout="fill" objectFit="contain"/>
                </div>
                <p>{serviceLocation}</p>
            </div>

            <p className={styles.price_container}>
              <h1> ${price} </h1> {t("service.per_person_txt")}
            </p>

            <div className={styles.btns_container}>
              <Button handleClick={() => handleGoToCheckOut()} height={"36px"}>{t("service.book_txt")}</Button>
            </div>

            <div className={styles.about_the_center} onClick={() => setOpenCenterInfo(prevState => !prevState)}>
              <h1>{t("service.about_the_center_txt")}</h1>
              <Icon name="chevron up" size="large"/>
            </div>
            {openCenterInfo && 
              <div className={styles.about_the_center_image_txt_container}>
                
                    <div className={styles.logo_name_container}>
                    <h2>{t("service.by_txt")} </h2>
                      <div className={styles.logo_container}>
                          <Image src={serviceLogo ? serviceLogo : "/images/logoCenter.svg"} alt="logocenter" layout="fill" objectFit="contain"/>
                      </div>

                      <Link href={`/profile/center/${service?.center?._i18n?.es?.slug}`}>
                        <h3 className={styles.center_name_link}>{centerTitle}</h3>
                      </Link>
                    </div>

                    <p>
                      {language === "es" ? service?.center?._i18n?.es?.description : service?.center?._i18n?.en?.description}
                    </p>
              </div>
            }
        </div>

    </div>
  )
}

export default InfoServiceCard;
