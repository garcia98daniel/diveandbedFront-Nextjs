import React from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import Button from '../../Button';
import InputDate from '../../InputDate';
import styles from './styles.module.css';

function LodgingCheckOutCardModal() {

    const handleDateChange  = (key:string, value:string) => {
        // dispatch(searchChangeValues(key, value));
    }

    const startDate = "";
    const endDate = "";

    return (
        <Modal
            size={"tiny"}
            open={false}
            // onClose={() => dispatch({ type: 'close' })}
        >
        <div className={styles.modal_container}>
            <h2>Detalles de la reserva</h2>
            <p className={styles.p_questions_txt}>¿Cuantas personas? </p>
            <div className={styles.quantity_btns_container}>
                <button>-</button>
                <div className={styles.quantity_people}>3</div>
                <button>+</button>
            </div>

            <p className={styles.p_questions_txt}>Fecha</p>
            <div className={styles.date_wrapper}>
                <InputDate name="startDate" value={startDate} onDateChange={handleDateChange}/>
                Hasta
                <InputDate name="endDate" value={endDate} onDateChange={handleDateChange}/>
            </div>

            <div className={styles.btns_container}>
                <Button
                    inverted
                    handleClick={() => {}}
                    height="40px"
                >
                    Cancelar
                </Button>
                <Button
                    handleClick={() => {}}
                    height="40px"
                >
                    Guardar
                </Button>
            </div>

        </div>
      </Modal>
    );
}

export default LodgingCheckOutCardModal;