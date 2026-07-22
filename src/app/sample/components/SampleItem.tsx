import type { Sample } from '../types/sample.types';

type SampleItemProps = {
  sample: Sample;
  onSelect: (id: number) => void;
};

export default function SampleItem({ sample, onSelect }: SampleItemProps) {
  return (
    <li>
      <button type="button" onClick={() => onSelect(sample.id)}>
        {sample.title}
      </button>
    </li>
  );
}
