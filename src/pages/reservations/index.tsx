import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import MenuSideMobileModal from '../../components/Modals/MenuSideMobileModal';
import Nav from '../../components/Nav';
import ReservationItem from '../../components/ReservationItem';

//styles
import styles from './styles.module.css';

//actions
import { getReservationsRequesting } from "../../redux/reservationsPage/actions";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { IReservationsPageState } from '../../ts-types/custom.types';

function Reservations() {
    const router = useRouter();

    const dispatch = useDispatch();

    const [t, i18n] = useTranslation("global"); 

    const { reservations } = useSelector((state : IReservationsPageState ) => state.reservationsPageReducer);

    const { side_menu_mobile_isOpen } = useSelector((state : any) => state.generalsEffectsReducer);

    const [reservationStatus, setReservationStatus] = useState<string>("all");

    const { logged, token } = useSelector((state:any) => state.clientReducer);

    const { user } = useSelector((state:any) => state.userReducer);

    useEffect(() => {
        if(!logged){
            router.push("/");
        }
    },[logged])

    useEffect(() => {
        dispatch(getReservationsRequesting(token, user._id));
    },[]);

    return (
        <div>
            <Nav/>
            <h2 className={styles.your_reservations_txt}>{t("reservations.your_reservations_txt")}</h2>
            <small className={styles.your_reservations_p_txt}>{t("reservations.your_reservations_will_be_confirmed_txt")}</small>
            <div className={styles.taps_container}>
                <h3 className={reservationStatus === "all" && styles.tap_selected} onClick={() => setReservationStatus("all")}>{t("reservations.all_txt")}</h3>
                <h3 className={reservationStatus === "confirmed" && styles.tap_selected} onClick={() => setReservationStatus("confirmed")}>{t("reservations.confirmed_txt")}</h3>
                <h3 className={reservationStatus === "pending" && styles.tap_selected} onClick={() => setReservationStatus("pending")}>{t("reservations.pendent_txt")}</h3>
            </div>

            {reservationStatus === "all" && 
                <div className={styles.reservationItems_container}>
                    {
                    reservations?.map((item, index) => (
                        <ReservationItem
                        key={index}
                        name={
                            item?.bookingType === "lodging" 
                            ?  
                            item?.lodging?.name
                            :
                            item?.activity?.name
                        } 
                        status={item?.status} 
                        peopleQuantity={item?.numberPeople}  
                        date={item?.entryDate}  
                        price={
                            item?.bookingType === "lodging" 
                            ? 
                            item?.room?.price
                            : 
                            0
                        } 
                        />
                    ))
                    }
                </div>
            }

            {reservationStatus === "confirmed" && 
                <div className={styles.reservationItems_container}>
                    {
                    reservations.filter(item => item.status === "confirmed")?.map((item, index) => (
                        <ReservationItem
                        key={index}
                        name={
                            item?.bookingType === "lodging" 
                            ?  
                            item?.lodging?.name
                            :
                            item?.activity?.name
                        } 
                        status={item?.status} 
                        peopleQuantity={item?.numberPeople}  
                        date={item?.entryDate}  
                        price={
                            item?.bookingType === "lodging" 
                            ? 
                            item?.room?.price
                            : 
                            0
                        } 
                        />
                    ))
                    }
                </div>
            }

            {reservationStatus === "pending" && 
                <div className={styles.reservationItems_container}>
                    {
                    reservations.filter(item => item.status === "pending")?.map((item, index) => (
                        <ReservationItem
                        key={index}
                        name={
                            item?.bookingType === "lodging" 
                            ?  
                            item?.lodging?.name
                            :
                            item?.activity?.name
                        } 
                        status={item?.status} 
                        peopleQuantity={item?.numberPeople}  
                        date={item?.entryDate}  
                        price={
                            item?.bookingType === "lodging" 
                            ? 
                            item?.room?.price
                            : 
                            0
                        } 
                        />
                    ))
                    }
                </div>
            }

            <Footer/>
      {side_menu_mobile_isOpen && <MenuSideMobileModal/>}

        </div>
    );
}

export default Reservations;