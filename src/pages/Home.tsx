import Tile from "../components/Tile";
import s from "./Home.module.css";

export default function Home() {
  return (
    <div className={s.wrapper}>
      <Tile title="Today's Schedule" className={s.tileLarge}>
        <ul>
          <li>08:00 – Workout</li>
          <li>10:00 – Coding Session</li>
          <li>14:00 – Lunch</li>
          <li>17:00 – Stretching</li>
        </ul>
      </Tile>

      <Tile title="Stats" className={s.tileSmall}>
        <p>Completed: 5 tasks</p>
        <p>Focus: 80%</p>
      </Tile>

      <Tile title="Notes" className={s.tileMedium}>
        <p>💡 Remember to push updates to GitHub!</p>
      </Tile>
    </div>
  );
}
