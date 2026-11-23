import styles from './MonthlyFocusCard.module.css';

function MonthlyFocus(){
    return (
        <div className={styles.monthlyFocusCard}>
            <h2 className={styles.monthName}>December Focus</h2>
            <h2 className={styles.monthFocus}>Wushu Stances | Cartwheels | Class Rules</h2>
        </div>
    );
}

export default MonthlyFocus;