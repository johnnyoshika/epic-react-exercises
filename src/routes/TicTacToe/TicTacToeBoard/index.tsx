import { Board } from '..';

const TicTacToeBoard = ({
  currentBoard,
  onPlayerMove,
  disableAll,
}: {
  currentBoard: Board;
  onPlayerMove: (squareId: number) => void;
  disableAll: boolean;
}) => {
  const square = (i: number) => {
    const player = currentBoard[i];
    return (
      <button
        onClick={() => onPlayerMove(i)}
        disabled={disableAll || !!player}
      >
        {player ?? '.'}
      </button>
    );
  };

  return (
    <table>
      <tbody>
        <tr>
          <td>{square(0)}</td>
          <td>{square(1)}</td>
          <td>{square(2)}</td>
        </tr>
        <tr>
          <td>{square(3)}</td>
          <td>{square(4)}</td>
          <td>{square(5)}</td>
        </tr>
        <tr>
          <td>{square(6)}</td>
          <td>{square(7)}</td>
          <td>{square(8)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TicTacToeBoard;
