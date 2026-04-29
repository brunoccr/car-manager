import { useEffect, useState } from "react";

export const InputField = ({
  label,
  name,
  className = "",
  variant = "text",
  min = "0",
  step = "0.01",
  required = false,
  tabIndex = 1,
  placeholder = "",
  onChange = () => {},
  options,
  value,
}: {
  label: string;
  name: string;
  className?: string;
  variant?: string;
  min?: string;
  step?: string;
  required?: boolean;
  tabIndex?: number;
  placeholder?: string;
  onChange?: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string;
}) => {
  const treatedValue =
    value == null || variant === "date" ? value?.split(" ")[0] : value;

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-gray-100"
      >
        {label}
      </label>
      <div className="mt-2">
        {variant == "combo" && options?.length ? (
          <select
            id={name}
            name={name}
            defaultValue={treatedValue}
            onChange={(event) => onChange(event.target.value)}
            className={`${className} block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`}
          >
            {options &&
              options.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
          </select>
        ) : (
          <input
            tabIndex={tabIndex}
            type={variant}
            id={name}
            name={name}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            required={required}
            min={min}
            step={step}
            defaultValue={treatedValue}
            className={`${className} block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`}
          />
        )}
      </div>
    </div>
  );
};
