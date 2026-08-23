interface SliderProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  displayValue?: string;
}

export default function Slider({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  displayValue,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="settingRow">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(to right, #d5c917 0%, #d5c917 ${pct}%, #3E3A40 ${pct}%, #3E3A40 100%)`,
        }}
      />

      {displayValue && <span>{displayValue}</span>}
    </div>
  );
}