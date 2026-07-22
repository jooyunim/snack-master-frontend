'use client';

import { useState } from 'react';

import SampleForm from './components/SampleForm';
import SampleList from './components/SampleList';
import { useSampleDetail } from './hooks/useSampleDetail';
import { useSampleList } from './hooks/useSampleList';
import { useSampleMutations } from './hooks/useSampleMutations';

export default function SamplePage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: samples, isLoading, isError } = useSampleList();
  const { data: selectedSample } = useSampleDetail(selectedId);
  const { createMutation } = useSampleMutations();

  const handleCreate = (title: string) => {
    createMutation.mutate({ title });
  };

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error</div>;

  return (
    <div>
      <h1>Sample Page</h1>

      <SampleForm
        onSubmit={handleCreate}
        isPending={createMutation.isPending}
      />

      <SampleList samples={samples ?? []} onSelect={setSelectedId} />

      {selectedSample && (
        <section>
          <h2>상세</h2>
          <p>id: {selectedSample.id}</p>
          <p>title: {selectedSample.title}</p>
          <p>createdAt: {selectedSample.createdAt}</p>
        </section>
      )}
    </div>
  );
}
