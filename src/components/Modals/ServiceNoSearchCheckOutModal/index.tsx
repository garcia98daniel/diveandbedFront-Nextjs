import React from 'react'
import { Icon, Modal } from 'semantic-ui-react';
import Button from '../../Button';
import InputDate from '../../InputDate';
import styles from './styles.module.css';

function ServiceNoSearchCheckOutModal() {

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

            <p className={styles.p_questions_txt}>¿Cual es tu nivel? </p>
            <div className={styles.levels_exp_container}>
                <div className={styles.exp_option_selecte}>
                Sin experiencia
                </div>
                <div className={styles.exp_option}>
                Básico
                </div>
                <div className={styles.exp_option}>
                Intermedio
                </div>
                <div className={styles.exp_option}>
                Avanzado
                </div>
            </div>

            <p className={styles.p_questions_txt}>¿Cuantas personas? </p>
            <div className={styles.quantity_btns_container}>
                <button>-</button>
                <div className={styles.quantity_people}>3</div>
                <button>+</button>
            </div>

            <p className={styles.p_questions_txt}>Fecha</p>
            <InputDate name="startDate" value={startDate} onDateChange={handleDateChange}/>

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
                    Continuar
                </Button>
            </div>

        </div>
      </Modal>
    );
}

export default ServiceNoSearchCheckOutModal;