import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

const App = () => {
  return (
    <div style={{ margin: '24px auto', width: '640px' }}>
      <div style={{ textAlign: 'center' }}>
        <img src={viteLogo} alt="Vite logo" />
        <img
          src={reactLogo}
          className="logo react"
          alt="React logo"
        />
      </div>
    </div>
  );
};

export default App;
