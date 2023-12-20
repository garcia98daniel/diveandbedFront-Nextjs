import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next';

//styles
import styles from "./styles.module.css";
//components
import ProfilePictureExhibitor from "../../../components/ProfilePictureExhibitor";
import InfoServiceCard from "../../../components/InfoServiceCard";
import Nav from "../../../components/Nav";
import CardsList from "../../../components/CardsList";
import Card from "../../../components/Card";
import Footer from "../../../components/Footer";
import Certification from "../../../components/Certification";
import OpinionList from "../../../components/OpinionList";
import ServiceNoSearchCheckOutModal from "../../../components/Modals/ServiceNoSearchCheckOutModal";
import MenuSideMobileModal from "../../../components/Modals/MenuSideMobileModal";
import ProfilesSkeletonLoader from "../../../components/ProfilesSkeletonLoader";

//interfaces typeScript
import { IServiceState } from "../../../ts-types/custom.types"; 


//actions
import { 
  getServiceRequesting,
  servicePage_getPopularActivitiesRequesting,
  servicePage_getPopularLodgingRequesting,
  servicePage_getQuestionsRequesting,
  servicePage_changePostQuestion,
  servicePage_postQuestionRequesting,
} from "../../../redux/servicePage/actions";

function Service() {
  const [t, i18n] = useTranslation("global"); 

  const dispatch = useDispatch();
  const router = useRouter();

  const { 
    side_menu_mobile_isOpen,
  } = useSelector((state : any) => state.generalsEffectsReducer);
  
  const { language } = useSelector((state : any) => state.languageReducer);
  const { token } = useSelector((state:any) => state.clientReducer);
  
  const { 
    requesting,
    success,
    error,
    service,
    popular_activities,
    lodging,
    post_opinion_value,
    post_question_value,
   } = useSelector((state : IServiceState) => state.servicePageReducer);

  const { id } = router.query; //get id de la url
    
  useEffect(() => {
    if(id){
      dispatch(getServiceRequesting(language, id));
    }
  }, [id]);
  
  useEffect(() => {
    if(service._id){
      dispatch(servicePage_getQuestionsRequesting(service._id));
    }
  }, [service]);

  useEffect(() => {
    dispatch(servicePage_getPopularActivitiesRequesting(language));
    dispatch(servicePage_getPopularLodgingRequesting(language));

  },[])

  const handleChangeQuestion = (value:string) =>{
    dispatch(servicePage_changePostQuestion(value))
  }
  
  const handlePostQuestion = () =>{
    dispatch(servicePage_postQuestionRequesting(service._id, post_question_value, token))
  }

  if(requesting || error != ''){
    return <ProfilesSkeletonLoader/>
  }

  return (
    <div>
      <Nav />
      <div className={styles.service_info}>
        <div className={styles.logo_certification_container}>
          <div className={styles.logo_container}>
            <Image
              src={"/images/logoservice.svg"}
              layout="fill"
              objectFit="contain"
            />
          </div>

        </div>

        <h1>{service?.name}</h1>

        <div className={styles.qualification_container}>
          <div className={styles.icon_container}>
            <Image src={"/images/star.svg"} layout="fill" objectFit="contain" />
          </div>
          <p>{service?.avgRating}</p>
        </div>
      </div>

      <div className={styles.pictures_and_info_service_card_container}>
        <div className={styles.pictures_and_details_container}>

          <ProfilePictureExhibitor pictures={service?.frontImage ? [service?.frontImage,...service?.images] : ['https://react.semantic-ui.com/images/wireframe/image.png']} />

          <div className={styles.details_container}>
            <div className={styles.detailItem}>
              <div className={styles.icon_container}>
                <Image
                  src={"/images/translate.svg"}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p>
                {
                  service?.languages?.map((language, index, arr) => (index === arr.length - 1) ? language : language + " | ")
                }
              </p>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.icon_container}>
                <Image
                  src={"/images/clock.svg"}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p>{service?.duration}</p>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.icon_container}>
                <Image
                  src={"/images/palangar.svg"}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p>
                {
                  service?.diveZones?.map((diveZone) => diveZone +" ")
                }
              </p>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.icon_container}>
                <Image
                  src={"/images/users.svg"}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p>{`15 ${t("service.people_txt")}`}</p>
            </div>
          </div>
        </div>
        <InfoServiceCard
          serviceLogo={service?.center?.logo ? service?.center?.logo : "/images/tapIcon.png"}
          serviceTitle={service?.name}
          serviceLocation={service?.center?.location?.address}
          qualification={service?.avgRating}
          price={service?.price} 
          centerTitle={service?.center?.name} 
          service={service}        
        />n
      </div>

      <section className={styles.info_txt}>
        <h2> {t("service.description_txt")} </h2>
        {service?.description}
      </section>

      <section className={styles.info_li_list}>
        <h2> {t("service.requirements_txt")} </h2>

        <ul>
          {service?.requirements}
        </ul>
      </section>

      <section className={styles.info_li_list}>
        <h2> {t("service.services_txt")} </h2>
        <ul>
          {service?.includes}
        </ul>
      </section>

      <section className={styles.info_li_list}>
        <h2> {t("service.don't_include_txt")} </h2>
        <ul>
          {service?.notIncludes}
        </ul>
      </section>

      <section className={styles.info_txt}>
        <h2> {t("service.what_to_expect_txt")} </h2>
        {service?.whatExpect}
      </section>

      {/* <div className={styles.opinionsList_wrapper}>
            <OpinionList 
                opinions={[]} 
                questions={["question1", "question2", "question3"]}

                post_opinion_value={post_opinion_value}
                post_question_value={post_question_value}

                handleChange_input_post_question={handleChangeQuestion}
                handleChange_input_post_opinion={() =>{}}

                handlePostQuestion={handlePostQuestion}
            />
      </div> */}

      <section className={styles.certification_list}>
        <CardsList title={ t("service.lodging_txt") }>
            {lodging.length > 0 &&
              lodging?.map((lodging, index)=>(
                <Card 
                key={index}
                imgUrl={lodging?.frontImage ? lodging?.frontImage : "/images/beach.jpg"} 
                title={lodging?.name} 
                stars={lodging?.avgRating}
                price={lodging?.price}
                per_txt={"noche"}
                onClickGoTo={`/profile/hotel/${language === "es" ? lodging?._i18n?.es.slug : lodging?._i18n?.en.slug  }`}
                />
              ))
            }
        </CardsList>
      </section>

      <section className={styles.activities}>
        <CardsList title={ t("service.others_activities_txt") }>
            {
              popular_activities?.map((activity, index)=>(
                <Card 
                key={index}
                imgUrl={activity?.frontImage} 
                title={activity?.name} 
                stars={activity?.avgRating}
                price={activity?.price}
                onClickGoTo={`/profile/service/${language === "es" ? activity?._i18n?.es.slug : activity?._i18n?.en.slug}`}
                />
              ))
            }
        </CardsList>
      </section>

      <Footer />
      <ServiceNoSearchCheckOutModal/>
      {side_menu_mobile_isOpen && <MenuSideMobileModal/>}

    </div>
  );
}

export default Service;
