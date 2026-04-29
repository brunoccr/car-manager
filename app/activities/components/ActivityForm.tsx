import { createOrUpdateActivity } from "@/actions/activities";
import { useState } from "react";

const InputField = ({
  label,
  name,
  variant = "text",
  min = "0",
  step = "0.01",
  required = false,
  tabIndex = 1,
  placeholder = "",
}: {
  label: string;
  name: string;
  variant?: string;
  min?: string;
  step?: string;
  required?: boolean;
  tabIndex?: number;
  placeholder?: string;
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-gray-100"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          tabIndex={tabIndex}
          type={variant}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          min={min}
          step={step}
          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />
      </div>
    </div>
  );
};

export default function ActivivityNew({
  id,
  onFinish,
}: {
  id?: string;
  onFinish: () => void;
}) {
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const result = await createOrUpdateActivity(formData);

    if (result.success) {
      onFinish();
    } else {
      setError(result.error as string);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-slate-800 rounded-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white">
          Nova Atividade
        </h2>
      </div>

      <div className="mt-10 mx-auto w-full max-w-sm">
        <form action={handleSubmit} className="space-y-6">
          <input type="hidden" id="id" name="id" value={id} />
          <div>
            <InputField
              label="Data"
              name="date"
              variant="date"
              tabIndex={1}
              required
              placeholder="00/00/0000"
            />
          </div>
          <div className="flex flex-row gap-5">
            <InputField
              label="Km total"
              name="totalKM"
              variant="number"
              tabIndex={2}
              placeholder="000000"
              required
              min="1"
              step="1"
            />
            <InputField
              label="Total pago"
              name="totalValue"
              variant="number"
              tabIndex={3}
              required
              placeholder="R$ 0,00"
              min="1"
              step="0.01"
            />
          </div>
          <div>
            <InputField
              label="Litros"
              name="volume"
              variant="number"
              tabIndex={4}
              required
              placeholder="0,00"
              min="1"
              step="0.01"
            />
          </div>
          {error && (
            <div className="mt-5 flex items-center flex-col text-red-700">
              {error}
            </div>
          )}
          <div>
            <button
              tabIndex={99}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
