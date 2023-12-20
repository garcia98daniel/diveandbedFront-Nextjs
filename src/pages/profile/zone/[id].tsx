import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/Card';
import CardsList from '../../../components/CardsList';
import Footer from '../../../components/Footer';
import MenuSideMobileModal from '../../../components/Modals/MenuSideMobileModal';
import Nav from '../../../components/Nav';
import ProfilePictureExhibitor from '../../../components/ProfilePictureExhibitor';
import Map from '../../../components/Map';

//styles
import styles from "./styles.module.css";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

//actions
import { getZoneRequesting } from "../../../redux/zonePage/actions";
import ProfilesSkeletonLoader from '../../../components/ProfilesSkeletonLoader';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 0,
            }
        }
    ],
}
function Zone() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [t, i18n] = useTranslation("global"); 
    const { language } = useSelector((state : any) => state.languageReducer);

    const { side_menu_mobile_isOpen } = useSelector((state : any) => state.generalsEffectsReducer);

    const { 
        requesting,
        error,
        zone,
        // zone:{
        //     slug,
        //     name,
        //     description,
        //     avgDepth,
        //     avgTemp,
        //     aproxVisibilty,
        //     dintanceNearestPort,
        //     coordinates,
        //     coralTypes,
        //     animals,
        //     frontImage,
        //     images,
        //     publicationLanguage,
        // } 
    } = useSelector((state : any) => state.zonePageReducer);

    const [pictures, setpictures] = useState(["/images/profileImg1.jpg", "/images/profileImg2.jpg", "/images/profileImg3.jpg", "/images/profileImg4.jpg", "/images/profileImg1.jpg", "/images/profileImg2.jpg", "/images/profileImg3.jpg"]);
    const [zoneDetails, setZoneDetails] =  useState([
        `${t("zone.average_depth_txt")} : ${zone?.avgDepth} m`, 
        `${t("zone.temperature_txt")} : ${zone?.avgTemp} C`, 
        `${t("zone.approximate_visibility_txt")} : ${zone?.aproxVisibilty} m`, 
        `${t("zone.distance_from_the_nearest_port_txt")}: ${zone?.dintanceNearestPort} km`, 
        `${t("zone.types_of_coral_txt")}: ${zone?.coralTypes}`, 
    ]);

    useEffect(() => {
        setZoneDetails(
            [
                `${t("zone.average_depth_txt")} : ${zone?.avgDepth}m`, 
                `${t("zone.temperature_txt")} : ${zone?.avgTemp}C`, 
                `${t("zone.approximate_visibility_txt")} : ${zone?.aproxVisibilty}m`, 
                `${t("zone.distance_from_the_nearest_port_txt")}: ${zone?.dintanceNearestPort}km`, 
                `${t("zone.types_of_coral_txt")}: ${zone?.coralTypes}`, 
            ]
        );
    },[language])

    const [showHeroTxt, setShowHeroTxt] = useState(true);

    const { id } = router.query; //get id de la url

    useEffect(() => {
        if(id){
            dispatch(getZoneRequesting(id));
        }
    },[id])

    if(requesting || error != ''){
        return <ProfilesSkeletonLoader/>
    }

    return (
        <div>
            <Nav/>
            <section className={styles.hero} onClick={() => setShowHeroTxt(false)}>
                {/* <ProfilePictureExhibitor settings={settings} pictures={pictures}/>  */}
                <ProfilePictureExhibitor pictures={zone?.frontImage ? [zone?.frontImage,...zone?.images] : ['https://react.semantic-ui.com/images/wireframe/image.png']}/>
                { showHeroTxt &&
                <h1 className={styles.find_the_place_hero_txt}>{`${t("zone.discover_txt")}  ${zone?.name}`}</h1>
                }
            </section>

            <section className={styles.zone_details}>
                {
                    zoneDetails?.map((item, index) => (
                        <div key={index} className={styles.zone_detail_item_container}>{item}</div>
                    ))
                }
            </section>
            <div className={styles.mid_page_container}>
                <div className={styles.description_liLsit_section_wrapper}>

                    <section className={styles.info}>
                        <h2>{t("zone.description_txt")}</h2>
                        <p>
                        {zone?._i18n?.es?.description}
                        </p>
                    </section>
                    <section className={styles.info_li_list}>
                        <h2>{t("zone.wild_life_txt")} </h2>
                        <ul>
                        {zone?.animals}
                        </ul>
                    </section>
                </div>
                <div className={styles.zone_map_container}>
                    <Map marks={[zone]} />
                </div>    
                
            </div>

            { zone?.activities?.length > 0 &&
                <section className={styles.popular_activities}>
                    <CardsList title={t("zone.activities_on_this_reef_txt")}>
                        {
                        zone?.activities?.map((activity, index)=>(
                            <Card 
                            key={index}
                            imgUrl={activity?.frontImage ? activity?.frontImage : ''} 
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
            <Footer/>
      {side_menu_mobile_isOpen && <MenuSideMobileModal/>}

        </div>
    );
}

export default Zone;