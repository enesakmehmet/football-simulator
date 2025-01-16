import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { takimKadrolari, pozisyonOlaylari } from '../data/takimKadrolari';
import './MacSimulasyon.css';

function MacSimulasyon({ evSahibi, deplasman, onMacBitti }) {
  const [dakika, setDakika] = useState(0);
  const [evSahibiSkor, setEvSahibiSkor] = useState(0);
  const [deplasmanSkor, setDeplasmanSkor] = useState(0);
  const [macOlaylari, setMacOlaylari] = useState([]);
  const [oyunBitti, setOyunBitti] = useState(false);
  const [evSahibiTopaSahipOlma, setEvSahibiTopaSahipOlma] = useState(50);
  const [deplasmanTopaSahipOlma, setDeplasmanTopaSahipOlma] = useState(50);
  const [evSahibiSut, setEvSahibiSut] = useState(0);
  const [deplasmanSut, setDeplasmanSut] = useState(0);
  const [evSahibiPas, setEvSahibiPas] = useState(0);
  const [deplasmanPas, setDeplasmanPas] = useState(0);

  const rastgeleOyuncuSec = (takim, pozisyon) => {
    if (!takimKadrolari[takim]) return { no: 0, ad: "Bilinmeyen Oyuncu", yetenek: 75 };
    const oyuncular = takimKadrolari[takim][pozisyon];
    return oyuncular[Math.floor(Math.random() * oyuncular.length)];
  };

  const yeniOlayEkle = (dakika) => {
    const aktifTakim = Math.random() > 0.5 ? evSahibi : deplasman;
    
    // Pozisyona göre olay oluştur
    let pozisyon;
    const pozisyonSansi = Math.random();
    if (pozisyonSansi < 0.1) pozisyon = 'kaleci';
    else if (pozisyonSansi < 0.35) pozisyon = 'defans';
    else if (pozisyonSansi < 0.75) pozisyon = 'ortasaha';
    else pozisyon = 'forvet';

    const oyuncu = rastgeleOyuncuSec(aktifTakim, pozisyon + (pozisyon === 'kaleci' ? 'ler' : ''));
    const olay = pozisyonOlaylari[pozisyon][Math.floor(Math.random() * pozisyonOlaylari[pozisyon].length)];
    const yeniOlay = `${dakika}' ${oyuncu.no} ${oyuncu.ad} ${olay}`;

    if (olay.includes("kaleyi") || olay.includes("şut") || olay.includes("kafa vuruşu")) {
      const golSansi = Math.random() * (oyuncu.yetenek / 80); // Yetenek seviyesi gol şansını etkiler
      if (golSansi > 0.7) {
        setTimeout(() => {
          const golOlayi = `${dakika}' GOL! ${oyuncu.no} ${oyuncu.ad} (${aktifTakim})`;
          setMacOlaylari(prev => [golOlayi, ...prev]);
          if (aktifTakim === evSahibi) {
            setEvSahibiSkor(prev => prev + 1);
          } else {
            setDeplasmanSkor(prev => prev + 1);
          }
        }, 1000);
      } else if (golSansi > 0.4) {
        setTimeout(() => {
          const kaleci = rastgeleOyuncuSec(aktifTakim === evSahibi ? deplasman : evSahibi, 'kaleciler');
          const kurtaris = `${dakika}' ${kaleci.no} ${kaleci.ad} kritik bir kurtarış yapıyor!`;
          setMacOlaylari(prev => [kurtaris, ...prev]);
        }, 1000);
      } else {
        setTimeout(() => {
          const kacanGol = `${dakika}' ${oyuncu.no} ${oyuncu.ad} - Auta giden şut!`;
          setMacOlaylari(prev => [kacanGol, ...prev]);
        }, 1000);
      }
    }

    setMacOlaylari(prev => [yeniOlay, ...prev]);
  };

  useEffect(() => {
    if (dakika >= 90) {
      setOyunBitti(true);
      onMacBitti({
        evSahibi: {
          takim: evSahibi,
          gol: evSahibiSkor,
          yedigiGol: deplasmanSkor
        },
        deplasman: {
          takim: deplasman,
          gol: deplasmanSkor,
          yedigiGol: evSahibiSkor
        }
      });
      return;
    }

    const interval = setInterval(() => {
      setDakika(prev => prev + 1);
      setEvSahibiTopaSahipOlma((prev) => Math.min(100, prev + Math.random() * 2));
      setDeplasmanTopaSahipOlma((prev) => Math.min(100, prev + Math.random() * 2));
      setEvSahibiSut((prev) => prev + Math.floor(Math.random() * 3));
      setDeplasmanSut((prev) => prev + Math.floor(Math.random() * 3));
      setEvSahibiPas((prev) => prev + Math.floor(Math.random() * 5));
      setDeplasmanPas((prev) => prev + Math.floor(Math.random() * 5));
      if (Math.random() > 0.7) {
        yeniOlayEkle(dakika + 1);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [dakika, evSahibi, deplasman]);

  return (
    <div className="mac-simulasyon">
      <h2>Maç Simülasyonu</h2>
      <div className="istatistikler">
        <h3>İstatistikler</h3>
        <p>Ev Sahibi Topa Sahip Olma: {evSahibiTopaSahipOlma.toFixed(1)}%</p>
        <p>Deplasman Topa Sahip Olma: {deplasmanTopaSahipOlma.toFixed(1)}%</p>
        <p>Ev Sahibi Şut: {evSahibiSut}</p>
        <p>Deplasman Şut: {deplasmanSut}</p>
        <p>Ev Sahibi Pas: {evSahibiPas}</p>
        <p>Deplasman Pas: {deplasmanPas}</p>
      </div>
      <div className="skor-tablosu">
        <div className="takim ev-sahibi">
          <span className="takim-adi">{evSahibi}</span>
          <div className="ilk11">
            {takimKadrolari[evSahibi]?.kaleciler[0]?.ad}
          </div>
        </div>
        <div className="skor">
          {evSahibiSkor} - {deplasmanSkor}
        </div>
        <div className="takim deplasman">
          <span className="takim-adi">{deplasman}</span>
          <div className="ilk11">
            {takimKadrolari[deplasman]?.kaleciler[0]?.ad}
          </div>
        </div>
      </div>
      
      <div className="mac-bilgisi">
        <div className="dakika">{oyunBitti ? "Maç Sona Erdi" : `${dakika}'`}</div>
        <div className="ilerleme-cubugu">
          <div className="ilerleme" style={{ width: `${(dakika / 90) * 100}%` }}></div>
        </div>
      </div>

      <div className="mac-olaylari">
        {macOlaylari.map((olay, index) => (
          <div key={index} className={`olay ${olay.includes('GOL!') ? 'gol-olayi' : ''}`}>
            {olay}
          </div>
        ))}
      </div>
    </div>
  );
}

MacSimulasyon.propTypes = {
  evSahibi: PropTypes.string.isRequired,
  deplasman: PropTypes.string.isRequired,
  onMacBitti: PropTypes.func.isRequired
};

export default MacSimulasyon; 