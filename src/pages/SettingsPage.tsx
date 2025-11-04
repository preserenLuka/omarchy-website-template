import s from "./SettingsPage.module.css";

export default function SettingsPage() {
  return (
    <div className={s.wrapper}>
      <h2>Settings</h2>
      <p>TLDR this is only an example setting page, it has no functions</p>

      <div className={s.setting}>
        <label>
          <span>Dark Mode:</span>
          <input type="checkbox" defaultChecked />
        </label>
      </div>

      <div className={s.setting}>
        <label>
          <span>Font Size:</span>
          <select defaultValue="medium">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
      </div>
    </div>
  );
}
