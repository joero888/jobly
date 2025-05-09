import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import JobTracker from './components/JobTracker';
import LearningTracker from './components/LearningTracker';
import JobSearch from './components/JobSearch';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/job-tracker" element={<JobTracker />} />
        <Route path="/learning-tracker" element={<LearningTracker />} />
        <Route path="/job-search" element={<JobSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
