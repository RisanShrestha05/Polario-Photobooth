import { Navigate, Route, Routes } from 'react-router-dom';
import { useBooth } from './context/BoothContext.jsx';
import Camera from './pages/Camera/Camera.jsx';
import Customize from './pages/Customize/Customize.jsx';
import Landing from './pages/Landing/Landing.jsx';
import SelectGrid from './pages/SelectGrid/SelectGrid.jsx';

/** /camera needs a confirmed grid. */
function RequireGrid({ children }) {
  const { state } = useBooth();
  return state.gridConfirmed ? children : <Navigate to="/select" replace />;
}

/** /customize needs every photo taken. */
function RequirePhotos({ children }) {
  const { state } = useBooth();
  if (!state.gridConfirmed) return <Navigate to="/select" replace />;
  const complete = state.photos.length > 0 && state.photos.every(Boolean);
  return complete ? children : <Navigate to="/camera" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/select" element={<SelectGrid />} />
      <Route path="/camera" element={<RequireGrid><Camera /></RequireGrid>} />
      <Route path="/customize" element={<RequirePhotos><Customize /></RequirePhotos>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
