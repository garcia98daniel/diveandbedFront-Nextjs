import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/language/actions';
import SelectInput from '../SelectInput';
//styles
import styles from "./styles.module.css";

function InputChangeLanguage() {
    const dispatch = useDispatch();

    const [t, i18n] = useTranslation("global");

    const { language } = useSelector((state : any) => state.languageReducer);

    const handleChangeLanguage = (e : React.ChangeEvent<HTMLSelectElement>) =>{
      i18n.changeLanguage(e.target.value);
      dispatch(setLanguage(e.target.value))
    }

    return (

            <SelectInput 
            handleChangeSelectInput={(e) => handleChangeLanguage(e)} 
            inputName={"Idioma"}
            bg={"#E2E8F0"}
            >
                <option selected={language == "es"} value="es">Spanish</option>
                <option selected={language == "en"} value="en">English</option>
            </SelectInput>
    );
}

export default InputChangeLanguage;