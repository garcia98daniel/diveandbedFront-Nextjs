import { motion } from "framer-motion";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
//componets
import Input from "../../components/Input/index";
import Button from "../../components/Button/index";
import Alerts from "../../components/Alerts/index";
import ModalAlert from "../../components/Modals/ModalAlert/index";
//style
import styles from "./styles.module.css";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import {
  registerRequesting,
  registerChangeForm,
} from "../../redux/auth/register/actions";


function Register() {

  const router = useRouter();
  const dispatch = useDispatch();

  const [t, i18n] = useTranslation("global");  

  const {
    error,
    requesting,
    success,
    values,
    values: {name, email, password},
  } = useSelector((state : any) => state.registerReducer);

  const {alertModal} = useSelector((state:any)=> state.generalsEffectsReducer); 

  const { language } = useSelector((state : any) => state.languageReducer);

  const handleChangeInput = (name:string, value:string) => {
    dispatch(registerChangeForm(name, value));
  }

  const handleRegister = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerRequesting(values));
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  },[]);

  useEffect(() => {
    if(success){
      router.push("/login");
    }
  },[success])

  return (
    <div className={styles.register_page}>
      <div className={styles.form_register_container}>
          <div className={styles.logo_container}>
              <Image src="/images/logo_db.svg" layout="fill"  objectFit="cover"/>
          </div>
          <h1 className={styles.page_title}>{t("register.new_user_txt")}</h1>
          <div className={styles.user_can_do_text_li_container}>
            <li>{t("register.description_web_1_txt")}</li>
            <li>{t("register.description_web_2_txt")}</li>
            <li>{t("register.description_web_3_txt")}</li>
          </div>
          <form 
           onSubmit={(e) => handleRegister(e)}
           className={styles.form_input}>
            <Input 
              labelName={t("register.name_txt")} 
              inputType="text" 
              handleChangeInput={handleChangeInput}  
              inputValue={name}
              inputName="name"
            />
            <Input 
              labelName={t("common.email_txt")}
              inputType="text" 
              handleChangeInput={handleChangeInput}  
              inputValue={email}
              inputName="email"
            />
            <Input 
              labelName={t("common.password_txt")}
              inputType="password" 
              handleChangeInput={handleChangeInput}  
              inputValue={password}
              inputName="password"
              error={error && error?.message[0]}
            />
            {/* {error &&
              <small className={styles}>{error?.message[0]}</small>
            } */}
            <div className={styles.wrapper_btn}>
              <Button loading={requesting} height={"36px"}>{t("common.create_an_account_txt")}</Button>
            </div>
            <p className={styles.already_have_count_txt}>{t("register.already_have_an_account_txt")} <Link href="/login">{t("common.sign_in_txt")}</Link></p>
          </form>
      </div>
      <div className={styles.img_register_container}>
          <Image src="/images/registerImg.png" layout="fill"  objectFit="contain"/>
      </div>
      <ModalAlert
        show={alertModal.isOpen}
      >
        <Alerts/>
      </ModalAlert>
    </div>
  );
}

export default Register;
