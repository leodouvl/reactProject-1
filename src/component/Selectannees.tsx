import { useMemo } from "react";

type SelectAnneesProps = {
  start?: number;
  value: number | "";
  onChange: (annee: number | "") => void;
};

export function SelectAnnees({
  start = 1900,
  value,
  onChange,
}: SelectAnneesProps) {
  // Current year memoized: will never change during session
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Generate year list only once unless start changes
  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = currentYear; y >= start; y--) {
      arr.push(y);
    }
    return arr;
  }, [start, currentYear]);

  return (
    <select
      value={value}
      onChange={(e) => {
        const val = e.target.value === "" ? "" : Number(e.target.value);
        onChange(val);
      }}
    >
      <option value="">Toutes les années</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
