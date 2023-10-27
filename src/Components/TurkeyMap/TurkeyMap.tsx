import React, { forwardRef, useEffect, useState } from 'react';

import cx from 'classnames';

import cities from '@/data/cities.json';

import useLocalStorage from '@/Hooks/useLocalStorage';

import City from './components/City/City';

import styles from './TurkeyMap.module.scss';

type Props = {
  defaultActiveCity?: string;
};
type TurkeyMapProps = {
  onCityClick: (cityName: string) => void; 
};

const TurkeyMap = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { getItem, setItem, removeItem } = useLocalStorage('city'); 
  const [activeCity, setActiveCity] = useState<string | null>(null); 

  
  const handleCityClick = (name: string) => { 
    if (!props.defaultActiveCity) {
      if (activeCity === name) {
        setActiveCity(null);
      } else {
        setActiveCity(name);
        props.onCityClick(name); 
      }
    }
  };

  useEffect(() => {
    if (!props.defaultActiveCity) {
      const storedActiveCity = getItem() as string;
      if (storedActiveCity) {
        setActiveCity(storedActiveCity);
      }
    } else {
      setActiveCity(props.defaultActiveCity);
    }
  }, [props.defaultActiveCity]);

  useEffect(() => {
    if (!props.defaultActiveCity) {
      if (activeCity) {
        setItem(activeCity);
      } else {
        removeItem();
      }
    }
  }, [activeCity]);

  return (
    <div ref={ref} className={styles.wrapper}>
      <svg
        viewBox="0 0 1007.478 527.323"
        xmlns="http://www.w3.org/2000/svg"
        className={cx(styles.map, {
          [styles.active]: !props.defaultActiveCity,
        })}
      >
        <g>
          {cities.map((city) => (
            <City
              {...city}
              key={city.id}
              className={styles.city}
              active={activeCity === city.name}
              onClick={() => handleCityClick(city.name)} 
            />
          ))}
        </g>
      </svg>
    </div>
  );
});

TurkeyMap.displayName = 'TurkeyMap';

export default TurkeyMap;
