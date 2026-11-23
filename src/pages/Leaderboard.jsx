import styles from "./Leaderboard.module.css";
import StudentCard from "../components/StudentCard.jsx";
import MonthlyFocusCard from "../components/MonthlyFocusCard.jsx";

function Leaderboard() {
  return (
    <div className={styles.Leaderboard}>
      <h1 className={styles.title}>Level Rankings</h1>
      <MonthlyFocusCard />
    </div>
  );
}

export default Leaderboard;