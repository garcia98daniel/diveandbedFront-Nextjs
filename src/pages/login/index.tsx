import { motion } from "framer-motion";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
//componets
import Input from "../../components/Input/index";
import Button from "../../components/Button/index";
import { useTranslation } from "react-i18next";
//style
import styles from "./styles.module.css";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import {
  loginRequesting,
  loginChangeForm,
} from "../../redux/auth/login/actions";


function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");  

  const {
    values,
    values:{email, password},
    requesting,
    error,
    success,
  } = useSelector((state:any) => state.loginReducer);

  const { logged } = useSelector((state:any) => state.clientReducer);

  const { language } = useSelector((state : any) => state.languageReducer);

  useEffect(() => {
    i18n.changeLanguage(language);
  },[]);

  const handleChangeInput = (name:string, value:string) => {
    dispatch(loginChangeForm(name, value));
  }

  const handleLogin = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginRequesting(values));
  };

  useEffect(() => {
    if(logged){
        router.push("/")
    }
  },[logged])

  return (
    <div className={styles.login_page}>
      <div className={styles.form_login_container}>
          <div className={styles.logo_container}>
              <Image src="/images/logo_db.svg" layout="fill"  objectFit="cover"/>
          </div>
          <h1 className={styles.page_title}>{t("login.welcome_txt")}</h1>
          <form onSubmit={(e) => handleLogin(e)} className={styles.form_input}>
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
              error={error && error?.message}
            />
            <div className={styles.wrapper_btn}>

              <Button 
              loading={requesting}  
              height={"36px"}
              >{t("common.sign_in_txt")}</Button>

            </div>
            <p className={styles.already_have_count_txt}>{t("login.do_not_you_have_an_account_yet_txt")} <Link href="/register">{t("common.create_an_account_txt")}</Link></p>
          </form>
      </div>
      <div className={styles.img_login_container}>
          <Image src="/images/loginImg.jpg" layout="fill"  objectFit="contain"/>
      </div>
    </div>
  );
}

export default Login;
