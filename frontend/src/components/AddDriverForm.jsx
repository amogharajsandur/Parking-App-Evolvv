import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, FileText } from 'lucide-react';
import API_BASE_URL from "../api/config";
import styles from './AddDriverForm.module.scss';

const AddDriverForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
      name: '', phone: '', email: '', address: '', dob: '', license: '', expiry: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
      // Basic validation
      if (!formData.name || !formData.phone || !formData.license) {
          alert("Please fill required fields (Name, Phone, License)");
          return;
      }

      setIsSubmitting(true);
      try {
          await axios.post(`${API_BASE_URL}/drivers/request`, {
              name: formData.name,
              phone: formData.phone,
              license: formData.license,
              details: {
                  email: formData.email,
                  address: formData.address,
                  dob: formData.dob,
                  expiry: formData.expiry
              }
          });
          alert('Driver Request Sent to Super Admin!');
          onClose(); // Close the form
      } catch (err) {
          console.error("Failed to add driver", err);
          alert("Failed to submit request.");
      } finally {
          setIsSubmitting(false);
      }
  };

  return (
    <div className={styles.addDriverPage}>
      <header className={styles.header}>
        <div className={styles.topRow}>
          <button className={styles.backBtn} onClick={onClose}>
            <ArrowLeft size={20} />
          </button>
          <h1>Add Driver/Valet</h1>
        </div>
        <p>Fill in the details to add a new driver</p>
      </header>

      <div className={styles.formContent}>
        <section className={styles.section}>
          <h3>Personal Details</h3>
          
          <div className={styles.inputGroup}>
            <label>Full Name *</label>
            <div className={styles.inputWrapper}>
              <User size={16} />
              <input type="text" placeholder="Enter full name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Phone Number *</label>
            <div className={styles.inputWrapper}>
              <Phone size={16} />
              <input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <div className={styles.inputWrapper}>
              <Mail size={16} />
              <input type="email" placeholder="driver@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Address</label>
            <div className={styles.inputWrapper}>
              <MapPin size={16} />
              <input type="text" placeholder="Enter address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Date of Birth</label>
            <div className={styles.inputWrapper}>
              <Calendar size={16} />
              <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3>License Details</h3>
          
          <div className={styles.inputGroup}>
            <label>Driving License Number *</label>
            <div className={styles.inputWrapper}>
              <FileText size={16} />
              <input type="text" placeholder="DL-1420110012345" value={formData.license} onChange={e => setFormData({...formData, license: e.target.value})} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>License Expiry Date</label>
            <div className={styles.inputWrapper}>
              <Calendar size={16} />
              <input type="date" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} />
            </div>
          </div>
        </section>

        <button className={styles.submitBtn} onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Driver'}
        </button>
      </div>
    </div>
  );
};

export default AddDriverForm;