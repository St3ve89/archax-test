import { RangeSliderProps } from "./range-slider.type";
import styles from "./range-slider.module.css";

export const RangeSlider = ({
  min,
  max,
  value,
  onChange,
  label,
  id,
}: RangeSliderProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className={styles.rangeSlider}>
      {label && (
        <label htmlFor={id} className={styles.sliderLabel}>
          {label}
        </label>
      )}
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className={styles.slider}
      />
      <div className={styles.sliderValues}>
        <span>${value}</span>
        <span>${max}</span>
      </div>
    </div>
  );
};
