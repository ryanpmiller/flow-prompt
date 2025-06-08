import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Navigation from './components/Navigation';
import FAQ from './pages/FAQ';
import FlowBuilder from './pages/FlowBuilder';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Templates from './pages/Templates';
import Terms from './pages/Terms';

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
						<Route path="/faq" element={<FAQ />} />
						<Route path="/privacy" element={<Privacy />} />
						<Route path="/terms" element={<Terms />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
