import { Routes, Route, Navigate } from 'react-router-dom'

import JSONChecker from "./pages/JSONChecker";
import SVGViewer from './pages/SVGViewer';
import SimpleHeader from './components/SimpleHeader';
import TestPage from './pages/TestPage';

function App() {

  return (
    <div>
      <SimpleHeader/>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/json-checker" />} /> */}
        <Route path="/" element={<Navigate to="/test" />} />

        <Route path="/json-checker" element={<JSONChecker/>} />
        <Route path="/svg-viewer" element={<SVGViewer/>} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
      {/* <JSONChecker/>
      <SVGViewer/> */}
    </div>
  );
}

export default App;
