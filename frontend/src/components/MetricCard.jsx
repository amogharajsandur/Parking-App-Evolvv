import React from 'react';
import styles from './MetricCard.module.scss';

const MetricCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <div className={styles.metricCard}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {Icon && <Icon size={18} className={styles.icon} />}
      </div>
      <div className={styles.value}>{value}</div>
      {trend && (
        <div className={`${styles.trend} ${trend.startsWith('+') ? styles.positive : styles.negative}`}>
          {trend} from yesterday
        </div>
      )}
    </div>
  );
};

export default MetricCard;
