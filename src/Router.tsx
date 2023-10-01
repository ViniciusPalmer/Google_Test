import {Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Results } from './pages/Results';

export function Router() {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
        </Routes>
    )
}