import "./App.css";
import { Calculator } from "./components/calculator";

function App() {
	return (
		<>
			<div className='bg-neutral-700 w-screen h-screen flex justify-center items-center'>
				<Calculator />
			</div>
		</>
	);
}

export default App;
