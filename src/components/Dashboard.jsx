import { Link } from 'react-router-dom';
export default function Dashboard() {
  return (
    <div>
      <h2>Jobly Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <Link to="/job-tracker"><button>Job Tracker</button></Link>
      <Link to="/learning-tracker"><button>Learning Tracker</button></Link>
      <Link to="/job-search"><button>Job Search</button></Link>
    </div>
  );
}
// This is a simple functional component that renders a dashboard with a welcome message and some instructions.