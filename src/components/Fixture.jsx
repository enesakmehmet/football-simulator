import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MacSimulasyon from './MacSimulasyon';
import './Fixture.css';

const takimlar = [
  "Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor",
  "Başakşehir", "Adana Demirspor", "Antalyaspor", "Konyaspor",
  "Alanyaspor", "Kayserispor", "Gaziantep FK", "Sivasspor",
  "Kasımpaşa", "Giresunspor", "Hatayspor", "İstanbulspor",
  "Ankaragücü", "Pendikspor"
];

function Fixture() {
  const [hafta, setHafta] = useState(1);
  const [maclar, setMaclar] = useState([]);
  const [simulasyonMaci, setSimulasyonMaci] = useState(null);
  const [bekleyenMaclar, setBekleyenMaclar] = useState([]);

  const simuleMacYap = (evSahibi, deplasman) => {
    return {
      evSahibi,
      deplasman,
      id: `${evSahibi}-${deplasman}-${Date.now()}`
    };
  };

  const macSonucunuKaydet = (sonuc) => {
    const puanGuncelle = new CustomEvent('puanGuncelle', {
      detail: {
        evSahibi: {
          takim: sonuc.evSahibi.takim,
          gol: sonuc.evSahibi.gol,
          yedigiGol: sonuc.evSahibi.yedigiGol,
          puan: sonuc.evSahibi.gol > sonuc.deplasman.gol ? 3 : sonuc.evSahibi.gol === sonuc.deplasman.gol ? 1 : 0,
          galibiyet: sonuc.evSahibi.gol > sonuc.deplasman.gol ? 1 : 0,
          beraberlik: sonuc.evSahibi.gol === sonuc.deplasman.gol ? 1 : 0,
          maglubiyet: sonuc.evSahibi.gol < sonuc.deplasman.gol ? 1 : 0
        },
        deplasman: {
          takim: sonuc.deplasman.takim,
          gol: sonuc.deplasman.gol,
          yedigiGol: sonuc.deplasman.yedigiGol,
          puan: sonuc.deplasman.gol > sonuc.evSahibi.gol ? 3 : sonuc.deplasman.gol === sonuc.evSahibi.gol ? 1 : 0,
          galibiyet: sonuc.deplasman.gol > sonuc.evSahibi.gol ? 1 : 0,
          beraberlik: sonuc.deplasman.gol === sonuc.evSahibi.gol ? 1 : 0,
          maglubiyet: sonuc.deplasman.gol < sonuc.evSahibi.gol ? 1 : 0
        }
      }
    });
    window.dispatchEvent(puanGuncelle);

    setMaclar(prev => [
      ...prev,
      {
        ...sonuc,
        evSahibiGol: sonuc.evSahibi.gol,
        deplasmanGol: sonuc.deplasman.gol,
        tamamlandi: true,
        id: `${sonuc.evSahibi.takim}-${sonuc.deplasman.takim}-${sonuc.evSahibi.gol}-${sonuc.deplasman.gol}-${Date.now()}`
      }
    ]);

    if (bekleyenMaclar.length > 0) {
      const [siradakiMac, ...kalanMaclar] = bekleyenMaclar;
      setBekleyenMaclar(kalanMaclar);
      setSimulasyonMaci(siradakiMac);
    } else {
      setSimulasyonMaci(null);
    }
  };

  const haftayiSimuleEt = () => {
    const yeniMaclar = [];
    const mevcutTakimlar = [...takimlar];
    
    while (mevcutTakimlar.length > 0) {
      const evSahibi = mevcutTakimlar.splice(Math.floor(Math.random() * mevcutTakimlar.length), 1)[0];
      const deplasman = mevcutTakimlar.splice(Math.floor(Math.random() * mevcutTakimlar.length), 1)[0];
      yeniMaclar.push(simuleMacYap(evSahibi, deplasman));
    }

    setMaclar([]);
    const [ilkMac, ...digerMaclar] = yeniMaclar;
    setSimulasyonMaci(ilkMac);
    setBekleyenMaclar(digerMaclar);
    setHafta(prev => prev + 1);
  };

  return (
    <div className="fixture">
      <div className="fixture-header">
        <h2>{hafta}. Hafta Maçları</h2>
        <button 
          onClick={haftayiSimuleEt}
          disabled={simulasyonMaci !== null}
        >
          Haftayı Simüle Et
        </button>
      </div>
      
      {simulasyonMaci && (
        <MacSimulasyon
          evSahibi={simulasyonMaci.evSahibi}
          deplasman={simulasyonMaci.deplasman}
          onMacBitti={macSonucunuKaydet}
        />
      )}
      
      <div className="maclar">
        {maclar.map((mac) => (
          <Link to={`/mac-detay/${mac.id}`} key={mac.id} className="mac-card">
            <div className="takim ev-sahibi">
              <span>{mac.evSahibi}</span>
              <span className="skor">{mac.evSahibiGol}</span>
            </div>
            <div className="ayrac">-</div>
            <div className="takim deplasman">
              <span className="skor">{mac.deplasmanGol}</span>
              <span>{mac.deplasman}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Fixture; 