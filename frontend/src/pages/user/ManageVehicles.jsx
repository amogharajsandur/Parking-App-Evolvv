import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, Plus, Edit2, Trash2, Shield } from 'lucide-react';
import styles from './ManageVehicles.module.scss';

const ManageVehicles = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([
    { id: 1, name: 'Toyota Camry', plate: 'MH 12 AB 1234', owner: 'John Doe' },
    { id: 2, name: 'Honda City', plate: 'MH 14 CD 5678', owner: 'John Doe' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this vehicle?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const handleAddVehicle = () => {
    const name = prompt('Enter Vehicle Name:');
    const plate = prompt('Enter Plate Number:');
    if (name && plate) {
      setVehicles([...vehicles, { id: Date.now(), name, plate, owner: 'John Doe' }]);
    }
  };

  return (
    <div className={styles.manageVehiclesPage}>
      <header className={styles.pageHeader}>
        <div className={styles.headerTop}>
          <button className={styles.backBtn} onClick={() => navigate('/settings')}>
            <ArrowLeft size={20} />
          </button>
          <h1>Manage Vehicles</h1>
        </div>
        <p className={styles.summaryText}>You have {vehicles.length} registered vehicles</p>
      </header>

      <div className={styles.vehiclesList}>
        {vehicles.map(v => (
          <div key={v.id} className={styles.vehicleCard}>
            <div className={styles.cardBody}>
              <div className={styles.vIcon}>
                <Car size={24} />
              </div>
              <div className={styles.vInfo}>
                <h3>{v.name}</h3>
                <span className={styles.plate}>{v.plate}</span>
                <p className={styles.owner}>{v.owner}</p>
              </div>
            </div>
            <div className={styles.cardActions}>
              <button className={`${styles.actionBtn} ${styles.edit}`} onClick={() => alert(`Edit ${v.name}`)}>
                <Edit2 size={16} /> Edit
              </button>
              <button className={`${styles.actionBtn} ${styles.remove}`} onClick={() => handleDelete(v.id)}>
                <Trash2 size={16} /> Remove
              </button>
            </div>
          </div>
        ))}

        <button className={styles.addVehicleBtn} onClick={handleAddVehicle}>
          <Plus size={20} />
          Add New Vehicle
        </button>
      </div>
    </div>
  );
};

export default ManageVehicles;