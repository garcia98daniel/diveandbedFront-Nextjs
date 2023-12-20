import React, { useState, useEffect } from "react";
// ES6
import ReactMapboxGl, { Layer, Feature, Marker, ZoomControl } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {KEY_API_MAPBOX_MAPS} from "../../utils/route";
import Image from 'next/image';

import styles from "./styles.module.css";

const Map = ReactMapboxGl({
  accessToken:KEY_API_MAPBOX_MAPS,
});

interface IMapProps{
  marks?:any[],
}
function MapMarkers({marks}:IMapProps) {

  const [zoomLevel, setZoomLevel] = useState<number>(10);

  const [mapCenter, setMapCenter] = useState<[number, number]>([-86.8742534, 20.4320836]);

  useEffect(() =>{
    setMapCenter([-86.8742534, 20.4320836])
  },[])

  return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        center={mapCenter}
        zoom={[zoomLevel]}
      >
        <div>
      <ZoomControl/>

      {marks?.map((mark, index) => {
        if(mark?.location?.coordinates?.length > 0){
          // console.log(mark?.location?.coordinates[0],mark?.location?.coordinates[1])
          // console.log(mark?.location?.coordinates.map(parseFloat).reverse())
          if(mark?.location?.coordinates[0] !== null && mark?.location?.coordinates[1]!== null){
            return (
            <a 
            key={index}
            className={styles.mark_container} 
            target="_blank"
            rel="noopener noreferrer" 
            href={`https://maps.google.com/?q=${mark?.location?.coordinates[0]},${mark?.location?.coordinates[1]}`}
            >
              <Marker coordinates={mark?.location?.coordinates?.map(parseFloat).reverse()} type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
                <div className={styles.marker_item}>
                  <h3>{mark.name}</h3>
                    <p>
                        <div className={styles.star_logo}>
                          <Image src="/images/star.svg" layout="fill"  objectFit="contain"/>
                        </div>
                        {mark.avgRating}
                    </p>
                  <h3>{mark.price? `$ ${mark.price}` : ""}</h3>
                </div>
              </Marker>
            </a>
            )}
          }
        }
      )}
        </div>

      </Map>
  );
}

export default MapMarkers;
