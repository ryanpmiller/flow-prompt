import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import FlowBuilder from './pages/FlowBuilder';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Templates from './pages/Templates';

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-gray-50 flex flex-col">
				<Navigation />
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/build" element={<FlowBuilder />} />
						<Route path="/templates" element={<Templates />} />
						<Route path="/pricing" element={<Pricing />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
