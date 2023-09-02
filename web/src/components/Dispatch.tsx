import React, { useState,useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css'

import { fetchNui } from '../utils/fetchNui';
import { useNuiEvent } from '../hooks/useNuiEvent';

import { renderToString } from 'react-dom/server';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

import {
  Button,
} from '@mantine/core';

const CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.LonLat,
  scale: function (zoom: number) {
    return Math.pow(2, zoom);
  },
  zoom: function (sc: number) {
    return Math.log(sc) / 0.6931471805599453;
  },
  distance: function (pos1: L.LatLng, pos2: L.LatLng) {
    const x_difference = pos2.lng - pos1.lng;
    const y_difference = pos2.lat - pos1.lat;
    return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
  },
  transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
  infinite: true,
});

function customIcon(type: any) {
  if (type === 'last') {
    return L.divIcon({
      html: renderToString(<FontAwesomeIcon icon={faLocationPin} className='map-icon-last' />),
      iconAnchor: [20, 20],
      popupAnchor: [-10, -27],
    });
  } else {
    return L.divIcon({
      html: renderToString(<FontAwesomeIcon icon={faLocationPin} className='map-icon' />),
      iconAnchor: [20, 20],
      popupAnchor: [-10, -27],
    });
  }
}

interface SpawnData {
  x: number,
  y: number,
  z: number,
  label: string,
  type: string,
}

interface GtaVMap {
  triggerDispatch: boolean;
}

const GtaVMap: React.FC<GtaVMap> = ({ triggerDispatch }) => {
  const [spawnData, setSpawnData] = useState<SpawnData[]>([])

  useNuiEvent('setSpawns', (data) => {
    setSpawnData(data)
  });

  const selectSpawn = (index:number) => {
    fetchNui('selectSpawn', spawnData[index]);
  }

  const GtaVMapContainer = () => {
    const map = useMap();
    
    useEffect(() => {
      handleRecenterClick(map);
    }, [triggerDispatch]);

    return null;
  };

  const handleRecenterClick = (map: any) => {
    map.setView([-900, 200], 4);
  };

  return (
    <MapContainer
      crs={CUSTOM_CRS}
      minZoom={2}
      maxZoom={5}
      preferCanvas={true}
      center={[-900,200]}
      zoom={4}
      style={{ width: '800px', height: '800px', background:'#0fa8d2' }}
      attributionControl={false}
    >
      <TileLayer url="assets/mapStyles/styleAtlas/{z}/{x}/{y}.jpg" />

      <GtaVMapContainer />

      {spawnData.map((item, i) => (
        <Marker key={i} position={[item.y, item.x]} icon={customIcon(item.type)}>
          <Popup>
            <div className='popup-title'>{item.label}</div>
            <Button color="green" size='xs' onClick={() => {selectSpawn(i)}}>SPAWN</Button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GtaVMap;
