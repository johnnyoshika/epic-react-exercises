const MoveHistory = ({
  numberOfSnapshots,
  onLoadBoardSnapshot,
  currentSnapshotId,
}: {
  numberOfSnapshots: number;
  onLoadBoardSnapshot: (snapshotId: number) => void;
  currentSnapshotId: number;
}) => {
  const buttons = Array.from(Array(numberOfSnapshots)).map((_, i) => (
    <button
      key={i}
      disabled={i === currentSnapshotId}
      onClick={() => onLoadBoardSnapshot(i)}
    >
      {i}
    </button>
  ));

  return <div>{buttons}</div>;
};

export default MoveHistory;
