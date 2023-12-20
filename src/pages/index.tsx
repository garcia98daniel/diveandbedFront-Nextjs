import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useTranslation } from "react-i18next";

//components
import Nav from "../components/Nav/index";
import Search from "../components/Search/index";
import CategoriesOptionItem from "../components/CategoriesOptionItem/index";
import CardsList from "../components/CardsList/index";
import Card from "../components/Card/index";
import Button from "../components/Button/index";
import Review from "../components/Review/index";
import Footer from "../components/Footer/index";
import { Placeholder } from "semantic-ui-react";

//styles
import styles from "./styles.module.css";
import WhatWouldYouLikeToDoModalFilter from "../components/Modals/WhatWouldYouLikeToDoModalFilter";
import MenuSideMobileModal from "../components/Modals/MenuSideMobileModal";

//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import {
  getCategoriesRequesting,
  getPopularActivitiesRequesting,
  getPopularLodgingRequesting,
  getPopularCentersRequesting,
} from '../redux/homePage/actions';

//interfaces
import {IHomePageState} from '../ts-types/custom.types';
import { searchChangeValues, searchResetZonesServicesLanguage } from "../redux/searchActivity/actions";
import moment from "moment";

function Home() {

  const dispatch = useDispatch();
  const router = useRouter();

  const [t, i18n] = useTranslation("global");  
  const { 
    side_menu_mobile_isOpen 
  } = useSelector((state : any) => state.generalsEffectsReducer);

  const { language } = useSelector((state : any) => state.languageReducer);
  
  const { 
    requesting,
    categories, 
    popular_activities,
    places_to_relax,
    best_centers,
  } = useSelector((state : IHomePageState) => state.homePageReducer);

  useEffect(() => {
    i18n.changeLanguage(language);
    dispatch(getCategoriesRequesting());
    dispatch(getPopularActivitiesRequesting(language));
    dispatch(getPopularLodgingRequesting(language));
    dispatch(getPopularCentersRequesting(language));
  },[]);

  useEffect(() => {
    if(language){
    dispatch(getCategoriesRequesting());
    dispatch(getPopularActivitiesRequesting(language));
    dispatch(getPopularLodgingRequesting(language));
    dispatch(getPopularCentersRequesting(language));
    }
  },[language]);

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
    dispatch(searchChangeValues("minPrice", 0));
    dispatch(searchChangeValues("maxPrice", 0));
    dispatch(searchChangeValues("sortBy", "recent"));
    dispatch(searchChangeValues("sortOrder", "sdc"));
    dispatch(searchChangeValues("subCategory_id", ""));
    dispatch(searchResetZonesServicesLanguage());
    router.push(`/search/${navOption}`);

  };

  return (
    <div className={styles.home_page}>
      <Nav/>
      
      <section className={styles.hero}>
        <video className={styles.hero_video} autoPlay muted loop>
          <source src="videos/video6mb.mp4" type="video/mp4" />
          <source src="videos/video6mb.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* <div className={styles.txt_input_hero_container}>
          <h1 className={styles.hero_txt}>{t("home.hero_txt")}</h1>
          <Search>{t("home.search_txt")}</Search>
        </div> */}
      </section>

      {/* --------------------------------search------------------------------------------------ */}
      <div className={styles.search_wrapper}>
        <Search>{t("home.search_txt")}</Search>
      </div>

      {/* --------------------------------categories------------------------------------------- */}

      {requesting ? 
      <section className={styles.section_loading}>
        <CardsList>
          {
          [1,2,3,4].map((item, index)=>(
              <div key={index} >
                  <Placeholder style={{ margin:'auto', height: 60, width: 180 }}>
                  <Placeholder.Image />
                      <Placeholder.Line />
                  </Placeholder>
              </div>
          ))
          }
        </CardsList>
      </section>
      :
      <section className={styles.options_categories_container}>
        {categories?.map((category, index) => {
          return (<CategoriesOptionItem 
                  key={index} urlIcon={category?.image ? category?.image : '/images/tapIcon.png'} 
                  name={language === "es" ? category?._i18n?.es?.name : category?._i18n?.en?.name}
                  // handleClick={() => handleSelectNavOption(category?._i18n?.es?.name?.toLowerCase())}
                  handleClick={() => handleSelectNavOption("activity")}
                  />)
        })}
      </section>
      }


      {/* ---------------------------------------actividades populares------------------------------------------- */}

      {requesting ? 
      <section className={styles.section_loading}>
        <div className={styles.h3_line}></div>
        <CardsList>
          {
          [1,2,3,4].map((item, index)=>(
              <div key={index} >
                  <Placeholder  style={{ margin:'auto', height: 164, width: 200 }}>
                  <Placeholder.Image />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                  </Placeholder>
              </div>
          ))
          }
        </CardsList>
      </section>
      :
      <section className={styles.popular_activities}>
          <CardsList title={t("home.popular_activities_txt")}>
            {
              popular_activities?.map((activity, index)=>(
                <Card 
                key={index}
                imgUrl={activity?.frontImage ? activity?.frontImage : ''} 
                title={activity?.name} 
                stars={activity?.avgRating}
                price={activity?.price}
                onClickGoTo={`profile/service/${language === "es" ? activity?._i18n?.es.slug : activity?._i18n?.en.slug}`}
                />
              ))
            }
          </CardsList>
      </section>
      }


      {/* {requesting ? 
      <section className={styles.section_loading}>
        <div className={styles.h3_line}></div>
        <CardsList>
          {
          [1,2,3,4].map((item, index)=>(
              <div key={index} >
                  <Placeholder  style={{ margin:'auto', height: 164, width: 200 }}>
                  <Placeholder.Image />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                  </Placeholder>
              </div>
          ))
          }
        </CardsList>
      </section>
      :
      <section className={styles.certifications}>
          <CardsList title={t("home.top_certifications_txt")}>
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
      </section>
      } */}

      {/* ---------------------------------------imagenes de lugares------------------------------------------- */}
      {requesting ? 
      <section className={styles.section_loading}>
        <div className={styles.h3_line}></div>
        <div className={styles.dream_reefs_grid}>
              <div className={styles.dream_reefs_img_container}>
                  <Placeholder fluid style={{ height: '100%', width: '100%' }}>
                  <Placeholder.Image/>
                  </Placeholder>
              </div>
              <div className={styles.dream_reefs_img_container}>
                  <Placeholder fluid style={{ height: '100%', width: '100%' }}>
                  <Placeholder.Image/>
                  </Placeholder>
              </div>
              <div className={styles.dream_reefs_img_container}>
                  <Placeholder fluid style={{ height: '100%', width: '100%' }}>
                  <Placeholder.Image/>
                  </Placeholder>
              </div>
              <div className={styles.dream_reefs_img_container}>
                  <Placeholder fluid style={{ height: '100%', width: '100%' }}>
                  <Placeholder.Image/>
                  </Placeholder>
              </div>
          </div>
      </section>
      :
      <section className={styles.dream_reefs}>
          <h2>{t("home.dream_destinations_txt")}</h2>
          <div className={styles.dream_reefs_grid}>
              {/* <Link href="/profile/zone/palancar"> */}
                <div className={styles.dream_reefs_img_container}>
                  <Image src="/images/selfi.jpg" layout="fill" objectFit="cover" />
                  <h1>Palancar</h1>
                </div>
              {/* </Link> */}

              {/* <Link href="/profile/zone/cedral"> */}
                <div className={styles.dream_reefs_img_container}>
                  <Image src="/images/tortu.jpg" layout="fill" objectFit="cover" />
                  <h1>Cedral</h1>
                </div>
              {/* </Link> */}

              {/* <Link href="/profile/zone/chankanaab"> */}
                <div className={styles.dream_reefs_img_container}>
                  <Image src="/images/snorkelman.jpg" layout="fill" objectFit="cover" />
                  <h1>Chankanaab</h1>
                </div>
              {/* </Link> */}

              {/* <Link href="/profile/zone/paraiso"> */}
                <div className={styles.dream_reefs_img_container}>
                  <Image src="/images/diver1.jpg" layout="fill" objectFit="cover" />
                  <h1>Paraiso</h1>
                </div>
              {/* </Link> */}

          </div>
      </section>
      }

      {/* ---------------------------------------centros------------------------------------------- */}

      {requesting ? 
      <section className={styles.section_loading}>
        <div className={styles.h3_line}></div>
        <CardsList>
          {
          [1,2,3,4].map((item, index)=>(
              <div key={index} >
                  <Placeholder  style={{ margin:'auto', height: 164, width: 200 }}>
                  <Placeholder.Image />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                  </Placeholder>
              </div>
          ))
          }
        </CardsList>
      </section>
      :
      <section className={styles.best_centers}>
          <CardsList title={t("home.the_best_centers_txt")} seeMoreLink={"center"}>
            {
              best_centers?.map((center, index)=>(
                <Card 
                key={center?._id}
                imgUrl={center?.frontImage ? center?.frontImage : ''} 
                title={center?.name} 
                stars={center?.avgRating}
                activities={10}
                onClickGoTo={`profile/center/${language === "es" ? center?._i18n?.es.slug : center?._i18n?.en.slug}`}
                />
              ))
            }
          </CardsList>
      </section>
      }

      {/* ---------------------------------------lugares para hospedarse------------------------------------------- */}

      {requesting ? 
      <section className={styles.section_loading}>
        <div className={styles.h3_line}></div>
        <CardsList>
          {
          [1,2,3,4].map((item, index)=>(
              <div key={index} >
                  <Placeholder style={{ margin:'auto', height: 164, width: 200 }}>
                  <Placeholder.Image />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                  </Placeholder>
              </div>
          ))
          }
        </CardsList>
      </section>
      :
      <section className={styles.to_relax}>
          <CardsList title={t("home.places_to_relax_txt")} seeMoreLink={"lodging"}>
            {places_to_relax.length > 0 &&
              places_to_relax.map((lodging, index)=>(
                <Card 
                key={index}
                imgUrl={lodging?.frontImage? lodging?.frontImage : "/images/beach.jpg"} 
                title={lodging?.name} 
                stars={lodging?.avgRating}
                price={lodging?.rooms.length>0 ? lodging?.rooms[0].price : 0}
                onClickGoTo={`/profile/hotel/${language === "es" ? lodging?._i18n?.es.slug : lodging?._i18n?.en.slug}`}
                />
              ))
            }
          </CardsList>
      </section>
      }

      {/* ---------------------------------------static section------------------------------------------- */}

    {requesting ? 
      <section className={styles.care_of_the_planet}>
          <div className={styles.care_of_the_planet_img_container}>
            <Placeholder fluid style={{ height: '100%', width: '100%' }}>
              <Placeholder.Image/>
            </Placeholder>
          </div>

          <div className={styles.care_of_the_planet_info_container}>
              <div className={styles.h3_line}></div>
              <Placeholder>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
          
          </div>
      </section>
      :
      <section className={styles.care_of_the_planet}>
          <div className={styles.care_of_the_planet_img_container}>
            <Image src={"/images/diving.jpg"} layout="fill" objectFit="cover"/>
          </div>
          <div className={styles.care_of_the_planet_info_container}>
            <h2>
            {t("home.lets_protect_the_planet_together_txt")}
            </h2> 
            <p>
              {t("home.lets_protect_the_planet_together_paragraph_txt")}
              </p>

              <Link href={language === 'en' ? "https://web.diveandbed.com/acs/" : "https://web.diveandbed.com/es/acsdnb/"}>
                <div className={styles.care_of_the_planet_btn_wrapper}>
                  <Button  height={"38px"}> {t("common.know_more_txt")} </Button>
                </div>
              </Link>
          </div>
      </section>
      }

      {/* ---------------------------------------reviews------------------------------------------- */}

      <section className={styles.reviews}>
        <h2 className={styles.reviews_title}>
            {t("home.reviews_title_txt")}
        </h2>
        <div className={styles.reviews_container}>
        {!requesting ? 
          <Review
          userImg={"/images/review_user_2.png"}
          userName={"Luis Vasquez"}
          userOpinion={t("home.review_user_1_txt")}
          />
        :
          <Placeholder >
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        }

        {!requesting ? 
          <Review
          userImg={"/images/user.jpg"}
          userName={"Luis Vasquez"}
          userOpinion={t("home.review_user_2_txt")}
          />
        :
          <Placeholder >
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        }

        {!requesting ? 
          <Review
          userImg={"/images/review_user_2.jpg"}
          userName={"Luis Vasquez"}
          userOpinion={t("home.review_user_3_txt")}
          />
        :
          <Placeholder >
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        }

        {!requesting ? 
          <Review
          userImg={"/images/userImg.png"}
          userName={"Luis Vasquez"}
          userOpinion={t("home.review_user_4_txt")}
          />
        :
          <Placeholder >
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        }
        </div>
      </section>
      
      {/* ---------------------------------------static section------------------------------------------- */}

      <section className={styles.next_adventure}>
            <h2>{t("home.next_adventure_txt")}</h2>
            <div className={styles.next_adventure_btn_wrapper}>
              <Button handleClick={() => handleSelectNavOption("diving")} height={"38px"}>{t("common.start_txt")}</Button>
            </div>
      </section>
      <Footer/>
      <WhatWouldYouLikeToDoModalFilter/>
      {side_menu_mobile_isOpen && <MenuSideMobileModal/>}
    </div>
  );
}

export default Home;