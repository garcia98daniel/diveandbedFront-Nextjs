import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Modal } from 'semantic-ui-react';
import Button from '../../Button';
import InputDate from '../../InputDate';
import styles from './styles.module.css';

//actions
import { 
    checkOutServiceChangeValues,
    checkOutServiceToggleModal
} from '../../../redux/checkOutService/actions';
import { searchAddDiver, searchDeleteDiver } from '../../../redux/searchActivity/actions';

//interface
import { ISearchActivityState } from '../../../ts-types/custom.types';
import moment from 'moment';

function ServiceCheckOutCardModal() {

    const dispatch = useDispatch();

    const { 
        serviceCheckOutCardModal_isOpen,
        values:{
        service_id,
        service_name,
        service_rate,
        service_img,
        date,
        price_per_pax,

        pax_info,
        } 
    } = useSelector((state:any) => state.checkOutServiceReducer);


    const {
        values:{pax},
    } = useSelector((state: ISearchActivityState) => state.searchActivityReducer);



    const handleDateChange  = (key:string, value:string) => {
        dispatch(checkOutServiceChangeValues(key, value));
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
            open={serviceCheckOutCardModal_isOpen}
            onClose={() => dispatch(checkOutServiceToggleModal(false))}
        >
        <div className={styles.modal_container}>
            <h2>Detalles de la reserva</h2>
            <p className={styles.p_questions_txt}>¿Cuantas personas? </p>
            <div className={styles.quantity_btns_container}>
                <button onClick={() => handleChangePax(-1)}>-</button>
                <div className={styles.quantity_people}>{pax.length}</div>
                <button onClick={() => handleChangePax(1)}>+</button>
            </div>

            <p className={styles.p_questions_txt}>Fecha</p>
            <InputDate name="date" value={moment(date).format('YYYY-MM-DD')} onDateChange={handleDateChange}/>

            <div className={styles.btns_container}>
                {/* <Button
                    inverted
                    handleClick={() => {}}
                    height="40px"
                >
                    Cancelar
                </Button> */}
                <Button
                    handleClick={() => dispatch(checkOutServiceToggleModal(false))}
                    height="40px"
                >
                    Continuar
                </Button>
            </div>

        </div>
      </Modal>
    );
}

export default ServiceCheckOutCardModal;