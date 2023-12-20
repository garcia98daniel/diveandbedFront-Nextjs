import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

import styles from "./styles.module.css";

import { Card, Placeholder } from 'semantic-ui-react';

// import ProfilePictureExhibitor from '../ProfilePictureExhibitor';
// import InfoCenterCard from '../InfoCenterCard';
import Nav from '../Nav';
import CardsList from '../CardsList';
// import Card from '../../components/Card';
import Footer from '../Footer';
import Certification from '../Certification';
import MenuSideMobileModal from '../Modals/MenuSideMobileModal';

//actions

//interfaces

function ProfilesSkeletonLoader() {
    const { 
        side_menu_mobile_isOpen 
    } = useSelector((state : any) => state.generalsEffectsReducer);

    return (
        <div>
            <Nav/>

            <div className={styles.pictures_and_info_center_card_container}>
                <div className={styles.pictures_and_details_container}>
                   
                    {/* -------pictures loader----------- */}
                    <div className={styles.ProfilePictureExhibitor}>

                        <Placeholder className={styles.profile_img}>
                            <Placeholder.Image />
                        </Placeholder>

                        <CardsList>
                            {
                            [1,2,3].map((item, index)=>(
                                <Placeholder key={index}  style={{ height: 50, width: 50 }}>
                                    <Placeholder.Image />
                                </Placeholder>
                            ))
                            }
                        </CardsList>

                    </div>
                    {/* ------------------ */}
                    <div className={styles.details_container}>
                
                        <div className={styles.detailItem}>
                            <div className={styles.icon_container}>
                                {/* <Image src={"/images/translate.svg"} layout="fill" objectFit="contain"/> */}
                            </div>
                            <div className={styles.line}></div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.icon_container}>
                                {/* <Image src={"/images/clock.svg"} layout="fill" objectFit="contain"/> */}
                            </div>
                            <div className={styles.line}></div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.icon_container}>
                                {/* <Image src={"/images/users.svg"} layout="fill" objectFit="contain"/> */}
                            </div>
                            <div className={styles.line}></div>
                        </div>

                    </div>
                </div>
                {/* -------------- */}
                <div className={styles.infoCenterCard}>
                    <Placeholder>
                        <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
                    <Placeholder>
                        <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder.Paragraph>
                        <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </div>
            </div>
            
            <section className={styles.description}>
                <div className={styles.h2_line}></div>
                <Placeholder fluid>
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
            </section>

            <section className={styles.certifications}>
                <div className={styles.h2_line}></div>
                <ul>
                    <li>
                        <Placeholder >
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                    </li>
                    <li>
                        <Placeholder>
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                    </li>
                    <li>
                        <Placeholder>
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                    </li>
                    <li>
                        <Placeholder>
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                    </li>
                </ul>
            </section>

            <section className={styles.transport_team}>
                <div className={styles.h2_line}></div>

                <ul>
                    <li>
                        <Placeholder >
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                    </li>
                    <li>
                        <Placeholder >
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                    </li>
                    <li>
                        <Placeholder >
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                    </li>
                    <li>
                        <Placeholder >
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                    </li>
                </ul>
            </section>

            <section className={styles.certification_list}>
                <div className={styles.h2_line}></div>
                <CardsList>
                    {
                    [1,2,3,4].map((item, index)=>(
                        <div  key={index} >
                            <Placeholder  style={{ margin:'auto', height: 164, width: 200 }}>
                            <Placeholder.Image />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder>
                        </div>
                    ))
                    }
                </CardsList>
            </section>
            <section className={styles.certification_list}>
                <div className={styles.h2_line}></div>
                <CardsList>
                    {
                    [1,2,3,4].map((item, index)=>(
                        <div key={index}  >
                            <Placeholder style={{ margin:'auto', height: 164, width: 200 }}>
                            <Placeholder.Image />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder>
                        </div>
                    ))
                    }
                </CardsList>
            </section>

            
            
            <Footer/>
            {side_menu_mobile_isOpen && <MenuSideMobileModal/>}
        </div>
    );
}

export default ProfilesSkeletonLoader;