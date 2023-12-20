import { useDispatch, useSelector } from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';

//styles
import styles from './styles.module.css';

//components
import StepsCheckOut from '../../../components/StepsCheckOut';
import { Icon } from 'semantic-ui-react';
import Image from 'next/image';
import ProtectedPage from '../../../components/ProtectedPage';
import Input from '../../../components/Input';
import SelectInput from '../../../components/SelectInput';
import Button from '../../../components/Button';
import ServiceCheckOutCard from '../../../components/ServiceCheckOutCard';
import ServiceCheckOutCardModal from '../../../components/Modals/ServiceCheckOutCardModal';

//actions
import { searchChangePaxValues } from '../../../redux/searchActivity/actions';

//interfaces
import {
    ISearchActivityState
} from '../../../ts-types/custom.types';
import { useTranslation } from 'react-i18next';

function CheckOutService() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [t, i18n] = useTranslation("global"); 

    const [openInfoReservation, setOpenInfoReservation] = useState<boolean>(false);

    const { 
        user,
        user:{
            name,
            email,
        },
    } = useSelector((state:any) => state.userReducer);
    
    const { 
        values,
        values:{
            service_id,
            service_name,
            service_rate,
            service_img,
            price_per_pax,
        } 
    } = useSelector((state:any) => state.checkOutServiceReducer);

    const {
        values:{pax, startDate},
    } = useSelector((state: ISearchActivityState) => state.searchActivityReducer);

    const handleChangeInput = (name:string, value:string, index:number) => {
        // console.log(name, value, index)
        dispatch(searchChangePaxValues(name, value, index))
    }

    
    const changeSelectInput = (event: React.ChangeEvent<HTMLSelectElement>, index:number) => {
        // setState({ ...state, [event.target.name]: event.target.value.trim() });
        dispatch(searchChangePaxValues(event.target.name, event.target.value.trim(), index))
    };
    

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push("/checkout/service/step2");

    };

    //useEffect to see if user chose a service
    useEffect(() => {
        if(!service_id){
           router.push("/")
        }   
    },[])
    


    return (
        <div className={styles.CheckOutService_page}>
            <StepsCheckOut step={1}/>

            <div className={styles.main} >
                <section className={styles.left_section}>
                    <div onClick={() => router.back()} className={styles.go_back_container}>
                        <Icon name="arrow left" size="large"/>
                        <p>{t("common.go_back_txt")}</p>
                    </div>

                    <h1 className={styles.reserve_with_cause_txt}>{t("hotelCheckOut.reserve_with_cause_txt")}</h1>

                    <ProtectedPage/>

                    <div className={styles.notice_container}>
                        <div className={styles.logo_notice_container}>
                            <Image src="/images/i.svg" layout="fill"  objectFit="contain"/>
                        </div>
                        <p>
                            {t("hotelCheckOut.information_process_txt")}
                        </p>
                    </div>

                    <div className={styles.info_reservation} onClick={() => setOpenInfoReservation(prevState => !prevState)}>
                        <h1>{t("hotelCheckOut.reservation_details_txt")}</h1>
                        <Icon name="chevron up" size="large"/>
                    </div>
                    {openInfoReservation && 
                        <div className={styles.CheckOutCard_wrapper}>
                            <ServiceCheckOutCard 
                            service_id={service_id}
                            service_name={service_name}
                            service_rate={service_rate}
                            service_img={service_img}
                            pax={pax}
                            date={startDate}
                            price_per_pax={price_per_pax}
                            />
                        </div>
                    }

                    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                        <h1 className={styles.info_diver_txt}>{t("serviceCheckOut.divers_info_txt")}</h1>
                        <h3>{t("serviceCheckOut.main_diver_txt")}</h3>

                        <Input 
                            labelName={t("hotelCheckOut.input_full_name_txt")}
                            inputType="text" 
                            handleChangeInput={handleChangeInput}  
                            inputValue={pax[0].name} 
                            inputName="name"
                            index={0}
                            required
                        />

                        <Input 
                            labelName={t("hotelCheckOut.input_mail_txt")}
                            inputType="text" 
                            handleChangeInput={handleChangeInput}  
                            inputValue={pax[0].email}  
                            inputName="email"
                            index={0}
                            required
                        />

                        <Input 
                            labelName={t("hotelCheckOut.input_phone_txt")}
                            inputType="text" 
                            handleChangeInput={handleChangeInput}  
                            inputValue={pax[0].tel}  
                            inputName="tel"
                            index={0}
                            required
                        />

                        <div className={styles.select_wrapper}>
                            <label className={styles.select_label}>{t("serviceCheckOut.input_lvl_txt")}</label>
                            <SelectInput bg={"#E2E8F0"} inputName={"experience"} handleChangeSelectInput={changeSelectInput} index={0}>
                                <option value={0}>{t("serviceCheckOut.opt_0_lvl_txt")}</option>
                                <option value={1}>{t("serviceCheckOut.opt_1_lvl_txt")}</option>
                                <option value={2}>{t("serviceCheckOut.opt_2_lvl_txt")}</option>
                                <option value={3}>{t("serviceCheckOut.opt_3_lvl_txt")}</option>
                            </SelectInput>
                        </div>

                        <div className={styles.select_wrapper}>
                            <label className={styles.select_label}>{t("serviceCheckOut.language_txt")}</label>
                            <SelectInput bg={"#E2E8F0"} inputName={"language"} handleChangeSelectInput={changeSelectInput} index={0}>
                                <option value="es">Español</option>
                                <option value="en">English</option>
                            </SelectInput>
                        </div>

                        {
                            pax.slice(1)?.map((buzo, index) => (
                                <>
                                    <h3>{t("serviceCheckOut.diver_txt")} n° {index + 2}</h3>

                                    <Input 
                                        required
                                        labelName="Nombre completo" 
                                        inputType="text" 
                                        handleChangeInput={handleChangeInput}  
                                        inputValue={pax[index+1].name} 
                                        inputName="name"
                                        index={index + 1}
                                    />
                                
                                    <div className={styles.select_wrapper}>
                                        <label className={styles.select_label}>Nivel</label>
                                        <SelectInput bg={"#E2E8F0"} inputName={"experience"} handleChangeSelectInput={changeSelectInput} index={index+1}>
                                            <option value={0}>{t("serviceCheckOut.opt_0_lvl_txt")}</option>
                                            <option value={1}>{t("serviceCheckOut.opt_1_lvl_txt")}</option>
                                            <option value={2}>{t("serviceCheckOut.opt_2_lvl_txt")}</option>
                                            <option value={3}>{t("serviceCheckOut.opt_3_lvl_txt")}</option>
                                        </SelectInput>
                                    </div>

                                    <div className={styles.select_wrapper}>
                                        <label className={styles.select_label}>{t("serviceCheckOut.language_txt")}</label>
                                        <SelectInput bg={"#E2E8F0"} inputName={"language"} handleChangeSelectInput={changeSelectInput} index={index +1}>
                                            <option value="es">Español</option>
                                            <option value="en">English</option>
                                        </SelectInput>
                                    </div>
                                
                                </>
                            ))
                        }
                        <div className={styles.btn_form_wrapper}>
                            <Button 
                            height="36px" 
                            handleClick={() => {}}
                            >
                                {t("common.continue_txt")}
                            </Button>
                        </div>
                    </form>
                </section>

                <section className={styles.right_section}>
                    <ServiceCheckOutCard
                    service_id={service_id}
                    service_name={service_name}
                    service_rate={service_rate}
                    service_img={service_img}
                    pax={pax}
                    date={startDate}
                    price_per_pax={price_per_pax}
                    />
                </section>
            </div>
            <ServiceCheckOutCardModal/>
        </div>
    );
}

export default CheckOutService; 