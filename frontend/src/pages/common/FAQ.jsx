import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, ChevronDown, Edit2, Shield, CreditCard, Clock } from 'lucide-react';
import styles from './FAQ.module.scss';

const FAQ = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { 
      q: 'How does QR parking work?', 
      a: 'Simply scan the QR code at the entry, park your car, and your session starts automatically. When leaving, show the digital ticket to the guard or pay online to exit.',
      icon: HelpCircle
    },
    { 
      q: 'Is my payment information secure?', 
      a: 'Yes, we use industry-standard encryption for all payments. We do not store your full card details on our servers.',
      icon: Shield
    },
    { 
      q: 'Can I pre-book a parking slot?', 
      a: 'Currently, we operate on a first-come, first-served basis. However, premium pre-booking for mall members is coming soon!',
      icon: Clock
    },
    { 
      q: 'What payment methods are accepted?', 
      a: 'We accept UPI (GPay, PhonePe), Credit/Debit Cards, Netbanking, and FastTag auto-deduction.',
      icon: CreditCard
    },
  ];

  return (
    <div className={styles.faqPage}>
      <header className={styles.pageHeader}>
        <div className={styles.headerTop}>
          <button className={styles.backBtn} onClick={() => navigate('/settings')}>
            <ArrowLeft size={20} />
          </button>
          <h1>Help & Support</h1>
        </div>
        <p className={styles.summaryText}>Find answers to common questions</p>
      </header>

      <div className={styles.faqContent}>
        <div className={styles.profileStrip}>
          <div className={styles.avatar}>J</div>
          <div className={styles.userText}>
            <h3>John Doe</h3>
            <p>+91 98765 43210</p>
          </div>
          <button className={styles.editBtn} onClick={() => alert('Edit Profile')}>
            <Edit2 size={18} />
          </button>
        </div>

        <div className={styles.faqList}>
          {faqs.map((item, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${openIndex === index ? styles.active : ''}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className={styles.faqQuestion}>
                <div className={styles.qIcon}>
                  <item.icon size={20} />
                </div>
                <h3>{item.q}</h3>
                <ChevronDown size={20} className={styles.chevron} />
              </div>
              {openIndex === index && (
                <div className={styles.faqAnswer}>
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;