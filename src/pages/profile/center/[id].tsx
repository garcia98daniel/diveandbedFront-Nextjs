import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from "./styles.module.css";

import ProfilePictureExhibitor from '../../../components/ProfilePictureExhibitor';
import InfoCenterCard from '../../../components/InfoCenterCard';
import Nav from '../../../components/Nav';
import CardsList from '../../../components/CardsList';
import Card from '../../../components/Card';
import Footer from '../../../components/Footer';
import Certification from '../../../components/Certification';
import MenuSideMobileModal from '../../../components/Modals/MenuSideMobileModal';
import ProfilesSkeletonLoader from '../../../components/ProfilesSkeletonLoader';

//actions
import { getCenterRequesting } from '../../../redux/centerPage/actions';

//interfaces
import {ICenterPageState} from '../../../ts-types/custom.types';

function Center() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [t, i18n] = useTranslation("global");  
    
    const { 
        side_menu_mobile_isOpen 
    } = useSelector((state : any) => state.generalsEffectsReducer);

    const { language } = useSelector((state : any) => state.languageReducer);

    const { 
        requesting,
        error,
        center 
    } = useSelector((state : ICenterPageState) => state.centerPageReducer);

    // const [pictures, setpictures] = useState(["/images/profileImg1.jpg", "/images/profileImg2.jpg", "/images/profileImg3.jpg", "/images/profileImg4.jpg"]);
    
    const { id } = router.query; //get id de la url
    
    useEffect(() => {
      if(id){
        dispatch(getCenterRequesting(language, id));
      }
    }, [id]);

        
    useEffect(() => {
        if(language && id){
            dispatch(getCenterRequesting(language, id));
        }
    },[language]);

    if(requesting || error != ''){
        return <ProfilesSkeletonLoader/>
    }
    return (
        <div>
            <Nav/>
            <div className={styles.center_info}>
                <div className={styles.logo_certification_container}>
                    <div className={styles.logo_container}>
                        <Image src={center?.logo ? center?.logo : "/images/tapIcon.png"} layout="fill" objectFit="contain"/>
                    </div>

                    {center?.certificates && 
                    <Certification name={center?.certificates ? "PADI certificado": ""}/>
                    }
                </div>

                <h1>{center?.name}</h1>
            </div>

            <div className={styles.pictures_and_info_center_card_container}>
                <div className={styles.pictures_and_details_container}>
                    {/* <ProfilePictureExhibitor pictures={pictures}/> */}
                    <ProfilePictureExhibitor pictures={center?.frontImage ? [center?.frontImage,...center?.images] : ['https://react.semantic-ui.com/images/wireframe/image.png']}/>
                    <div className={styles.details_container}>
                
                        <div className={styles.detailItem}>
                            <div className={styles.icon_container}>
                                <Image src={"/images/translate.svg"} layout="fill" objectFit="contain"/>
                            </div>
                            <p>{
                                center?.languages?.map((language, index, arr) => (index === arr.length - 1) ? language : language + " | ")
                            }</p>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.icon_container}>
                                <Image src={"/images/clock.svg"} layout="fill" objectFit="contain"/>
                            </div>
                            <p>{center?.yearsOfExperience+" años de exp"}</p>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.icon_container}>
                                <Image src={"/images/users.svg"} layout="fill" objectFit="contain"/>
                            </div>
                            <p>{center?.certifiedPersonnel+" guias"}</p>
                        </div>

                    </div>
                </div>
                <InfoCenterCard 
                    centerLogo={center?.logo ? center?.logo : "/images/tapIcon.png"}
                    centerCertification={center?.certificates ? "PADI certificado": ""}
                    centerTitle={center?.name}
                    centerLocation={center?.location}
                    whatsapp={center?.socialMedia.whatsapp ? center?.socialMedia.whatsapp : ''}
                    facebook={center?.socialMedia.facebook ? center?.socialMedia.facebook : ''}
                    instagram={center?.socialMedia.instagram ? center?.socialMedia.instagram : ''}
                    reservationPolitics={center?.reservationPolicy ? center?.reservationPolicy : ''}
                    cancelationPolitics={center?.cancellationPolicy ? center?.cancellationPolicy : ''}
                />
            </div>
            
            <section className={styles.description}>
                <h2>{t("center.description_txt")}</h2>
                {center?.description}
            </section>

            <section className={styles.certifications}>
                <h2>{t("center.certificates_txt")}</h2>
                <ul>
                    {center?.certificates}
                </ul>
            </section>

            <section className={styles.transport_team}>
                <h2>{t("center.transportation_and_equipment_txt")}</h2>
                <ul>
                    {center?.equipment}
                     {center?.boats?.map(
                        (boat, index) => <li key={index} >{boat}</li>
                    )}
                </ul>
            </section>

            {/* <section className={styles.certification_list}>
                <CardsList title={t("center.certifications_txt")}>
                    {
                    [1,2,3,4,5].map((item, index)=>(
                        <Card 
                        key={index}
                        imgUrl={"/images/cardImg.png"} 
                        title={"Conoce el arrecife de Palancar"} 
                        stars={4.5}
                        price={250}
                        />
                    ))
                    }
                </CardsList>
            </section> */}

            <section className={styles.activities}>
                <CardsList title={t("center.activities_txt")}>
                    {
                    center?.activities?.map((activity, index)=>(
                        <Card 
                        key={index}
                        imgUrl={activity?.images?.length ? activity?.images :'/images/diverCard.jpeg'} 
                        title={activity?.name} 
                        stars={activity?.avgRating}
                        price={activity?.price}
                        onClickGoTo={`/profile/service/${language === "es" ? activity?._i18n?.es.slug : activity?._i18n?.en.slug }`}
                        />
                    ))
                    }
                </CardsList>
            </section>
            
            <Footer/>
      {side_menu_mobile_isOpen && <MenuSideMobileModal/>}

        </div>
    );
}

export default Center;