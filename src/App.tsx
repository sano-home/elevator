import { ControlPanel } from './components/ControlPanel';

function App() {
  const NUMBER_OF_FLOORS = 10;

  return (
    <div className="App">
      <ControlPanel numberOfFloors={NUMBER_OF_FLOORS} currentFloor={1} isGoingUp={true} />
    </div>
  );
}

export default App;
