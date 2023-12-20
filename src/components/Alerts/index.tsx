import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import {closeAlertModal} from "../../redux/generalsEffects/actions";  
// import Slide from '@material-ui/core/Slide';

import { Icon, Message } from 'semantic-ui-react'

import styles from "./styles.module.css";

const easing = [0.6, -0.05, 0.01, 0.99];

function Alerts() {
    const dispatch = useDispatch();
    const router = useRouter();
    const {alertModal} = useSelector((state:any) => state.generalsEffectsReducer); 

    useEffect(() => {
        setTimeout(() =>{
            dispatch(closeAlertModal());
        }, 4000)
    },[])
    return (
        <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, easing: easing },
        }}
        className={styles.alert_container}
        onClick={() => dispatch(closeAlertModal())}
        >
                {alertModal.type === "error" &&
                    <Message error attached='bottom'>
                        <Icon name='times circle outline' />
                        {alertModal.message}
                    </Message>
                }
                {alertModal.type === "warning" &&
                    <Message warning attached='bottom'>
                        <Icon name='warning' />
                        {alertModal.message}
                    </Message>
                }
                {alertModal.type === "info" &&
                    <Message info attached='bottom'>
                        <Icon name='exclamation circle' />
                        {alertModal.message}
                    </Message>
                }
                {alertModal.type === "success" &&
                    <Message success attached='bottom'>
                        <Icon name='check circle outline' />
                        {alertModal.message}
                    </Message>
                }
        </motion.div>

    );
}

export default Alerts;