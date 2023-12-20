import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import {Icon} from "semantic-ui-react";
import { searchChangeValues, searchResetZonesServicesLanguage } from '../../redux/searchActivity/actions';
import { ISearchActivityState } from '../../ts-types/custom.types';
import styles from "./styles.module.css";

interface CardsListProps{
    title?: string,
    children: React.ReactNode,
    seeMoreLink?: string
}
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          centerMode: true,
          centerPadding: "40px",
        }
      }
    ]
  };
function CardsList({title, children, seeMoreLink}:CardsListProps) {
  const router = useRouter();

    const dispatch = useDispatch();

    const [t, i18] = useTranslation("global");

    const { language } = useSelector((state: any) => state.languageReducer);

    const {
        requesting,
        success,

        isOpen_whatwouldyouliketodo_modal,
        values,
    } = useSelector((state: ISearchActivityState) => state.searchActivityReducer);
    const { logged, token } = useSelector((state: any) => state.clientReducer);

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
    // dispatch(searchAddDiver(
    //     {
    //         name:'',
    //         email:'',
    //         tel:'',
    //         experience:0,
    //         language:'es'
    //     }
    // ))
    dispatch(searchChangeValues("minPrice", 0));
    dispatch(searchChangeValues("maxPrice", 0));
    dispatch(searchChangeValues("sortBy", "recent"));
    dispatch(searchChangeValues("sortOrder", "sdc"));
    dispatch(searchChangeValues("subCategory_id", ""));
    dispatch(searchResetZonesServicesLanguage());
    router.push(`/search/${navOption}`);

  };


    return (
        <div className={styles.cardsList}>
            <div className={styles.tittle_container}>
              <h2>{title}</h2>
              {seeMoreLink && 
              <a onClick={() => handleSelectNavOption(seeMoreLink)}>ver más</a>
              }
            </div>
            <Slider {...settings}>
                  {children}
            </Slider>
        </div>
    );
}

export default CardsList;