import { Routes, Route, Navigate } from 'react-router-dom'

import JSONChecker from "./pages/JSONChecker";
import SVGViewer from './pages/SVGViewer';
import SimpleHeader from './components/SimpleHeader';

function App() {

  return (
    <div>
      <SimpleHeader/>
      <Routes>
        <Route path="/" element={<Navigate to="/json-checker" />} />
        <Route path="/json-checker" element={<JSONChecker/>} />
        <Route path="/svg-viewer" element={<SVGViewer/>} />
      </Routes>
      {/* <JSONChecker/>
      <SVGViewer/> */}
    </div>
  );
}

export default App;
