import { useEffect, useState } from 'react';
import useSafeAsync from './useSafeAsync';

const SafeAsync = () => {
  const { data, status, error, runFunction } =
    useSafeAsync<Response>();

  const [resolvedData, setResolvedData] = useState<{
    id: number | undefined;
    name: string | undefined;
    error: string | undefined;
  }>();

  const characterId = 12345645645645645654546;

  useEffect(() => {
    runFunction(
      fetch(
        `https://rickandmortyapi.com/api/character/${characterId}`,
      ),
    );
  }, [characterId, runFunction]);

  useEffect(() => {
    if (!data) return;

    (async () => {
      const resolvedData = await data.json();
      setResolvedData(resolvedData);
    })();
  }, [data, setResolvedData]);

  if (status === 'idle') return <div>idle</div>;
  if (status === 'pending') return <div>pending</div>;
  if (status === 'rejected' && error) return <div>{error}</div>;
  if (status === 'resolved' && resolvedData)
    return (
      <div>
        {resolvedData.name} {resolvedData.error}
      </div>
    );
  return null;
};

export default SafeAsync;
