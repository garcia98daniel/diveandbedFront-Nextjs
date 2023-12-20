import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { Icon, Modal } from 'semantic-ui-react';
import Button from '../../Button';
import Input from '../../Input';
import InputDate from '../../InputDate';

//interfaces
import { ILodgingPageState, ISearchActivityState } from '../../../ts-types/custom.types';


//styles
import styles from './styles.module.css';

//actions
import { toggleRoomsModal } from '../../../redux/lodgingPage/actions';
import { searchAddDiver, searchChangeValues, searchDeleteDiver } from '../../../redux/searchActivity/actions';
import { checkOutLodgingChangeValues } from '../../../redux/checkOutLodging/actions';

interface LodgingRoomsNoSearchModalProps{
    handleContinueBotton: () => void
}

function LodgingRoomsNoSearchModal({handleContinueBotton} : LodgingRoomsNoSearchModalProps) {
    const dispatch = useDispatch();
    const router = useRouter();

    const { 
        isOpen_rooms_modal
    } = useSelector((state : ILodgingPageState) => state.lodgingPageReducer);

    const { 
        values:{room_selected},
    } = useSelector((state : any) => state.checkOutLodgingReducer);
    
    const {
        values:{
            type,
            levelExperience,
            startDate,
            endDate,
            pax,
        },
    } = useSelector((state: ISearchActivityState) => state.searchActivityReducer);

    const { 
        lodging, 
    } = useSelector((state : ILodgingPageState) => state.lodgingPageReducer);

    const handleDateChange  = (key:string, value:string) => {
      dispatch(searchChangeValues(key, value));
    }

    const handleSelectRoom  = (room:any) => {
        console.log(room_selected)
        dispatch(checkOutLodgingChangeValues("room_selected",room))
    }

    if(!startDate){
        const today = new Date();
        dispatch(searchChangeValues("startDate", moment(today).format('DD-MM-YYYY')));
      }
    if(!endDate){
    const today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    dispatch(searchChangeValues("endDate", moment(tomorrow).format('DD-MM-YYYY')));
    }


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


    return (
        <Modal
            size={"tiny"}
            open={isOpen_rooms_modal}
            onClose={() => dispatch(toggleRoomsModal(false))}
        >
        <div className={styles.modal_container}>
            <h2>Reserva</h2>

            <p className={styles.p_questions_txt}>¿Cuantas personas? </p>
            <div className={styles.quantity_btns_container}>
                <button onClick={() => handleChangePax(-1)}>-</button>
                <div className={styles.quantity_people}>{pax.length}</div>
                <button onClick={() => handleChangePax(1)}>+</button>
            </div>

            <p className={styles.p_questions_txt}>Fecha</p>
            <div className={styles.date_wrapper}>
                <InputDate name="startDate" value={moment(startDate).format('YYYY-MM-DD')} onDateChange={handleDateChange}/>
                Hasta
                <InputDate name="endDate" value={moment(endDate).format('YYYY-MM-DD')} onDateChange={handleDateChange}/>
            </div>

            <p className={styles.p_question}>¿En cual habitación quieres hospedarte? </p>
            
            <div className={styles.rooms_container}>
                {
                    lodging?.rooms?.map((room, index) => (
                        <div key={index} className={room_selected?._id === room._id ? styles.roomItem_selected : styles.roomItem} onClick={() => handleSelectRoom(room)}> 
                            <p>{room.name}</p>
                            <small>{room.price}$/noche  • {room.beds} cama • {room.bathrooms} baño</small>
                        </div>
                    ))
                }
            </div>

            <div className={styles.btns_container}>
                <Button
                    inverted
                    handleClick={() => dispatch(toggleRoomsModal(false))}
                    height="40px"
                >
                    Cancelar
                </Button>

                {room_selected &&
                    <Button
                    handleClick={() => handleContinueBotton()}
                        height="40px"
                    >
                        Continuar
                    </Button>
                }
            </div>
        </div>
      </Modal>
    );
}

export default LodgingRoomsNoSearchModal;