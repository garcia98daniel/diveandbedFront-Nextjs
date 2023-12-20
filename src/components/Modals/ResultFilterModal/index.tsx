import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Icon, Loader, Modal } from 'semantic-ui-react';
import Button from '../../Button';
import CheckBox from '../../CheckBox';
import Input from '../../Input';
import SelectInput from '../../SelectInput';
import styles from './styles.module.css';


//actions
import {
    toggleFilterModal,
} from "../../../redux/searchPage/actions";

import { 
    searchChangeValues,
    searchRequesting,
    filterAddZone,
    filterDeleteZone,
    filterAddService,
    filterDeleteService,
    filterAddLanguage,
    filterDeleteLanguage,
    filterClear,
    getFilterOptionsRequesting,
} from '../../../redux/searchActivity/actions';

//Interfaces
import { ISearchActivityState, } from '../../../ts-types/custom.types';
import { useTranslation } from 'react-i18next';


function ResultFilterModal() {
    const dispatch = useDispatch();
    
    const { language } = useSelector((state: any) => state.generalsEffectsReducer);

  const [t, i18n] = useTranslation("global");  


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
            pax,
            minPrice,
            maxPrice,
            sortBy,
            sortOrder,
            subCategory_id,
            zones,
            services,
            languages,
        },

        filterOptions,
    } = useSelector((state: ISearchActivityState) => state.searchActivityReducer);

    
    const {
        isOpen_filter_modal
    } = useSelector((state : any) => state.searchPageReducer);
    
    const handleChangeInput = (name:string, value:string) => {
        dispatch(searchChangeValues(name, value));
    }

    const changeSelectInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
       dispatch(searchChangeValues("sortBy", event.target.value));
    };

    const handleCheckZones = (newzone:string) => {

        if(zones.some(zone => zone === newzone)){
            dispatch(filterDeleteZone(newzone));
        }
        else{
            dispatch(filterAddZone(newzone));
        }

    }

    const handleCheckServices = (newservice:string) => {

        if(services.some(service => service === newservice)){
            dispatch(filterDeleteService(newservice));
        }
        else{
            dispatch(filterAddService(newservice));
        }

    }

    const handleCheckLanguages = (newlanguage:string) => {

        if(languages.some(language => language === newlanguage)){
            dispatch(filterDeleteLanguage(newlanguage));
        }
        else{
            dispatch(filterAddLanguage(newlanguage));
        }

    }

    const handleSearch = () => {
        dispatch(searchRequesting(values, language));
        dispatch(toggleFilterModal(false));
    }
    const handleClearFilter = () => {
        dispatch(filterClear());
    }

    useEffect(() => {
        if(isOpen_filter_modal){
            dispatch(getFilterOptionsRequesting(values))
        }
    },[isOpen_filter_modal]);

    return (
        <Modal
            size={"tiny"}
            open={isOpen_filter_modal}
            onClose={() => dispatch(toggleFilterModal(false))}
        >
        <div className={styles.modal_container}>
                {requesting &&
                    <Dimmer active inverted>
                        <Loader inverted content='Loading' />
                    </Dimmer>
                }
            <div className={styles.row}>
                <h2>{t("ResultFilterModal.filters_txt")}</h2>

                <button onClick={() => dispatch(toggleFilterModal(false))}><Icon name="x" size="large"/></button>
            </div>

            <p>{t("ResultFilterModal.sort_by_txt")}</p>
            <div className={styles.selectInput_wrapper}>
                <SelectInput 
                    bg={"#FFFFFF"} 
                    inputName={"opinions_orderby"} 
                    handleChangeSelectInput={changeSelectInput}
                >
                    <option value="asc">{t("ResultFilterModal.latest_txt")}</option>
                    <option value="desc">{t("ResultFilterModal.least_recent_txt")}</option>
                </SelectInput>
            </div>

            <p>{t("ResultFilterModal.price_range_txt")} (USD)</p>
            <div className={styles.inputs_wrapper}>
                <Input 
                    labelName="" 
                    inputType="text" 
                    handleChangeInput={handleChangeInput}  
                    inputValue={minPrice === 0 ? "" : minPrice} 
                    inputName="minPrice"
                    bg="transparent"
                    placeHolder="Min"
                />
                <Input 
                    labelName="" 
                    inputType="text" 
                    handleChangeInput={handleChangeInput}  
                    inputValue={maxPrice === 0 ? "" : maxPrice} 
                    inputName="maxPrice"
                    bg="transparent"
                    placeHolder="Máx"
                />
            </div>

            <p>{t("ResultFilterModal.zone_txt")}</p>
            <div className={styles.chackboxs_wrapper}>
                {
                    filterOptions?.zones?.map((itemZone, index) => (
                        <CheckBox 
                        key={index} 
                        name={itemZone.name} 
                        isChecked={zones.some(zone => zone === itemZone.name)}
                        handleCheck={handleCheckZones}/>

                    ))

                }
            </div>

            <p>{t("ResultFilterModal.services_txt")}</p>
            <div className={styles.chackboxs_wrapper}>
                {
                    filterOptions?.services?.map((itemService, index) => (
                        <CheckBox 
                        key={index} 
                        name={itemService.name} 
                        isChecked={services.some(service => service === itemService.name)}
                        handleCheck={handleCheckServices}/>

                    ))

                }
            </div>

            <p>{t("ResultFilterModal.languages_txt")}</p>
            <div className={styles.chackboxs_wrapper}>
                {
                    filterOptions?.languages?.map((itemLanguage, index) => (
                        <CheckBox 
                        key={index} 
                        name={itemLanguage.name} 
                        isChecked={languages.some(language => language === itemLanguage.name)}
                        handleCheck={handleCheckLanguages}/>

                    ))

                }
            </div>

            <div className={styles.btns_container}>
                <Button
                    inverted
                    handleClick={() => handleClearFilter()}
                    height="40px"
                >
                    {t("ResultFilterModal.clear_txt")} 
                </Button>
                <Button
                    loading={requesting}
                    handleClick={() => handleSearch()}
                    height="40px"
                >
                    {t("ResultFilterModal.see_result_txt")} 
                </Button>
            </div>
        </div>
      </Modal>
    );
}

export default ResultFilterModal;