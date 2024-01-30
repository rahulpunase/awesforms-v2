const BooleanConfigEditor = ({
  initialValue,
  onChange,
  label,
}: {
  initialValue: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) => {
  return (
    <div className="flex flex-col  mt-6">
      <div className="mb-1">
        <label className="cursor-pointer flex items-center flex-row ">
          <input
            type="checkbox"
            name="meta_field"
            checked={!!initialValue}
            onChange={() => onChange(!initialValue)}
          />
          <span className="ml-2">{label}</span>
        </label>
      </div>
    </div>
  );
};

export default BooleanConfigEditor;
