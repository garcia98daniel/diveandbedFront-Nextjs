import React from 'react';
import Button from '../Button/index';
import { useTranslation } from 'react-i18next';

//styles
import styles from './styles.module.css';

import {
    toggleWhatWouldYouLikeTodoModal
} from '../../redux/searchActivity/actions';
import { useDispatch } from 'react-redux';

interface SearchProps{
    bg?: string,
    children: React.ReactNode,
}

function Search({bg, children}: SearchProps) {
    const [t, i18n] = useTranslation("global");  

    const dispatch = useDispatch();

    return (
        <div className={styles.search} style={{background: bg}} onClick={() => dispatch(toggleWhatWouldYouLikeTodoModal(true))}>
              <p>{children}</p>
              <div className={styles.btn_wrapper}>
                <Button handleClick={() => {}} height={"42px"}>{t("common.share_txt")}</Button>
              </div>
        </div>
    );
}

export default Search;