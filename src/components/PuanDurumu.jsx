import { useState, useEffect } from 'react';
import './PuanDurumu.css';

const takimlar = [
  "Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor",
  "Başakşehir", "Adana Demirspor", "Antalyaspor", "Konyaspor",
  "Alanyaspor", "Kayserispor", "Gaziantep FK", "Sivasspor",
  "Kasımpaşa", "Giresunspor", "Hatayspor", "İstanbulspor",
  "Ankaragücü", "Pendikspor"
];

function PuanDurumu() {
  const [puanTablosu, setPuanTablosu] = useState([]);

  useEffect(() => {
    // Takımların başlangıç istatistiklerini oluştur
    const baslangicTablosu = takimlar.map(takim => ({
      takim,
      oynadigiMac: 0,
      galibiyet: 0,
      beraberlik: 0,
      maglubiyet: 0,
      attigiGol: 0,
      yedigiGol: 0,
      averaj: 0,
      puan: 0
    }));

    setPuanTablosu(baslangicTablosu);
  }, []);

  useEffect(() => {
    // Maç sonuçlarını dinle
    const puanGuncelle = (event) => {
      const { evSahibi, deplasman } = event.detail;

      setPuanTablosu(oncekiTablo => {
        const yeniTablo = [...oncekiTablo];

        // Ev sahibi takımın istatistiklerini güncelle
        const evSahibiIndex = yeniTablo.findIndex(t => t.takim === evSahibi.takim);
        if (evSahibiIndex !== -1) {
          const evSahibiTakim = yeniTablo[evSahibiIndex];
          yeniTablo[evSahibiIndex] = {
            ...evSahibiTakim,
            oynadigiMac: evSahibiTakim.oynadigiMac + 1,
            galibiyet: evSahibiTakim.galibiyet + evSahibi.galibiyet,
            beraberlik: evSahibiTakim.beraberlik + evSahibi.beraberlik,
            maglubiyet: evSahibiTakim.maglubiyet + evSahibi.maglubiyet,
            attigiGol: evSahibiTakim.attigiGol + evSahibi.gol,
            yedigiGol: evSahibiTakim.yedigiGol + evSahibi.yedigiGol,
            averaj: evSahibiTakim.attigiGol + evSahibi.gol - (evSahibiTakim.yedigiGol + evSahibi.yedigiGol),
            puan: evSahibiTakim.puan + evSahibi.puan
          };
        }

        // Deplasman takımının istatistiklerini güncelle
        const deplasmanIndex = yeniTablo.findIndex(t => t.takim === deplasman.takim);
        if (deplasmanIndex !== -1) {
          const deplasmanTakim = yeniTablo[deplasmanIndex];
          yeniTablo[deplasmanIndex] = {
            ...deplasmanTakim,
            oynadigiMac: deplasmanTakim.oynadigiMac + 1,
            galibiyet: deplasmanTakim.galibiyet + deplasman.galibiyet,
            beraberlik: deplasmanTakim.beraberlik + deplasman.beraberlik,
            maglubiyet: deplasmanTakim.maglubiyet + deplasman.maglubiyet,
            attigiGol: deplasmanTakim.attigiGol + deplasman.gol,
            yedigiGol: deplasmanTakim.yedigiGol + deplasman.yedigiGol,
            averaj: deplasmanTakim.attigiGol + deplasman.gol - (deplasmanTakim.yedigiGol + deplasman.yedigiGol),
            puan: deplasmanTakim.puan + deplasman.puan
          };
        }

        return yeniTablo;
      });
    };

    window.addEventListener('puanGuncelle', puanGuncelle);
    return () => window.removeEventListener('puanGuncelle', puanGuncelle);
  }, []);

  return (
    <div className="puan-durumu">
      <h2>Puan Durumu</h2>
      <table>
        <thead>
          <tr>
            <th>Sıra</th>
            <th>Takım</th>
            <th>O</th>
            <th>G</th>
            <th>B</th>
            <th>M</th>
            <th>AG</th>
            <th>YG</th>
            <th>AV</th>
            <th>P</th>
          </tr>
        </thead>
        <tbody>
          {puanTablosu
            .sort((a, b) => b.puan - a.puan || b.averaj - a.averaj)
            .map((takim, index) => (
              <tr key={takim.takim}>
                <td>{index + 1}</td>
                <td>{takim.takim}</td>
                <td>{takim.oynadigiMac}</td>
                <td>{takim.galibiyet}</td>
                <td>{takim.beraberlik}</td>
                <td>{takim.maglubiyet}</td>
                <td>{takim.attigiGol}</td>
                <td>{takim.yedigiGol}</td>
                <td>{takim.averaj}</td>
                <td>{takim.puan}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default PuanDurumu; 