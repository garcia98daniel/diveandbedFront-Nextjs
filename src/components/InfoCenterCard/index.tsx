import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import Button from "../Button";
import Certification from "../Certification";

import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

interface InfoCenterCardProps {
  centerLogo: string;
  centerCertification: string;
  centerTitle: string;
  centerLocation: {
    address: string;
    coordinates: [number, number];
  };
  whatsapp: string;
  facebook: string;
  instagram: string;
  reservationPolitics: string;
  cancelationPolitics: string;
}

function InfoCenterCard({
  centerLogo,
  centerCertification,
  centerTitle,
  centerLocation,
  whatsapp,
  facebook,
  instagram,
  reservationPolitics,
  cancelationPolitics,
}: InfoCenterCardProps) {
  const [t, i18n] = useTranslation("global");
  const router = useRouter();
  const { language } = useSelector((state: any) => state.languageReducer);

  return (
    <div className={styles.infoCenterCard}>
      <div className={styles.infoCenterCard_header}>
        <div className={styles.logo_certification_container}>

          <div className={styles.logo_name_container}>
            <div className={styles.logo_container}>
              <Image src={centerLogo} layout="fill" objectFit="contain" />
            </div>
            <h1>{centerTitle}</h1>
          </div>

          {centerCertification && 
          <Certification name={centerCertification} />
          }
        </div>

      </div>

      <div className={styles.infoCenterCard_body}>
        <div className={styles.location_container}>
          <div className={styles.icon_container}>
            <Image
              src={"/images/location.svg"}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p>{centerLocation?.address}</p>
        </div>
        <div className={styles.btns_container}>
        <Link href={`https://maps.google.com/?q=${
                      centerLocation?.coordinates?.length > 0 &&
                      centerLocation?.coordinates[0]
                    },${
                      centerLocation?.coordinates?.length > 0 &&
                      centerLocation?.coordinates[1]
                    }`}>
            <a target="_blank" rel="noopener noreferrer">
              <Button
                inverted
                height={"36px"}
              >
                {t("center.how_to_get?_txt")}
              </Button>
            </a>
          </Link>
          
          <Link href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}>
            <a target="_blank" rel="noopener noreferrer">
              <Button
                inverted
                height={"36px"}
              >
                {t("center.contact_txt")}
              </Button>
            </a>
          </Link>
        </div>

        <div className={styles.socialmedia_container}>
          <Link href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}>
            <a target="_blank" rel="noopener noreferrer">
            <div className={styles.icon_socialmedia_container}>
              <Image
                src={"/images/wApp.svg"}
                layout="fill"
                objectFit="contain"
              />
            </div>
            </a>
          </Link>
          <Link href={`https://www.facebook.com/${facebook}`}>
            <a target="_blank" rel="noopener noreferrer">
            <div className={styles.icon_socialmedia_container}>
              <Image
                src={"/images/facebook.svg"}
                layout="fill"
                objectFit="contain"
              />
            </div>
            </a>
          </Link>
          <Link href={`https://www.instagram.com/${instagram.replace(/@/g, '')}`}>
          <a target="_blank" rel="noopener noreferrer">
            <div className={styles.icon_socialmedia_container}>
              <Image src={"/images/ig.svg"} layout="fill" objectFit="contain" />
            </div>
          </a>
          </Link>
        </div>

        <div className={styles.politics_container}>
          <Link href={reservationPolitics ? reservationPolitics : ""}>
            <a target="_blank" rel="noopener noreferrer">
              {t("center.reservation_policies_txt")}
            </a>
          </Link>
          <Link href={cancelationPolitics ? cancelationPolitics : ""}>
            <a target="_blank" rel="noopener noreferrer">
              {t("center.cancellation_policies_txt")}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InfoCenterCard;
