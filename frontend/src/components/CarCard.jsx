import React from 'react';
import { Car } from 'lucide-react';
import styles from './CarCard.module.scss';

const CarCard = ({ car }) => {
  return (
    <div className={styles.carCard}>
      <div className={styles.left}>
        <div className={styles.iconBox}>
          <Car size={20} />
        </div>
        <div className={styles.info}>
          <h4>{car.model}</h4>
          <p>{car.plate}</p>
        </div>
      </div>
      <span className={`${styles.status} ${car.active ? styles.active : styles.inactive}`}>
        {car.active ? 'Active' : 'Inactive'}
      </span>
    </div>
  );
};

export default CarCard;
