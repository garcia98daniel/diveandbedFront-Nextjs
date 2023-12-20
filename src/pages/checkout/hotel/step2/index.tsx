import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

//styles
import styles from './styles.module.css';

//components
import StepsCheckOut from '../../../../components/StepsCheckOut';
import Image from 'next/image';
import ProtectedPage from '../../../../components/ProtectedPage';
// import Input from '../../../../components/Input';
// import SelectInput from '../../../../components/SelectInput';
// import Button from '../../../../components/Button';
import { Form, Checkbox, Icon, Input, Label } from 'semantic-ui-react';
import LodgingCheckOutCard from '../../../../components/LodgingCheckOutCard';
import { ISearchActivityState } from '../../../../ts-types/custom.types';
import MyPayPalButton from '../../../../components/MyPaypalButton';

//actions
import { createCheckOutLodgingReservationRequesting } from '../../../../redux/checkOutLodging/actions';

function Step2() {
    const router = useRouter();
    const [openInfoReservation, setOpenInfoReservation] = useState<boolean>(false);
    
    const [t, i18n] = useTranslation("global"); 

    const { 
        values,
        success,
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

    // const handleChangeInput = (name:string, value:string) => {
    //     console.log(name, value)
    // }

    useEffect(() => {
        if(!lodging_id){
            router.push("/")
        }   
    },[])

    const { 
        user,
        profilePhotosModal,
    } = useSelector((state:any) => state.userReducer);

    const form_values = {
        user:user ? user?._id : "",
        userName: pax ? pax[0]?.name :"",
        email: pax ? pax[0]?.email :"",				
        bookingType: "lodging",	
        // activity: service_id,				
        lodging: lodging_id,				
        room: room_selected?._id,				
        language: pax ? pax[0]?.language : "es",				
        experience: pax ? Number(pax[0]?.experience) : 0,				
        phone:pax ? pax[0]?.tel : "es",			
        entryDate: startDate,			
        departureDate: endDate,	 //los servicios demoran 1 solo dia	
        numberPeople: pax ? pax.length : 1,				
        companion: pax ? pax.slice(1) : []
    }

    const [money_to_contribute, set_money_to_contribute] = useState<string>("7");
    const [other_amount_contribute, set_other_amount_contribute] = useState<boolean>(false);

    const handleChangeAmoutToContribute = (e, data) => {
        set_other_amount_contribute(false)
        set_money_to_contribute(data.value.toString())
    }

    useEffect(() => {
        if(success)
        router.push("/checkout/success")
    },[success])

    return (
        <div className={styles.CheckOutService_page}>

            <StepsCheckOut step={2}/>

            <div className={styles.main} >
                <section className={styles.left_section}>
                    <div className={styles.go_back_container} onClick={() => router.back()}>
                        <Icon name="arrow left" size="large"/>
                        <p>{t("common.go_back_txt")}</p>
                    </div>

                    <h1 className={styles.reserve_with_cause_txt}>{t("hotelCheckOut_step2.reserve_with_cause_txt")}</h1>

                    <ProtectedPage/>

                    <div className={styles.notice_container}>
                        <div className={styles.logo_notice_container}>
                            <Image src="/images/i.svg" layout="fill"  objectFit="contain"/>
                        </div>
                        <p>
                            {t("hotelCheckOut_step2.information_process_txt")}
                        </p>
                    </div>

                    <div className={styles.info_reservation} onClick={() => setOpenInfoReservation(prevState => !prevState)}>
                        <h3>{t("hotelCheckOut_step2.reservation_details_txt")}</h3>
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

                    <Form className={styles.form}>

                        <h3>{t("hotelCheckOut_step2.take_care_conzumel_txt")}</h3>
                        <p>
                            {t("hotelCheckOut_step2.contribute_txt")}
                        </p>

                        <div className={styles.donors_container}>
                            <div className={styles.donors_img_container}>
                                <Image src="/images/buzos.jpg" layout="fill"  objectFit="contain"/>
                            </div>
                            <small>{t("hotelCheckOut_step2.people_who_contributed_txt")}</small>
                        </div>

                        <div className={styles.value_wrapper}>
                            <h3>{t("hotelCheckOut_step2.contribute_with_x_money_txt")} ${money_to_contribute} usd</h3>

                            <div className={styles.row}>
                                <Icon name="lock" />
                                <p>{t("hotelCheckOut_step2.encrypted_pay_txt")}</p>
                            </div>
                        </div>

                        {/* <p>Tarjeta de crédito o débito</p>
                        <div className={styles.paymentsway_img_container}>
                            <Image src="/images/paymentsway.jpg" layout="fill"  objectFit="contain"/>
                        </div>

                        <Input 
                            labelName="Número de tarjeta" 
                            inputType="text" 
                            handleChangeInput={handleChangeInput}  
                            inputValue="" 
                            inputName="creditcard"
                        />

                        <div className={styles.inputs_container}>
                            <label>Fecha de vencimiento</label>
                            <div className={styles.inputs_expiration_date_container}>
                                <SelectInput bg={"#E2E8F0"} inputName={"opinions_orderby"} handleChangeSelectInput={changeSelectInput}>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </SelectInput>
                                <SelectInput bg={"#E2E8F0"} inputName={"opinions_orderby"} handleChangeSelectInput={changeSelectInput}>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </SelectInput>
                            </div>
                        </div>

                        
                        <div className={styles.cvv_container}>
                            <Input 
                                labelName="Código CVV" 
                                inputType="text" 
                                handleChangeInput={handleChangeInput}  
                                inputValue="" 
                                inputName="CVV"
                            />

                            <div className={styles.cvv_img_container}>
                                <Image src="/images/cvv.jpg" layout="fill"  objectFit="contain"/>
                            </div>
                        </div>

                        <div className={styles.inputs_container}>
                            <h3>Dirección de facturación</h3>

                            <div className={styles.adress_container}>
                                <div className={styles.adress}>
                                    <label>País</label>
                                    <SelectInput bg={"#E2E8F0"} inputName={"opinions_orderby"} handleChangeSelectInput={changeSelectInput}>
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </SelectInput>
                                </div>
                                <Input 
                                    labelName="Código Postal" 
                                    inputType="text" 
                                    handleChangeInput={handleChangeInput}  
                                    inputValue="" 
                                    inputName="CVV"
                                />
                            </div>
                        </div>
                        */}
                        <Form.Field>
                            <Checkbox
                            radio
                            label='Aportar 7.00 usd'
                            name='checkboxRadioGroup'
                            value='7'
                            checked={money_to_contribute === '7'}
                            onChange={(e, data) => handleChangeAmoutToContribute(e, data)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                            radio
                            label='Aportar 15.00 usd'
                            name='checkboxRadioGroup'
                            value='15'
                            checked={money_to_contribute === '15'}
                            onChange={(e, data) => handleChangeAmoutToContribute(e, data)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                            radio
                            label='Aportar 25.00 usd'
                            name='checkboxRadioGroup'
                            value='25'
                            checked={money_to_contribute === '25'}
                            onChange={(e, data) => handleChangeAmoutToContribute(e, data)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                            radio
                            label='Aportar otra cantidad usd'
                            name='checkboxRadioGroup'
                            value='other'
                            checked={other_amount_contribute === true}
                            onChange={() => {
                                set_money_to_contribute("26")
                                set_other_amount_contribute(true)
                            }}
                            />
                        </Form.Field>
                        {other_amount_contribute && 
                            <div className={styles.input_other_amount}>
                            <Input labelPosition='right' type='text' placeholder='Amount'>
                                <Label basic>$</Label>
                                <input value={money_to_contribute}  onChange={(e) => set_money_to_contribute(e.target.value)}/>
                                <Label>.00</Label>
                            </Input>
                            </div>
                        }

                        <MyPayPalButton 
                        money_to_contribute={money_to_contribute}
                        values={form_values} 
                        />
                    </Form>
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

        </div>
    );
}

export default Step2;