import Image from 'next/image';
import React, {useState} from 'react';
import styles from "./styles.module.css";
import Slider from "react-slick";

interface ProfilePictureExhibitorProps{
    pictures: string[],
    settings?: {
        dots: boolean,
        infinite: boolean,
        speed: number,
        slidesToShow: number,
        slidesToScroll: number,
        initialSlide: number,
        responsive?: 
            {
                breakpoint: number,
                settings: {
                    dots: boolean,
                    infinite: boolean,
                    speed: number,
                    slidesToShow: number,
                    slidesToScroll: number,
                    initialSlide: number,
                }
            }[]
        
    }
}

const defaultSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
  };

function ProfilePictureExhibitor({pictures, settings}:ProfilePictureExhibitorProps) {
    const [sliderSettings, setSliderSettings] = useState(settings ? settings : defaultSettings);
    const [pictureSelected, setPictureSelected] = useState<string>(pictures[0]);
    return (
        <div className={styles.ProfilePictureExhibitor}>

            <div className={styles.profile_picture_selected_container}>
                <Image src={`${pictureSelected}`} layout="fill" objectFit="cover"/>
            </div>

            <Slider {...sliderSettings}>
                {pictures?.map((picture, index) =>(
                    <div 
                    key={index}
                    className={pictureSelected === picture ? styles.picture_selected : styles.profile_picture_container} 
                    onClick={() => setPictureSelected(picture)}>
                        <Image src={`${picture}`} layout="fill" objectFit="cover"/>
                    </div>
                ))}
            </Slider>

        </div>
    );
}

export default ProfilePictureExhibitor;