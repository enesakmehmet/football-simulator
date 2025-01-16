import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

const PuanDurumu = lazy(() => import('./components/PuanDurumu'));
const Fixture = lazy(() => import('./components/Fixture'));
const MacDetay = lazy(() => import('./components/MacDetay'));
const Takimlar = lazy(() => import('./components/Takimlar'));
const TakimDetay = lazy(() => import('./components/TakimDetay'));
const Istatistikler = lazy(() => import('./components/Istatistikler'));
const OyuncuProfil = lazy(() => import('./components/OyuncuProfil'));
const Haberler = lazy(() => import('./components/Haberler'));
const CanliMaclar = lazy(() => import('./components/CanliMaclar'));
const MacTakvimi = lazy(() => import('./components/MacTakvimi'));
const TransferMerkezi = lazy(() => import('./components/TransferMerkezi'));
const Antrenman = lazy(() => import('./components/Antrenman'));
const IstatistikAnaliz = lazy(() => import('./components/IstatistikAnaliz'));
const MacTahminleri = lazy(() => import('./components/MacTahminleri'));
const Bildirimler = lazy(() => import('./components/Bildirimler'));

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<PuanDurumu />} />
            <Route path="/fixture" element={<Fixture />} />
            <Route path="/mac-detay/:id" element={<MacDetay />} />
            <Route path="/takimlar" element={<Takimlar />} />
            <Route path="/takim/:takimAdi" element={<TakimDetay />} />
            <Route path="/istatistikler" element={<Istatistikler />} />
            <Route path="/oyuncu/:id" element={<OyuncuProfil />} />
            <Route path="/haberler" element={<Haberler />} />
            <Route path="/canli-maclar" element={<CanliMaclar />} />
            <Route path="/mac-takvimi" element={<MacTakvimi />} />
            <Route path="/transfer-merkezi" element={<TransferMerkezi />} />
            <Route path="/antrenman" element={<Antrenman />} />
            <Route path="/istatistik-analiz" element={<IstatistikAnaliz />} />
            <Route path="/mac-tahminleri" element={<MacTahminleri />} />
            <Route path="/bildirimler" element={<Bildirimler />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
