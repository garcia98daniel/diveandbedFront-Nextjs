import Image from 'next/image';
import React from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import Button from '../../Button';
import Input from '../../Input';


//styles
import styles from './styles.module.css';

function LodgingRoomsModal() {
 
    const handleChangeInput = (name:string, value:string) => {
        console.log(name, value)
    }

    return (
        <Modal
            size={"tiny"}
            open={false}
            // onClose={() => dispatch({ type: 'close' })}
        >
        <div className={styles.modal_container}>
            <h2>Reserva</h2>
            <p className={styles.p_question}>¿En cual habitación quieres hospedarte? </p>
            
            <div className={styles.rooms_container}>
                {
                    [1,2,3].map((item, index) => (
                        <div key={index} className={styles.roomItem}> 
                            <p>Habitación estandar</p>
                            <small>200m2  • 1 cama • 1 baño</small>
                        </div>
                    ))
                }
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
                    Continuar
                </Button>
            </div>
        </div>
      </Modal>
    );
}

export default LodgingRoomsModal;