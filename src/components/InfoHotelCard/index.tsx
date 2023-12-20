import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

//components
import Button from "../Button";
import Certification from "../Certification";

//styles
import styles from "./styles.module.css";

//interfaces typeScript
import { InfoHotelCardProps, ISearchActivityState } from "../../ts-types/custom.types"; 
import { searchChangePaxValues, searchChangeValues } from "../../redux/searchActivity/actions";

//actions
import {
  checkOutLodgingChangeValues,
} from "../../redux/checkOutLodging/actions";
import { toggleRoomsModal } from "../../redux/lodgingPage/actions";

function InfoHotelCard({
  hotelLogo,
  // hotelCertification,
  hotelTitle,
  hotelLocation,
  qualification,
  price,
  whatsapp,
  facebook,
  instagram,
  reservationPolitics,
  cancelationPolitics,
  lodging
}: InfoHotelCardProps) {

  const router = useRouter();
  const [t, i18n] = useTranslation("global");  
  const dispatch = useDispatch();

  const {
    values:{
        type,
        levelExperience,
        startDate,
        endDate,
        pax,
    },
  } = useSelector((state: ISearchActivityState) => state.searchActivityReducer);

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
    router.push("/checkout/hotel");
  }

  useEffect(() =>{
    dispatch(checkOutLodgingChangeValues("lodging_id", lodging._id));
    dispatch(checkOutLodgingChangeValues("lodging_name", lodging.name));
    dispatch(checkOutLodgingChangeValues("lodging_rate", lodging.avgRating));
    dispatch(checkOutLodgingChangeValues("lodging_img", lodging.frontImage));
    dispatch(checkOutLodgingChangeValues("price_per_pax", lodging.price));
    
    if(!startDate){
      const today = new Date();
      dispatch(searchChangeValues("startDate", moment(today).format('DD-MM-YYYY')));
    }
    if(!endDate){
      const today = new Date();
      let tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      dispatch(searchChangeValues("endDate", moment(tomorrow).format('DD-MM-YYYY')));
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
    <div className={styles.infoHotelCard}>

        <div className={styles.infoHotelCard_header}>
           
            <div className={styles.logo_certification_container}>

            <div className={styles.logo_name_container}>

                <div className={styles.logo_container}>
                  <Image src={hotelLogo ? hotelLogo : ''} layout="fill" objectFit="contain"/>
                </div>
                
                <h1>{hotelTitle}</h1>
            </div>

                {/* <Certification name={hotelCertification}/> */}
            </div>

        </div>

        <div className={styles.qualification_container}>
          <div className={styles.icon_container}>
              <Image src={"/images/star.svg"} layout="fill" objectFit="contain"/>
          </div>
          <p>{qualification}</p>
        </div>

        <div className={styles.infoHotelCard_body}>

            <div className={styles.location_container}>
                <div className={styles.icon_container}>
                    <Image src={"/images/location.svg"} layout="fill" objectFit="contain"/>
                </div>
                <p>{hotelLocation?.address}</p>
            </div>

            <p className={styles.price_container}>
              {t("hotel.from_txt")} <h1> ${price} </h1> {t("hotel.a_night_txt")}
            </p>

            <div className={styles.btns_container}>
            <Link href={`https://maps.google.com/?q=${
                      hotelLocation?.coordinates?.length > 0 &&
                      hotelLocation?.coordinates[0]
                    },${
                      hotelLocation?.coordinates?.length > 0 &&
                      hotelLocation?.coordinates[1]
                    }`}>
              <a target="_blank" rel="noopener noreferrer">
                <Button 
                inverted 
                height={"36px"}>{t("hotel.how_to_arrive_txt")}</Button>
              </a>
            </Link>
                <Button handleClick={() => dispatch(toggleRoomsModal(true))} height={"36px"}>{t("hotel.book_txt")}</Button>
            
            </div>
            
            <div className={styles.socialmedia_container}>
                <Link href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}>
                <a target="_blank" rel="noopener noreferrer">
                  <div className={styles.icon_socialmedia_container}>
                      <Image src={"/images/wApp.svg"} layout="fill" objectFit="contain"/>
                  </div>
                </a>
                </Link>

                <Link href={`https://www.facebook.com/${facebook}`}>
                  <a target="_blank" rel="noopener noreferrer">
                    <div className={styles.icon_socialmedia_container}>
                        <Image src={"/images/facebook.svg"} layout="fill" objectFit="contain"/>
                    </div>
                  </a>
                </Link>

                <Link href={`https://www.instagram.com/${instagram.replace(/@/g, '')}`}>
                  <a target="_blank" rel="noopener noreferrer">
                    <div className={styles.icon_socialmedia_container}>
                        <Image src={"/images/ig.svg"} layout="fill" objectFit="contain"/>
                    </div>
                  </a>
                </Link>
            </div>

            <div className={styles.politics_container}>
            <Link href={reservationPolitics ? reservationPolitics : ""}>
                <a target="_blank" rel="noopener noreferrer">
                  {t("hotel.reservation_policies_txt")}
                </a>
            </Link>
            <Link href={cancelationPolitics ? cancelationPolitics : ""}>
              <a target="_blank" rel="noopener noreferrer">
              {t("hotel.cancellation_policies_txt")}
              </a>
            </Link>
            </div>
        </div>

    </div>
  )
}

export default InfoHotelCard;
