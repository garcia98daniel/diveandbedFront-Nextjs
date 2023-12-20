import React, {useState, useEffect} from 'react';

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
import LodgingCheckOutCard from '../../../components/LodgingCheckOutCard';
import LodgingRoomsNoSearchModal from '../../../components/Modals/LodgingRoomsNoSearchModal';
import { searchChangePaxValues } from '../../../redux/searchActivity/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ISearchActivityState } from '../../../ts-types/custom.types';
import { useRouter } from 'next/router';
import { toggleRoomsModal } from '../../../redux/lodgingPage/actions';
import { useTranslation } from 'react-i18next';


function CheckOutHotel() {
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
            lodging_id,
            lodging_name,
            lodging_rate,
            lodging_img,
            room_selected,
        } 
    } = useSelector((state:any) => state.checkOutLodgingReducer);

    const {
        values:{pax, startDate, endDate},
    } = useSelector((state: ISearchActivityState) => state.searchActivityReducer);

    const handleChangeInput = (name:string, value:string, index:number) => {
        dispatch(searchChangePaxValues(name, value, index))
    }

    
    const changeSelectInput = (event: React.ChangeEvent<HTMLSelectElement>, index:number) => {
        // setState({ ...state, [event.target.name]: event.target.value.trim() });
        dispatch(searchChangePaxValues(event.target.name, event.target.value.trim(), index))
    };
    

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push("/checkout/hotel/step2");

    };

    // useEffect to see if user chose a lodging
    
    useEffect(() => {
        if(!lodging_id){
           router.push("/")
        }   
    },[])

    const handleContinueBotton = () => {
        dispatch(toggleRoomsModal(false))
    }

    return (
        <div className={styles.CheckOutService_page}>

            <StepsCheckOut step={1}/>

            <div className={styles.main} >
                <section className={styles.left_section}>
                    <div className={styles.go_back_container} onClick={() => router.back()}>
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
                            <LodgingCheckOutCard
                            lodging_id={lodging_id}
                            lodging_name={lodging_name}
                            lodging_rate={lodging_rate}
                            lodging_room_name={room_selected?.name}
                            lodging_img={lodging_img}
                            pax={pax}
                            startDate={startDate}
                            endDate={endDate}
                            price_per_pax={room_selected?.price}
                            />
                        </div>
                    }

                    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                        <h1 className={styles.info_diver_txt}>{t("hotelCheckOut.travelers_info_txt")}</h1>
                        <h3>{t("hotelCheckOut.main_traveler_txt")}</h3>

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

                        {/* <div className={styles.select_wrapper}>
                            <label className={styles.select_label}>Nivel</label>
                            <SelectInput bg={"#E2E8F0"} inputName={"experience"} handleChangeSelectInput={changeSelectInput} index={0}>
                                <option value="0">Sin experiencia</option>
                                <option value="1">Básico</option>
                                <option value="2">Intermedio</option>
                                <option value="3">Avanzado</option>
                            </SelectInput>
                        </div> */}

                        <div className={styles.select_wrapper}>
                            <label className={styles.select_label}>{t("hotelCheckOut.language_txt")}</label>
                            <SelectInput bg={"#E2E8F0"} inputName={"language"} handleChangeSelectInput={changeSelectInput} index={0}>
                                <option value="es">Español</option>
                                <option value="en">English</option>
                            </SelectInput>
                        </div>

                        {
                            pax.slice(1)?.map((buzo, index) => (
                                <>
                                    <h3>{t("hotelCheckOut.traveler_txt")} n° {index + 2}</h3>

                                    <Input 
                                        required
                                        labelName={t("hotelCheckOut.input_full_name_txt")}
                                        inputType="text" 
                                        handleChangeInput={handleChangeInput}  
                                        inputValue={pax[index+1].name} 
                                        inputName="name"
                                        index={index + 1}
                                    />
                                
                                    {/* <div className={styles.select_wrapper}>
                                        <label className={styles.select_label}>Nivel</label>
                                        <SelectInput bg={"#E2E8F0"} inputName={"experience"} handleChangeSelectInput={changeSelectInput} index={index+1}>
                                            <option value="0">Sin experiencia</option>
                                            <option value="1">Básico</option>
                                            <option value="2">Intermedio</option>
                                            <option value="3">Avanzado</option>
                                        </SelectInput>
                                    </div> */}

                                    <div className={styles.select_wrapper}>
                                        <label className={styles.select_label}>{t("hotelCheckOut.language_txt")}</label>
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
                    <LodgingCheckOutCard
                    lodging_id={lodging_id}
                    lodging_name={lodging_name}
                    lodging_rate={lodging_rate}
                    lodging_room_name={room_selected?.name}
                    lodging_img={lodging_img}
                    pax={pax}
                    startDate={startDate}
                    endDate={endDate}
                    price_per_pax={room_selected?.price}
                    />
                </section>
            </div>
        <LodgingRoomsNoSearchModal handleContinueBotton={handleContinueBotton}/>                
        </div>
    );
}


export default CheckOutHotel;