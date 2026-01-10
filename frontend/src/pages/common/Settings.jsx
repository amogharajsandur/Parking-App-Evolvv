import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  ArrowLeft,
  Car
} from 'lucide-react';
import styles from './Settings.module.scss';

const Settings = () => {
  const navigate = useNavigate();

  const settingsItems = [
    { 
      id: 'vehicles', 
      title: 'Manage Vehicles', 
      desc: 'Add or remove your vehicles', 
      icon: Car,
      onClick: () => navigate('/manage-vehicles')
    },
    { 
      id: 'payments', 
      title: 'Payment Methods', 
      desc: 'Manage your saved cards & UPI', 
      icon: CreditCard,
      onClick: () => alert('Payment settings coming soon!')
    },
    { 
      id: 'notifications', 
      title: 'Notifications', 
      desc: 'Configure alert preferences', 
      icon: Bell,
      onClick: () => alert('Notification settings coming soon!')
    },
    { 
      id: 'security', 
      title: 'Security', 
      desc: 'Password and account safety', 
      icon: Shield,
      onClick: () => alert('Security settings coming soon!')
    },
    { 
      id: 'faq', 
      title: 'FAQ & Support', 
      desc: 'Help center and contact us', 
      icon: HelpCircle,
      onClick: () => navigate('/faq')
    },
  ];

  return (
    <div className={styles.settingsPage}>
      <header className={styles.settingsHeader}>
        <div className={styles.headerTop}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>
             <ArrowLeft size={20} />
          </button>
          <h1>Settings</h1>
        </div>
      </header>

      <div className={styles.contentScroll}>
        <div className={styles.profileBrief}>
          <div className={styles.avatar}>J</div>
          <div className={styles.info}>
            <h3>John Doe</h3>
            <p>+91 98765 43210</p>
          </div>
        </div>

        <div className={styles.settingsList}>
          {settingsItems.map((item) => (
            <div 
              key={item.id} 
              className={styles.settingItem}
              onClick={item.onClick}
            >
              <div className={styles.icon}>
                <item.icon size={20} />
              </div>
              <div className={styles.text}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <ChevronRight size={18} className={styles.chevron} />
            </div>
          ))}
        </div>

        <button className={styles.logoutBtn} onClick={() => alert('Logging out...')}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;