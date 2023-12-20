import Image from 'next/image';
import React, {useState, useEffect} from 'react';
import ProfilePictureExhibitor from '../../../components/ProfilePictureExhibitor';
import InfoHotelCard from '../../../components/InfoHotelCard';

import styles from "./styles.module.css";
import Nav from '../../../components/Nav';
import CardsList from '../../../components/CardsList';
import CardHotelItem from '../../../components/CardHotelItem';
import Footer from '../../../components/Footer';
import OpinionList from '../../../components/OpinionList';
import Card from '../../../components/Card';
import LodgingRoomsModal from '../../../components/Modals/LodgingRoomsModal';
import LodgingRoomsNoSearchModal from '../../../components/Modals/LodgingRoomsNoSearchModal';
import MenuSideMobileModal from '../../../components/Modals/MenuSideMobileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

//actions
import { 
    getLodgingRequesting,
    getPopularActivitiesRequesting,
    toggleRoomsModal,
 } from '../../../redux/lodgingPage/actions';

//interfaces
import {ILodgingPageState} from '../../../ts-types/custom.types';

import ProfilesSkeletonLoader from '../../../components/ProfilesSkeletonLoader';

function Lodging() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [t, i18n] = useTranslation("global");  
    
    const { 
        side_menu_mobile_isOpen 
    } = useSelector((state : any) => state.generalsEffectsReducer);
    
    const { language } = useSelector((state : any) => state.languageReducer);

    const [pictures, setpictures] = useState(["/images/profileImg1.jpg", "/images/profileImg2.jpg", "/images/profileImg3.jpg", "/images/profileImg4.jpg"]);
    

    const { 
        requesting,
        error,
        lodging, 
        popular_activities,
    } = useSelector((state : ILodgingPageState) => state.lodgingPageReducer);

    const { id } = router.query; //get id de la url
    
    useEffect(() => {
      if(id){
        dispatch(getLodgingRequesting(language, id));
        dispatch(getPopularActivitiesRequesting(language));
      }
    }, [id]);

    if(requesting || error != ''){
        return <ProfilesSkeletonLoader/>
    }

    const handleContinueBotton = () => {
        dispatch(toggleRoomsModal(false))
        router.push("/checkout/hotel")
    }

    return (
        <div>
            <Nav/>
            <div className={styles.center_info}>
                <div className={styles.logo_certification_container}>
                    <div className={styles.logo_container}>
                        <Image src={lodging?.logo ? lodging?.logo : "/images/tapIcon.png"} layout="fill" objectFit="contain"/>
                    </div>
                </div>

                <h1>{lodging?.name}</h1>

                <div className={styles.qualification_container}>
                    <div className={styles.icon_container}>
                        <Image src={"/images/star.svg"} layout="fill" objectFit="contain"/>
                    </div>
                    <p>{lodging?.avgRating}</p>
                </div>
            </div>

            <div className={styles.pictures_and_info_center_card_container}>
                <div className={styles.pictures_and_details_container}>
                    {/* <ProfilePictureExhibitor pictures={pictures}/> */}
                    <ProfilePictureExhibitor pictures={lodging?.images.length > 0 ? [lodging?.frontImage,...lodging?.images] : ['https://react.semantic-ui.com/images/wireframe/image.png']}/>

                </div>
                <InfoHotelCard 
                    hotelLogo={lodging?.logo ? lodging?.logo : "/images/tapIcon.png"}
                    hotelTitle={lodging?.name}
                    hotelLocation={lodging?.location}
                    qualification={lodging?.avgRating}
                    price={lodging?.rooms[0]?.price}
                    whatsapp={lodging?.contact.whatsapp}
                    facebook={lodging?.contact.facebook ? lodging?.contact.facebook : ''}
                    instagram={lodging?.contact.instagram ? lodging?.contact.instagram : ''}
                    reservationPolitics={lodging?.reservationPolicy ? lodging?.reservationPolicy : ''}
                    cancelationPolitics={lodging?.cancellationPolicy ? lodging?.cancellationPolicy : ''}
                    lodging={lodging}
                />
            </div>
            
            <section className={styles.description}>
                <h2>{t("hotel.description_txt")}</h2>
                {lodging?._i18n?.es?.description}
            </section>
             
            <section className={styles.certifications}>
                <h2>{t("hotel.services_txt")}</h2>
                <ul>
                    {lodging?.services?.map(
                        (service, index) => <li key={index} >{service}</li>
                    )}
                </ul>
            </section>

            <section className={styles.certification_list}>
                <CardsList title={t("hotel.room_type_txt")}>
                    {
                    lodging?.rooms?.map((room, index)=>(
                        <CardHotelItem 
                        key={index}
                        imgUrl={room.frontImage ? room.frontImage : ''} 
                        title={room.name} 
                        bed={room.beds}
                        bathroom={room.bathrooms}
                        space={32}
                        price={room.price}
                        />
                    ))
                    }
                </CardsList>
            </section>

            {/* <div className={styles.opinionsList_wrapper}>
                <OpinionList 
                    opinions={["opinion1", "opinion2", "opinion3"]} 
                    questions={["question1", "question2", "question3"]}
                    post_opinion_value={"hola"}
                    post_question_value={"hola"}
                    
                    handleChange_input_post_question={() =>{}}
                    handleChange_input_post_opinion={() =>{}}

                    handlePostQuestion={() =>{}}
                />
            </div> */}

            <section className={styles.popular_activities}>
                <CardsList title={t("hotel.popular_activities_txt")}>
                    {
                    popular_activities?.map((activity, index)=>(
                        <Card 
                        key={index}
                        imgUrl={activity?.frontImage ? activity?.frontImage : ''} 
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
            {/* <LodgingRoomsModal/> */}
            <LodgingRoomsNoSearchModal handleContinueBotton={handleContinueBotton}/>
      {side_menu_mobile_isOpen && <MenuSideMobileModal/>}

        </div>
    );
}

export default Lodging;