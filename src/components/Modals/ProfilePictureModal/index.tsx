import Image from 'next/image';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Modal } from 'semantic-ui-react';
import { userChangeForm, userModalPhotosToggle, userUpdateRequesting } from '../../../redux/auth/user/actions';
import Button from '../../Button';
import Input from '../../Input';
import styles from './styles.module.css';

function ProfilePictureModal() {
    const dispatch = useDispatch();
    const { token } = useSelector((state:any) => state.clientReducer);
    const [t, i18n] = useTranslation("global"); 

    const { 
        requesting,
        user, 
        user:{
            name,
        },
        values
    } = useSelector((state:any) => state.userReducer);

    const { 
        profilePhotosModal,
    } = useSelector((state:any) => state.userReducer);

    const handleChangeInput = (name:string, value:string) => {
        console.log(name, value)
    }

    const  handleGetPhoto = async (e:React.ChangeEvent<HTMLInputElement>, key:string, alt_photo_url:string) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          if(reader.readyState === 2){
            const file = [e.target.files[0]];
            dispatch(userChangeForm(alt_photo_url, file));
            dispatch(userChangeForm(key, reader.result));
          }
          // console.log(e.target.files[0]);
        }
        reader.readAsDataURL(e.target.files[0]);
      };

    const handleUpdateProfile = () =>{
        dispatch(userUpdateRequesting(token, values));
    }

    const handleClose = () => {
        dispatch(userModalPhotosToggle(false));
        dispatch(userChangeForm('alt_photo_url_profile', ''));
        dispatch(userChangeForm('photo', ''));

        dispatch(userChangeForm('cover_alt_photo_url_profile', ''));
        dispatch(userChangeForm('cover_photo', ''));
    }

    return (
        <Modal
            size={"tiny"}
            open={profilePhotosModal}
            onClose={() => handleClose()}
        >
        <div className={styles.modal_container}>
            <div className={styles.row}>
                <h2>{t("myProfile.edit_profile_txt")}</h2>

                <button className={styles.close_btn} onClick={() => handleClose()}><Icon name="x" size="large"/></button>
            </div>

            <p className={styles.p_txt}>{t("myProfile.profile_picture_txt")}</p>

            <label className={styles.input_file} htmlFor="upload">
                <div className={styles.input_picture}>
                    <input
                    onChange={(e) => handleGetPhoto(e, 'photo', 'alt_photo_url_profile')}
                    type="file"
                    id="upload"
                    accept="image/png,image/jpeg,image/jpg" 
                    // capture="filesystem"
                    hidden
                    />

                    {values?.photo ?
                        <Image
                        src={values?.photo}
                        alt="img"
                        layout="fill" 
                        objectFit="contain"
                        />
                    :
                        <>

                            <div className={styles.img_container}>
                                <Image src="/images/pickerPicture.svg" layout="fill" objectFit="contain"/>
                            </div>

                            <p>{t("myProfile.upload_picture_txt")}</p>
                            <small>{t("myProfile.only_jpg_png_files_txt")}</small>
                        </>
                    }
                </div>
            </label>

            <p className={styles.p_txt}>{t("myProfile.cover_photo_txt")}</p>
            <label className={styles.input_file} htmlFor="cover_upload">
                <div className={styles.input_picture}>
                        <input
                        onChange={(e) => handleGetPhoto(e, 'cover_photo', 'cover_alt_photo_url_profile')}
                        type="file"
                        id="cover_upload"
                        accept="image/png,image/jpeg,image/jpg" 
                        // capture="filesystem"
                        hidden
                        />
                        {values?.cover_photo ?
                            <Image
                            src={values?.cover_photo}
                            alt="img"
                            layout="fill" 
                            objectFit="cover"
                            />
                        :
                            <>
                                

                                <div className={styles.img_container}>
                                    <Image src="/images/pickerPicture.svg" layout="fill" objectFit="contain"/>
                                </div>

                                <p>{t("myProfile.upload_picture_txt")}</p>
                                <small>{t("myProfile.only_jpg_png_files_txt")}</small>
                            </>
                        }
                </div>
            </label>

            {/* <p className={styles.p_txt_last}>Nombre</p>
            <Input 
                labelName="" 
                inputType="text" 
                handleChangeInput={handleChangeInput}  
                inputValue="" 
                inputName="name"
                bg="transparent"
                placeHolder="Escribe tu nombre aqui"
            /> */}
            
            <div className={styles.btns_container}>
                <Button
                    inverted
                    handleClick={() => handleClose()}
                    height="40px"
                >
                    {t("common.cancel_txt")}
                </Button>
                <Button
                    loading={requesting}
                    handleClick={() => handleUpdateProfile()}
                    height="40px"
                    >
                    {t("common.save_txt")}
                </Button>
            </div>

        </div>
      </Modal>
    );
}

export default ProfilePictureModal;