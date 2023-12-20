import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

//styles
import styles from "./styles.module.css";
//components
import { Dimmer, Icon, Loader } from "semantic-ui-react";
import Nav from "../../components/Nav";
import Search from "../../components/Search";
import SubcategoryItem from "../../components/SubcategoryItem";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Map from "../../components/Map";
import ResultFilterModal from "../../components/Modals/ResultFilterModal";
import MenuSideMobileModal from "../../components/Modals/MenuSideMobileModal";
import WhatWouldYouLikeToDoModalFilter from "../../components/Modals/WhatWouldYouLikeToDoModalFilter";

//actions
import {
  toggleFilterModal,
  getSubcategoriesRequesting,
} from "../../redux/searchPage/actions";
import { ISearchActivityState } from "../../ts-types/custom.types";
import {
  searchChangeValues,
  searchRequesting,
} from "../../redux/searchActivity/actions";

function SearchResult() {
  const dispatch = useDispatch();

  const [t, i18n] = useTranslation("global");

  const [showMap, setShowMap] = useState<boolean>(false);

  const { side_menu_mobile_isOpen } = useSelector(
    (state: any) => state.generalsEffectsReducer
  );
  const { language } = useSelector((state: any) => state.languageReducer);

  const { subCategories, result } = useSelector(
    (state: any) => state.searchPageReducer
  );

  const {
    requesting,
    success,
    isOpen_whatwouldyouliketodo_modal,
    values,
    values: {
      type,
      levelExperience,
      // language,
      startDate,
      pax,
      // minPrice,
      // maxPrice,
      // sortBy,
      // sortOrder,
      subCategory_id,
      // zones,
      // services,
      // languages,
    },
  } = useSelector((state: ISearchActivityState) => state.searchActivityReducer);

  const handleChangeSubCategory = (id: string | number) => {
    dispatch(searchChangeValues("subCategory_id", id));
  };

  useEffect(() => {
    dispatch(getSubcategoriesRequesting());
    dispatch(searchRequesting(values, language));
  }, []);

  useEffect(() => {
    if (language) {
      dispatch(getSubcategoriesRequesting());
      dispatch(searchRequesting(values, language));
    }
  }, [language]);

  useEffect(() => {
    dispatch(searchRequesting(values, language));
  }, [type]);

  //   const [data, setData] = useState([
  //     {
  //         name:"Conoce el arrecife de Palancar",
  //         coordinates: "20.354951,-87.022216 ",
  //         avg:"4.5",
  //         price:250
  //     },
  //     {
  //         name:"Conoce el arrecife de Conzumel",
  //         coordinates: "20.517646,-86.941347",
  //         avg:"4.5",
  //         price:250
  //     },
  //     {
  //         name:"Conoce el arrecife de Paraizo",
  //         coordinates: "18.397274,-90",
  //         avg:"4.5",
  //         price:250
  //     },
  //   ]);

  return (
    <div className={styles.result}>
      {requesting && (
        <Dimmer active inverted>
          <Loader inverted content="Loading" />
        </Dimmer>
      )}
      <Nav />
      <div className={styles.input_wrapper}>
        <Search bg={"#E2E8F0"}>
          {type + " "}-{" " + pax.length} personas -
          {levelExperience === 0 && t("result.lvl_experience_0_txt")}
          {levelExperience === 1 && t("result.lvl_experience_1_txt")}
          {levelExperience === 2 && t("result.lvl_experience_2_txt")}
          {levelExperience === 3 && t("result.lvl_experience_3_txt")}-{" "}
          {startDate}
        </Search>
      </div>

        {type !== "zone" ?
          type !== "center" ?
            type !== "lodging" ?
                  <div className={styles.subcategories_container}>
                    {subCategories.length > 0 &&
                      subCategories?.map((category, index) => (
                        <SubcategoryItem
                          key={category._id}
                          id={category._id}
                          selected={subCategory_id == category._id}
                          urlIcon={
                            category.image ? category.image : "/images/tapIcon.png"
                          }
                          name={language === "es" ? category?._i18n?.es?.name : category?._i18n?.en?.name}
                          handleClick={handleChangeSubCategory}
                        />
                      ))
                    }
                  </div>
                  :
              <div></div>
            :
            <div></div>
          :
          <div></div>
        }

      <div className={styles.btn_container}>
      {type !== "zone" && result.length > 0 ?
        type !== "center" && result.length > 0 ?
          type !== "lodging" && result.length > 0 ?
            <div
              className={styles.filter_btn}
              onClick={() => dispatch(toggleFilterModal(true))}
            >
              <Icon name="sliders horizontal" size="large" />
              <p>{t("result.filters_txt")}</p>
            </div>
          :
          <div></div>
        :
        <div></div>
      :
      <div></div>
      }

      {result.length > 0 ?
        <div
          className={styles.map_btn}
          onClick={() => setShowMap((prev) => !prev)}
        >
          <Icon name="map outline" size="large" />
          {showMap ? (
            <p>{t("result.hide_map_txt")}</p>
          ) : (
            <p>{t("result.see_map_txt")}</p>
          )}
        </div>
          :
          <div></div>
      }
      </div>

      <div className={styles.result_cards_map_container}>
        <div className={styles.result_cards_btn_container}>
          <div className={styles.result_cards_container}>
            {result &&
              result.length > 0 ?
              result?.map((item, index) => (
                <Card
                  key={index}
                  imgUrl={item.frontImage}
                  title={item.name}
                  stars={type === "zone" ? -1 : item.avgRating}
                  price={item.rooms ? item.rooms[0].price : item.price}
                  onClickGoTo={
                    type === "diving" ||
                    type === "snorkeling" ||
                    type === "certificate" ||
                    type === "Fishing" ||
                    type === "Swimming" ||
                    type === "boats and yachts"
                      ? `/profile/service/${language === "es" ? item?._i18n?.es?.slug : item?._i18n?.en?.slug}`
                      : type === "center"
                      ? `/profile/center/${language === "es" ? item?._i18n?.es?.slug : item?._i18n?.en?.slug}`
                      : type === "zone"
                      ? `/profile/zone/${language === "es" ? item?._i18n?.es?.slug : item?._i18n?.en?.slug}`
                      :`/profile/hotel/${language === "es" ? item?._i18n?.es?.slug : item?._i18n?.en?.slug}`
                      
                  }
                />
              ))
              :
              <h1 className={styles.result_not_found}>Lo sentimos, no encontramos resultados para tu busqueda</h1>
            }
          </div>
          <div className={styles.btn_wrapper}>
            {/* <Button handleClick={() => {}} height="36px" inverted >{t("result.Load_more_txt")}</Button> */}
          </div>
        </div>
        {showMap && (
          <div className={styles.result_map_container}>
            <Map marks={result} />
          </div>
        )}
      </div>

      <Footer />

      <ResultFilterModal />
      <WhatWouldYouLikeToDoModalFilter />
      {side_menu_mobile_isOpen && <MenuSideMobileModal />}
    </div>
  );
}

export default SearchResult;
