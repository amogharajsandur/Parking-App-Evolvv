import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, MapPin, User, Clock, Phone, CheckCircle, Bell, ChevronRight, Car, ArrowLeft, MoreHorizontal } from 'lucide-react';
import { useRole } from '../context/RoleContext';
import styles from './ValetView.module.scss';

const ValetView = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [loadingAction, setLoadingAction] = useState(null); // 'accept' | 'complete' | null
  
  // Mock Data
  const [activeTask, setActiveTask] = useState(null);
  const [upcomingTasks, setUpcomingTasks] = useState([
    { id: 2, carModel: 'Maruti Swift', plate: 'MH12CD5678', type: 'Retrieve', loc: 'Lobby', time: 'Now', customer: 'Rahul D' },
    { id: 3, carModel: 'Toyota Fortuner', plate: 'MH01XY9988', type: 'Park', loc: 'Entrance A', time: '+5m', customer: 'Vikram S' }
  ]);
  const [completedTasks, setCompletedTasks] = useState([
    { id: 101, text: 'Parked Toyota Innova at Level 1', time: '12:30 PM' }
  ]);

  const handleBack = () => {
    setRole('user');
    navigate('/');
  };

  const handleAcceptTask = (task) => {
    setLoadingAction('accept');
    
    // Simulate API/Process delay
    setTimeout(() => {
      setActiveTask({
        id: task.id,
        type: task.type,
        carModel: task.carModel,
        plate: task.plate,
        customer: task.customer,
        location: task.loc,
        area: 'Phoenix Mall',
        slot: 'Level 2 - B34',
        assignedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'assigned'
      });
      setUpcomingTasks(prev => prev.filter(t => t.id !== task.id));
      setLoadingAction(null);
    }, 2000);
  };

  const handleCompleteTask = () => {
    setLoadingAction('complete');
    setTimeout(() => {
      setCompletedTasks(prev => [{
        id: Date.now(),
        text: `${activeTask.type === 'Park' ? 'Parked' : 'Retrieved'} ${activeTask.carModel}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }, ...prev]);
      setActiveTask(null);
      setLoadingAction(null);
    }, 2000);
  };

  return (
    <div className={styles.valetPage}>
      {loadingAction && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingCard}>
             <div className={styles.iconCircle}>
               <Car size={32} />
             </div>
             <h3>{loadingAction === 'accept' ? 'Parking in Progress...' : 'Completing Task...'}</h3>
             {activeTask ? (
                 <>
                   <p className={styles.carName}>{activeTask.carModel}</p>
                   <p className={styles.plate}>{activeTask.plate}</p>
                 </>
             ) : (
                <p>Allocating Slot...</p>
             )}
             <div className={styles.progressBar}>
               <div className={styles.progressFill}></div>
             </div>
          </div>
        </div>
      )}

      <header className={styles.valetHeader}>
        <div className={styles.top}>
          <div className={styles.user}>
            <button className={styles.backBtn} onClick={handleBack}>
               <ArrowLeft size={20} />
            </button>
            <div className={styles.userDetails}>
               <p>Driver Console</p>
               <div className={styles.welcome}>
                  <h3>Rajesh Kumar</h3>
               </div>
            </div>
          </div>
          <div className={styles.notificationBell}>
             <Bell size={20} />
             <span className={styles.count}>{upcomingTasks.length}</span>
          </div>
        </div>
      </header>

      <div className={styles.contentScroll}>
        <section className={styles.driverStats}>
             <div className={styles.statBox}>
               <label>Tasks</label>
               <h4>12</h4>
             </div>
             <div className={styles.statBox}>
               <label>Avg Time</label>
               <h4>4m</h4>
             </div>
             <div className={styles.statBox}>
               <label>Rating</label>
               <h4>4.8</h4>
             </div>
        </section>

        {upcomingTasks.length > 0 && !activeTask && (
            <section className={styles.newAssignments}>
            <div className={styles.labelRow}>
                <Bell size={16} color="var(--role-primary)" />
                <h3>Next Assignment</h3>
            </div>
            
            {upcomingTasks.slice(0, 1).map(task => (
                <div key={task.id} className={styles.newTaskCard}>
                <div className={styles.taskTop}>
                    <div className={styles.carIcon}>
                        <Car size={24} />
                    </div>
                    <div className={styles.carInfo}>
                        <h4>{task.carModel}</h4>
                        <p>{task.plate}</p>
                    </div>
                    <div className={styles.timeBadge}>{task.time}</div>
                </div>
                <div className={`${styles.retrieveBadge} ${task.type === 'Park' ? styles.park : ''}`}>
                    <span>{task.type} Vehicle</span>
                </div>
                <button className={styles.acceptBtn} onClick={() => handleAcceptTask(task)}>
                    <span>Accept Assignment</span>
                    <ChevronRight size={18} />
                </button>
                </div>
            ))}
            </section>
        )}

        <section className={styles.currentAssignment}>
          <div className={styles.sectionTitle}>
             <h3>Active Task</h3>
          </div>

          {activeTask ? (
            <div className={styles.assignmentCard}>
              <div className={styles.cardHeader}>
                 <div className={styles.carIconLarge}>
                    <Car size={32} />
                 </div>
                 <div className={styles.title}>
                    <h2>{activeTask.carModel}</h2>
                    <p>{activeTask.plate}</p>
                 </div>
                 <div className={styles.statusBadge}>
                    <span>In Progress</span>
                 </div>
              </div>

              <div className={styles.infoList}>
                 <div className={styles.infoItem}>
                    <div className={styles.icon}>
                       <User size={18} />
                    </div>
                    <div className={styles.text}>
                       <label>Customer</label>
                       <p>{activeTask.customer}</p>
                    </div>
                 </div>

                 <div className={styles.infoItem}>
                    <div className={styles.icon}>
                       <MapPin size={18} />
                    </div>
                    <div className={styles.text}>
                       <label>Location</label>
                       <p>{activeTask.location}</p>
                       <span>{activeTask.area}</span>
                    </div>
                 </div>

                 <div className={styles.infoItem}>
                    <div className={styles.icon}>
                       <MapPin size={18} color="#10B981" />
                    </div>
                    <div className={styles.text}>
                       <label>Action</label>
                       <p className={styles.highlight}>{activeTask.type} at {activeTask.slot}</p>
                    </div>
                 </div>

                 <div className={styles.infoItem}>
                    <div className={styles.icon}>
                       <Clock size={18} />
                    </div>
                    <div className={styles.text}>
                       <label>Assigned at</label>
                       <p>{activeTask.assignedAt}</p>
                    </div>
                 </div>
              </div>

              <button className={styles.completeBtn} onClick={handleCompleteTask}>
                 Slide to Complete
              </button>
            </div>
          ) : (
            <div className={styles.emptyState}>
                <p>No active tasks. Please accept a new assignment.</p>
            </div>
          )}
        </section>

        <section className={styles.completedSection}>
           <div className={styles.sectionTitle}>
              <h3>Recently Completed</h3>
           </div>
           <div className={styles.completedList}>
              {completedTasks.map(task => (
                <div key={task.id} className={styles.completedItem}>
                    <div className={styles.tick}><CheckCircle size={14} /></div>
                    <span>{task.text}</span>
                    <span className={styles.time}>{task.time}</span>
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default ValetView;
