import React from 'react';

import { Loader } from 'semantic-ui-react'

//style
import styles from "./styles.module.css";

interface ButtonProps{
    children: React.ReactNode,
    inverted?: boolean,
    handleClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void),
    height: string,
    loading?: boolean,
    disable?: boolean,
}

function Button({children, inverted, handleClick, height, loading, disable} : ButtonProps) {
    return (
        <>
            {loading ?
                    <button 
                    className={inverted ? styles.btn_inverted : styles.btn_normal} 
                    style={{height: height}} 
                    >
                        <Loader active inline inverted size="small"/>
                    </button>
                :
                    disable ? 
                        <button 
                        className={styles.btn_disable} 
                        style={{height: height}} 
                        >
                            {children}
                        </button>
                        
                        : 
                    
                        <button 
                        className={inverted ? styles.btn_inverted : styles.btn_normal} 
                        style={{height: height}} 
                        onClick={handleClick}
                        >
                            {children}
                        </button>
            }
        </>
        
    );
}

export default Button;