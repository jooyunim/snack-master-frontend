type InfoField = {
  label: string;
  value: string;
};

type InfoRow =
  | { type: 'pair'; left: InfoField; right: InfoField }
  | { type: 'single'; field: InfoField };

type InfoSectionProps = {
  title: string;
  rows: readonly InfoRow[];
};

function LabelCell({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-[50px] w-[140px] shrink-0 items-center border-b border-r border-solid border-gray-100 p-2 max-lg:h-auto max-lg:min-h-[50px] max-lg:self-stretch ${className}`.trim()}
    >
      <p className="text-center text-[16px] tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        {label}
      </p>
    </div>
  );
}

function ValueCell({
  value,
  withRightBorder = false,
  className = '',
}: {
  value: string;
  withRightBorder?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex h-[50px] min-w-0 flex-1 items-center border-b border-solid border-gray-100 px-5 py-2 max-lg:h-auto max-lg:min-h-[50px] max-lg:self-stretch max-sm:px-4 ${
        withRightBorder ? 'border-r max-sm:border-r-0' : ''
      } ${className}`.trim()}
    >
      <p className="truncate text-center text-[16px] font-bold tracking-[-0.4px] text-gray-900 max-lg:overflow-visible max-lg:whitespace-normal max-lg:leading-[1.6] max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        {value}
      </p>
    </div>
  );
}

export default function InfoSection({ title, rows }: InfoSectionProps) {
  return (
    <section className="flex w-full flex-col">
      <div className="flex w-full items-center border-b border-solid border-gray-950 px-2 py-5 max-lg:py-[14px] max-sm:px-0">
        <h2 className="text-center text-[16px] font-extrabold tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
          {title}
        </h2>
      </div>

      {rows.map((row, index) =>
        row.type === 'pair' ? (
          <div
            key={index}
            className="flex w-full items-center max-lg:items-stretch max-sm:flex-col"
          >
            <div className="flex min-w-0 flex-1 items-center max-lg:items-stretch max-sm:w-full">
              <LabelCell
                label={row.left.label}
                className="max-lg:items-start max-sm:items-start max-sm:py-4"
              />
              <ValueCell
                value={row.left.value}
                withRightBorder
                className="max-lg:items-start max-sm:items-start max-sm:p-4"
              />
            </div>
            <div className="flex min-w-0 flex-1 items-center max-lg:items-stretch max-sm:w-full">
              <LabelCell
                label={row.right.label}
                className="px-5 py-2 max-lg:items-start max-sm:items-start max-sm:p-2 max-sm:py-4"
              />
              <ValueCell
                value={row.right.value}
                className="max-lg:items-start max-sm:items-start max-sm:p-4"
              />
            </div>
          </div>
        ) : (
          <div
            key={index}
            className="flex h-[50px] w-full items-center max-lg:h-auto max-lg:items-stretch"
          >
            <LabelCell
              label={row.field.label}
              className="max-lg:items-start max-lg:py-5 max-sm:py-4"
            />
            <ValueCell
              value={row.field.value}
              className="max-lg:items-start max-lg:p-5 max-sm:p-4"
            />
          </div>
        ),
      )}
    </section>
  );
}
