import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Icon, Modal } from 'semantic-ui-react';
import moment from 'moment';

//components
import Button from '../../Button';
import InputDate from '../../InputDate';

//styles
import styles from './styles.module.css';

//actions
import { 
    toggleWhatWouldYouLikeTodoModal 
} from '../../../redux/searchActivity/actions';

import { 
    searchChangeValues,
    searchRequesting,
    searchAddDiver,
    searchDeleteDiver,
} from '../../../redux/searchActivity/actions';

//interfaces
import {
    ISearchActivityState
} from '../../../ts-types/custom.types';
import { useTranslation } from 'react-i18next';


function WhatWouldYouLikeToDoModalFilter() {
    
    const dispatch = useDispatch();
    const router = useRouter();
    const [t, i18n] = useTranslation("global"); 

    const { language } = useSelector((state : any) => state.languageReducer);

    const {
        requesting,
        success,

        isOpen_whatwouldyouliketodo_modal,
        values,
        values:{
            type,
            levelExperience,
            // language,
            startDate,
            endDate,
            pax,
            // minPrice,
            // maxPrice,
            // sortBy,
            // sortOrder,
            // subCategory_id,
            // zones,
            // services,
            // languages,
        },
    } = useSelector((state: ISearchActivityState) => state.searchActivityReducer);

    const handleChangePax = (pax_quantity: number) => {
        if(pax_quantity > 0){
            dispatch(searchAddDiver(
                {
                    name:'',
                    email:'',
                    tel:'',
                    experience:0,
                    language:'es'
                }
            ))
        }else{
            if(pax.length > 1)
            dispatch(searchDeleteDiver())
        }
        // dispatch(searchChangeValues("pax", pax_quantity))
    }


    const handleDateChange  = (key:string, value:string) => {
        dispatch(searchChangeValues(key, value));
    }


    const handleSearch  = () => {
        dispatch(searchRequesting(values, language));
        dispatch(toggleWhatWouldYouLikeTodoModal(false));
    }



    useEffect(() => {
        const today = new Date();
        dispatch(searchChangeValues("startDate", moment(today).format('DD-MM-YYYY')));
        
        let tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        dispatch(searchChangeValues("endDate", moment(tomorrow).format('DD-MM-YYYY')));

        dispatch(searchChangeValues("language", language));
    },[])




    useEffect(() => {
        //verifica si se cargaron los datos con exito y luego cambia a la pagina de la busqueda
        if (success) {
            if (router.pathname !== '/search') {
                dispatch(toggleWhatWouldYouLikeTodoModal(false));
                router.push(`/search/${type}`);
            }
        }
    }, [success, router]);

    return (
        <Modal
            size={"tiny"}
            open={isOpen_whatwouldyouliketodo_modal}
            onClose={() => dispatch( toggleWhatWouldYouLikeTodoModal(false) ) }
            className={styles.WhatWouldYouLikeToDoModalFilter}
        >
        <div className={styles.modal_container}>
            <div className={styles.activities_container}>
                <div 
                className={type === "diving" ? styles.activity_selected : styles.activity}
                onClick={() => dispatch(searchChangeValues("type", "diving"))}>
                {t("WhatWouldYouLikeToDoModalFilterComponent.dive_txt")}
                </div>
                <div 
                className={type === "snorkeling" ? styles.activity_selected : styles.activity}
                onClick={() => dispatch(searchChangeValues("type", "snorkeling"))}>
                {t("WhatWouldYouLikeToDoModalFilterComponent.snorkel_txt")}
                </div>
                <div 
                className={type === "certificate" ? styles.activity_selected : styles.activity}
                onClick={() => dispatch(searchChangeValues("type", "certificate"))}>
                {t("WhatWouldYouLikeToDoModalFilterComponent.certifications_txt")}
                </div>
                <div 
                className={type === "lodging" ? styles.activity_selected : styles.activity}
                onClick={() => dispatch(searchChangeValues("type", "lodging"))}>
                {t("WhatWouldYouLikeToDoModalFilterComponent.lodging_txt")}
                </div>
            </div>
            {type !== "lodging" &&
            <>
                <p className={styles.p_questions_txt}>¿Cual es tu nivel? </p>
                <div className={styles.levels_exp_container}>
                    <div className={levelExperience === 0 ? styles.exp_option_selecte : styles.exp_option}
                    onClick={() => dispatch(searchChangeValues("levelExperience", 0))}>
                        {t("WhatWouldYouLikeToDoModalFilterComponent.lvl_experience_0_txt")}
                    </div>
                    <div className={levelExperience === 1 ? styles.exp_option_selecte : styles.exp_option}
                    onClick={() => dispatch(searchChangeValues("levelExperience", 1))}>
                        {t("WhatWouldYouLikeToDoModalFilterComponent.lvl_experience_1_txt")}
                    </div>
                    <div className={levelExperience === 2 ? styles.exp_option_selecte : styles.exp_option}
                    onClick={() => dispatch(searchChangeValues("levelExperience", 2))}>
                        {t("WhatWouldYouLikeToDoModalFilterComponent.lvl_experience_2_txt")}
                    </div>
                    <div className={levelExperience === 3 ? styles.exp_option_selecte : styles.exp_option}
                    onClick={() => dispatch(searchChangeValues("levelExperience", 3))}>
                        {t("WhatWouldYouLikeToDoModalFilterComponent.lvl_experience_3_txt")}
                    </div>
                </div>
            </>
            }
            <p className={styles.p_questions_txt}>{t("WhatWouldYouLikeToDoModalFilterComponent.how_may_people_question_txt")}</p>
            <div className={styles.quantity_btns_container}>
                <button onClick={() => handleChangePax(-1)}>-</button>
                <div className={styles.quantity_people}>{pax.length}</div>
                <button onClick={() => handleChangePax(1)}>+</button>
            </div>

            <p className={styles.p_questions_txt}>{t("WhatWouldYouLikeToDoModalFilterComponent.date_txt")}</p>
            <div className={styles.dates_container}>
                <div>
                    <InputDate name="startDate" value={moment(startDate).format('YYYY-MM-DD')} onDateChange={handleDateChange}/>
                </div>
            
                {type === "lodging" &&
                    <>
                        <p className={styles.p_questions_until_txt}>{t("WhatWouldYouLikeToDoModalFilterComponent.until_txt")}</p>
                        <InputDate name="endDate" value={moment(endDate).format('YYYY-MM-DD')} onDateChange={handleDateChange}/>
                    </>
                }
            </div>

            <div className={styles.btn_container}>
            <Button loading={requesting} handleClick={() => handleSearch()} height={"42px"}>{t("common.share_txt")}</Button>
            </div>

        </div>
      </Modal>
    );
}

export default WhatWouldYouLikeToDoModalFilter;