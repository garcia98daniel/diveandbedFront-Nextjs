import React, {useEffect} from 'react';
import { useRouter } from 'next/router';

//styles
import styles from './styles.module.css';
//componets
import Image from 'next/image';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import ProfilePictureModal from '../../components/Modals/ProfilePictureModal';
import MenuSideMobileModal from '../../components/Modals/MenuSideMobileModal';
import { useDispatch, useSelector } from 'react-redux';

//actions
import { 
    userGetRequesting,
    userModalPhotosToggle,
 } from "../../redux/auth/user/actions";
import { useTranslation } from 'react-i18next';
function MyProfile() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [t, i18n] = useTranslation("global"); 

    const { side_menu_mobile_isOpen } = useSelector((state : any) => state.generalsEffectsReducer);
    const { logged, token } = useSelector((state:any) => state.clientReducer);
    const {
        user, 
    } = useSelector((state:any) => state.userReducer);

    useEffect(() => {
        dispatch(userGetRequesting(token));
    },[])

    useEffect(() => {
        if(!logged){
            router.push("/");
        }
    },[logged])

    return (
        <div>
            <Nav/>
            <div className={styles.hero}>
                {/* <button className={styles.btn_edit_profile} onClick={() => dispatch(userModalPhotosToggle(true))}>
                    <div className={styles.icon_container}>
                        <Image src="/images/pencil.svg" layout="fill" object-fit="cover" />
                    </div>
                    {t("myProfile.edit_profile_txt")}
                </button> */}
                <div className={styles.cover_profile_container}>
                    {user?.profilePicture &&
                        <Image src={user?.profilePicture ? user?.profilePicture : "/images/registerImg.png"} layout="fill" object-fit="cover" />
                    }
                </div>

                <div className={styles.user_info_container}>
                    <div className={styles.user_profile_img_container}>
                        <Image src={user?.profilePicture ? user?.profilePicture : "/images/defaultUser.png"} layout="fill" object-fit="cover" />
                    </div>

                    <h1 className={styles.user_name_txt}>{user?.name}</h1>

                    <div className={styles.row}>
                        <div className={styles.info}>
                            {/* <h1>12</h1>
                            <h2>certificados</h2> */}
                        </div>
                        <div className={styles.info}>
                            {/* <h1>23</h1>
                            <h2>Actividades</h2> */}
                        </div>
                        <div className={styles.info}>
                            {/* <h1>2</h1>
                            <h2>Hospedajes</h2> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* <section className={styles.my_certifications}>
                <h2>Tus certificados</h2>
                <div className={styles.certifications_container}>
                    {
                        [1,2,3,4,5,6,7,8,9].map((item, index) => (
                            <div className={styles.certification} key={index}>
                                <div className={styles.certification_img_container}>
                                    <Image src="/images/registerImg.png" layout='fill' objectFit='cover' />
                                </div>
                                <h2>lorem ih2sum</h2>
                            </div>
                        ))
                    }
                </div>
            </section> */}

            <Footer/>
            <ProfilePictureModal/>
            {side_menu_mobile_isOpen && <MenuSideMobileModal/>}

        </div>
    );
}

export default MyProfile;