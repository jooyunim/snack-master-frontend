import type { Sample } from '../types/sample.types';

import SampleItem from './SampleItem';

type SampleListProps = {
  samples: Sample[];
  onSelect: (id: number) => void;
};

export default function SampleList({ samples, onSelect }: SampleListProps) {
  return (
    <ul>
      {samples.map((sample) => (
        <SampleItem key={sample.id} sample={sample} onSelect={onSelect} />
      ))}
    </ul>
  );
}
