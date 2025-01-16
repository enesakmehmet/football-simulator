import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MacDetay.css';

const stadyumlar = {
  "Galatasaray": "NEF Arena",
  "Fenerbahçe": "Ülker Stadyumu",
  "Beşiktaş": "Vodafone Park",
  "Trabzonspor": "Şenol Güneş Spor Kompleksi",
  // Diğer takımlar için varsayılan stadyum
  "default": "Stadyum"
};

function MacDetay() {
  const { id } = useParams();
  const [macDetay, setMacDetay] = useState(null);

  useEffect(() => {
    // ID'den takım isimlerini al
    const [evSahibiAdi, deplasmanAdi] = id.split('-').slice(0, 2);
    
    // Gerçek bir maç detayı oluştur
    const detay = {
      evSahibi: {
        isim: evSahibiAdi,
        gol: parseInt(id.split('-')[2]) || Math.floor(Math.random() * 4),
        sutlar: Math.floor(Math.random() * 20),
        isabetliSutlar: Math.floor(Math.random() * 10),
        topaSahipOlma: Math.floor(Math.random() * 30 + 35),
        korneler: Math.floor(Math.random() * 10),
        fauller: Math.floor(Math.random() * 15)
      },
      deplasman: {
        isim: deplasmanAdi,
        gol: parseInt(id.split('-')[3]) || Math.floor(Math.random() * 4),
        sutlar: Math.floor(Math.random() * 20),
        isabetliSutlar: Math.floor(Math.random() * 10),
        topaSahipOlma: Math.floor(Math.random() * 30 + 35),
        korneler: Math.floor(Math.random() * 10),
        fauller: Math.floor(Math.random() * 15)
      },
      dakika: "90",
      stadyum: stadyumlar[evSahibiAdi] || `${evSahibiAdi} Stadyumu`,
      seyirci: Math.floor(Math.random() * 40000 + 10000)
    };

    setMacDetay(detay);
  }, [id]);

  if (!macDetay) return <div>Yükleniyor...</div>;

  return (
    <div className="mac-detay">
      <div className="mac-ozet">
        <h2>{macDetay.evSahibi.isim} {macDetay.evSahibi.gol} - {macDetay.deplasman.gol} {macDetay.deplasman.isim}</h2>
        <p>{macDetay.stadyum} | Seyirci: {macDetay.seyirci.toLocaleString()}</p>
      </div>

      <div className="istatistikler">
        <div className="istatistik-satir">
          <span>{macDetay.evSahibi.sutlar}</span>
          <span className="istatistik-baslik">Toplam Şut</span>
          <span>{macDetay.deplasman.sutlar}</span>
        </div>
        <div className="istatistik-satir">
          <span>{macDetay.evSahibi.isabetliSutlar}</span>
          <span className="istatistik-baslik">İsabetli Şut</span>
          <span>{macDetay.deplasman.isabetliSutlar}</span>
        </div>
        <div className="istatistik-satir">
          <span>{macDetay.evSahibi.topaSahipOlma}%</span>
          <span className="istatistik-baslik">Topa Sahip Olma</span>
          <span>{macDetay.deplasman.topaSahipOlma}%</span>
        </div>
        <div className="istatistik-satir">
          <span>{macDetay.evSahibi.korneler}</span>
          <span className="istatistik-baslik">Korner</span>
          <span>{macDetay.deplasman.korneler}</span>
        </div>
        <div className="istatistik-satir">
          <span>{macDetay.evSahibi.fauller}</span>
          <span className="istatistik-baslik">Faul</span>
          <span>{macDetay.deplasman.fauller}</span>
        </div>
      </div>
    </div>
  );
}

export default MacDetay; 