"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Controlled radio toggler
export default function RadioTogglers({ options, value, defaultValue, onChange, name = "bgType" }) {
  const current = value ?? defaultValue;
  return (
    <div className="radio-togglers shadow">
      {options.map(option => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={current === option.value}
            onChange={(ev) => onChange(ev.target.value)}
          />
          <div>
            <FontAwesomeIcon icon={option.icon} />
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
}
