import type { Field } from "./types";

const base =
  "w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand focus:bg-white";

export function FieldRenderer({
  field,
  value,
}: {
  field: Field;
  value?: string | number | boolean;
}) {
  const common = {
    id: field.name,
    name: field.name,
    required: field.required,
    placeholder: field.placeholder,
  };

  return (
    <div className={field.colSpan === 2 ? "sm:col-span-2" : ""}>
      {field.type !== "checkbox" && (
        <label htmlFor={field.name} className="mb-1.5 block text-sm font-semibold text-brand-navy">
          {field.label}
          {field.required && <span className="text-danger"> *</span>}
        </label>
      )}

      {field.type === "textarea" && (
        <textarea
          {...common}
          rows={field.rows ?? 4}
          defaultValue={String(value ?? "")}
          className={base + " resize-none"}
        />
      )}

      {field.type === "select" && (
        <select {...common} defaultValue={String(value ?? "")} className={base}>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}

      {field.type === "checkbox" && (
        <label className="mt-6 flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-brand-navy">
          <input
            type="checkbox"
            name={field.name}
            defaultChecked={Boolean(value)}
            className="h-5 w-5 rounded border-border text-brand accent-[#0b57c4]"
          />
          {field.label}
        </label>
      )}

      {(field.type === "text" || field.type === "number") && (
        <input
          {...common}
          type={field.type}
          defaultValue={String(value ?? "")}
          className={base}
        />
      )}

      {field.type === "date" && (
        <input
          {...common}
          type="date"
          defaultValue={value ? String(value).slice(0, 10) : ""}
          className={base}
        />
      )}

      {field.type === "datetime" && (
        <input
          {...common}
          type="datetime-local"
          defaultValue={value ? String(value).slice(0, 16) : ""}
          className={base}
        />
      )}

      {field.help && (
        <p className="mt-1 text-xs text-muted-foreground">{field.help}</p>
      )}
    </div>
  );
}
