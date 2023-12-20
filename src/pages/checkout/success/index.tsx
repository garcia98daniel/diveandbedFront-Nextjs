import React, {useEffect, useState} from 'react';


import styles from './styles.module.css';

import Image from 'next/image';
import StepsCheckOut from '../../../components/StepsCheckOut';
import ButtonDB from '../../../components/Button';
import CardsList from "../../../components/CardsList/index";
import Card from "../../../components/Card/index";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularActivitiesRequesting, getPopularLodgingRequesting } from '../../../redux/homePage/actions';
import { IHomePageState } from '../../../ts-types/custom.types';

import { 
    FacebookShareButton,
    TwitterShareButton,
 } from 'react-share';
import { Button, Icon } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next';
function Success() {

    const router = useRouter();
    const dispatch = useDispatch();
    
    const [t, i18n] = useTranslation("global"); 

    const [includesHotel, setIncludesHotel] = useState<boolean>();

    const { language } = useSelector((state : any) => state.languageReducer);


    const { 
        popular_activities,
        places_to_relax,
    } = useSelector((state : IHomePageState) => state.homePageReducer);


    useEffect(() => {
    },[language]);

    useEffect(() => {
        // Verificar si la ruta anterior incluye la palabra "hotel"
        const previousPath = document.referrer;
        setIncludesHotel(previousPath.includes("hotel"));

    }, []);

    useEffect(() => {
        if (includesHotel) {
          // La ruta previa incluye la palabra "hotel"
          // Aquí puedes hacer lo que necesites
            dispatch(getPopularLodgingRequesting(language));
        }else{
            dispatch(getPopularActivitiesRequesting(language));
        }
    }, [includesHotel]);


    return (
        <div className={styles.success_page}>
            <StepsCheckOut step={3}/>

            <div className={styles.succes_icon_container}>
                <Image src="/images/successCheckout.svg" layout="fill" object-fit="contain" />
            </div>

            <h1 className={styles.congratulation_txt}>
            {t("successCheckOut.congratulations_txt")}
            </h1>
            <p className={styles.congratulation_p_txt}>
            {t("successCheckOut.time_to_response_txt")}
            </p>
            <div className={styles.btns_container}>
                <ButtonDB 
                    height="36px" 
                    inverted
                    handleClick={() => router.push("/")}
                    >
                        {t("successCheckOut.go_home_txt")}
                </ButtonDB>
                <ButtonDB 
                    height="36px" 
                    inverted
                    handleClick={() => router.push("/search")}
                    >
                        {t("successCheckOut.keep_exploring_txt")}
                </ButtonDB>
            </div>
            <div className={styles.btn_share_wrappers}>
                <FacebookShareButton url={'https://diveandbed.com/'} quote={'¡Mira esta increíble web de buceo y alojamiento!'}>
                    <Button color='facebook'>
                        <Icon name='facebook' /> {t("successCheckOut.share_fb_txt")}
                    </Button>
                </FacebookShareButton>
                <TwitterShareButton url={'https://diveandbed.com/'}>
                    <Button color='twitter'>
                        <Icon name='twitter' /> {t("successCheckOut.share_tw_txt")}
                    </Button>
                </TwitterShareButton>
            </div>
            
            {!includesHotel ?
            <section className={styles.popular_activities}>
                <CardsList title={t("successCheckOut.places_to_stay_txt")}>
                    {places_to_relax.length > 0 &&
                        places_to_relax?.map((lodging, index)=>(
                            <Card 
                            key={index}
                            imgUrl={lodging?.frontImage? lodging?.frontImage : "/images/beach.jpg"} 
                            title={lodging?.name} 
                            stars={lodging?.avgRating}
                            price={lodging?.rooms.length>0 ? lodging?.rooms[0].price : 0}
                            onClickGoTo={`/profile/hotel/${language === "es" ? lodging?._i18n?.es.slug :  lodging?._i18n?.en.slug}`}
                            />
                        ))
                    }
                </CardsList>
            </section>
             :
            <section className={styles.popular_activities}>
                <CardsList title={t("successCheckOut.activities_to_do_txt")}>
                    {
                    popular_activities?.map((activity, index)=>(
                        <Card 
                        key={index}
                        imgUrl={activity?.frontImage} 
                        title={activity?.name} 
                        stars={activity?.avgRating}
                        price={activity?.price}
                        onClickGoTo={`profile/service/${language === "es" ? activity?._i18n?.es.slug : activity?._i18n?.en.slug }`}
                        />
                    ))
                    }
                </CardsList>
            </section>
             }
        </div>
    );
}

export default Success;