import { FormEvent, useState } from 'react';

type SampleFormProps = {
  onSubmit: (title: string) => void;
  isPending: boolean;
};

export default function SampleForm({ onSubmit, isPending }: SampleFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) return;

    onSubmit(title.trim());
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="title"
      />
      <button type="submit" disabled={isPending}>
        생성
      </button>
    </form>
  );
}
