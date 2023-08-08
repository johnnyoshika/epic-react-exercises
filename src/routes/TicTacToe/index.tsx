import useStickyState from '../../hooks/useStickyState';
import MoveHistory from './MoveHistory';
import TicTacToeBoard from './TicTacToeBoard';

export type Board = [
  Player,
  Player,
  Player,
  Player,
  Player,
  Player,
  Player,
  Player,
  Player,
];
export type Player = typeof X_PLAYER | typeof O_PLAYER | null;
export const X_PLAYER = 'X';
export const O_PLAYER = 'O';

const STREAKS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const analyzeBoard = (
  board: Board,
): {
  gameFinished: boolean;
  winnerIfAny: Player;
  playerToMove: Player;
} => {
  // 1. check if there is a winning streak, and if so, which player, return
  for (const streak of STREAKS) {
    const [a, b, c] = streak.map(i => board[i]);
    if (a !== null && a === b && b === c) {
      return {
        gameFinished: true,
        winnerIfAny: a,
        playerToMove: null,
      };
    }
  }

  // 2. if no winning streak, check if the board has been fully occupied
  const occupiedSquaresLength = board.filter(x => x !== null).length;
  if (occupiedSquaresLength === board.length) {
    return {
      gameFinished: true,
      winnerIfAny: null,
      playerToMove: null,
    };
  }

  // 3. if the board is not fully occupied, check whose turn it is
  const playerToMove =
    occupiedSquaresLength % 2 === 0 ? X_PLAYER : O_PLAYER;
  return { gameFinished: false, winnerIfAny: null, playerToMove };
};

const INITIAL_BOARD: Board = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];
const INITIAL_STATE = {
  boardSnapshots: [INITIAL_BOARD],
  currentSnapshotId: 0,
};

const TicTacToe = () => {
  const [state, setState] = useStickyState(
    INITIAL_STATE,
    'hooks:tictactoe',
  );

  const { boardSnapshots, currentSnapshotId } = state;
  const currentBoard = boardSnapshots[currentSnapshotId];
  const { gameFinished, winnerIfAny, playerToMove } =
    analyzeBoard(currentBoard);
  const numberOfSnapshots = boardSnapshots.length;

  const onPlayerMove = (squareId: number) => {
    // all occupied squares are disabled at this point
    // so when this callback is fired
    // it's safe to assume that this is a valid move
    // bottomline: no need to check.
    let nextBoard = currentBoard.slice() as Board; // shallow copy
    nextBoard[squareId] = playerToMove;
    const nextBoardSnapshots: Board[] = [
      ...boardSnapshots.slice(0, currentSnapshotId + 1),
      nextBoard,
    ];

    setState({
      boardSnapshots: nextBoardSnapshots,
      currentSnapshotId: currentSnapshotId + 1,
    });
  };

  const onLoadBoardSnapshot = (snapshotId: number) =>
    setState({ ...state, currentSnapshotId: snapshotId });

  const onRestart = () => setState(INITIAL_STATE);

  const boardStatus = gameFinished
    ? winnerIfAny
      ? `Winner: Player ${winnerIfAny}`
      : 'Nobody won'
    : `Next player: ${playerToMove}`;

  return (
    <div>
      <h1>{boardStatus}</h1>
      <TicTacToeBoard
        currentBoard={currentBoard}
        onPlayerMove={onPlayerMove}
        disableAll={gameFinished}
      />
      <MoveHistory
        numberOfSnapshots={numberOfSnapshots}
        onLoadBoardSnapshot={onLoadBoardSnapshot}
        currentSnapshotId={currentSnapshotId}
      />
      <button disabled={numberOfSnapshots === 1} onClick={onRestart}>
        Restart
      </button>
    </div>
  );
};

export default TicTacToe;
