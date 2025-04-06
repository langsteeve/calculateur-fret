import { useState } from "react";
import jsPDF from "jspdf";


const ebmTarifs = [
  { secteurs: ["Faaa", "Papeete", "Pirae"], tarifs: [2500, 4500, 7000] },
  { secteurs: ["Arue", "Mahina", "Papenoo", "Punaauia", "Paea"], tarifs: [4500, 6000, 8000] },
  { secteurs: ["Tiarei", "Mahaena", "Hitiaa", "Papara", "Mataiea"], tarifs: [6000, 9000, 12000] },
  { secteurs: ["Taravao", "Faaone", "Papeari", "Toahotu"], tarifs: [8000, 12000, 17000] }
];

const fretData = {
  "APATAKI": { poidsMin: 4, N1: 240, N2: 210, R1: 410, R2: 350, P: 480, LTA: 200 },
  "ARUTUA": { poidsMin: 4, N1: 230, N2: 210, R1: 350, R2: 320, P: 420, LTA: 200 },
  "RANGIROA": { poidsMin: 4, N1: 210, N2: 190, R1: 350, R2: 310, P: 400, LTA: 200 },
  "MATAIVA": { poidsMin: 4, N1: 210, N2: 190, R1: 340, R2: 300, P: 400, LTA: 200 },
  "FAKARAVA": { poidsMin: 4, N1: 240, N2: 220, R1: 390, R2: 350, P: 430, LTA: 200 },
  "NIAU": { poidsMin: 4, N1: 240, N2: 220, R1: 370, R2: 320, P: 430, LTA: 200 },
  "KATIU": { poidsMin: 4, N1: 270, N2: 240, R1: 410, R2: 350, P: 480, LTA: 200 },
  "KAUKURA": { poidsMin: 4, N1: 210, N2: 200, R1: 350, R2: 320, P: 420, LTA: 200 },
  "TAKAPOTO": { poidsMin: 4, N1: 270, N2: 240, R1: 410, R2: 350, P: 480, LTA: 200 },
  "TAKAROA": { poidsMin: 4, N1: 280, N2: 260, R1: 430, R2: 380, P: 510, LTA: 200 },
  "TIKEHAU": { poidsMin: 4, N1: 210, N2: 190, R1: 350, R2: 310, P: 400, LTA: 200 },
  "AHE": { poidsMin: 4, N1: 270, N2: 240, R1: 410, R2: 350, P: 480, LTA: 200 },
  "ARATIKA": { poidsMin: 4, N1: 260, N2: 230, R1: 390, R2: 340, P: 450, LTA: 200 },
  "KAUEHI": { poidsMin: 4, N1: 260, N2: 230, R1: 400, R2: 350, P: 470, LTA: 200 },
  "MANIHI": { poidsMin: 4, N1: 270, N2: 240, R1: 410, R2: 350, P: 480, LTA: 200 },
  "HUAHINE": { poidsMin: 6, N1: 160, N2: 170, R1: 260, R2: 230, P: 290, LTA: 200 },
  "MOOREA": { poidsMin: 10, N1: 80, N2: 90, R1: 170, R2: 130, P: 200, LTA: 200 },
  "RAIATEA": { poidsMin: 6, N1: 170, N2: 190, R1: 290, R2: 270, P: 310, LTA: 200 },
  "BORA BORA": { poidsMin: 6, N1: 190, N2: 205, R1: 330, R2: 300, P: 440, LTA: 200 },
  "MAUPITI": { poidsMin: 6, N1: 220, N2: 210, R1: 370, R2: 330, P: 380, LTA: 200 },
  "ANAA": { poidsMin: 4, N1: 230, N2: 210, R1: 390, R2: 340, P: 450, LTA: 200 },
  "FAAITE": { poidsMin: 4, N1: 240, N2: 220, R1: 380, R2: 330, P: 440, LTA: 200 },
  "GAMBIER": { poidsMin: 4, N1: 400, N2: 370, R1: 640, R2: 560, P: 750, LTA: 200 },
  "HAO": { poidsMin: 4, N1: 330, N2: 300, R1: 490, R2: 430, P: 620, LTA: 200 },
  "HIKUERU": { poidsMin: 4, N1: 330, N2: 300, R1: 520, R2: 440, P: 670, LTA: 200 },
  "MAKEMO": { poidsMin: 4, N1: 290, N2: 270, R1: 450, R2: 400, P: 530, LTA: 200 },
  "GROUPE A": { poidsMin: 4, N1: 400, N2: 370, R1: 630, R2: 550, P: 750, LTA: 200 },
  "RAROIA": { poidsMin: 4, N1: 330, N2: 300, R1: 550, R2: 480, P: 700, LTA: 200 },
  "TUREIA": { poidsMin: 4, N1: 400, N2: 370, R1: 630, R2: 550, P: 750, LTA: 200 },
  "FAKAHINA": { poidsMin: 4, N1: 400, N2: 350, R1: 640, R2: 560, P: 830, LTA: 200 },
  "FANGATAU": { poidsMin: 4, N1: 390, N2: 350, R1: 560, R2: 490, P: 730, LTA: 200 },
  "NAPUKA": { poidsMin: 4, N1: 390, N2: 350, R1: 580, R2: 500, P: 730, LTA: 200 },
  "NUKUTAVAKE": { poidsMin: 4, N1: 400, N2: 370, R1: 630, R2: 550, P: 750, LTA: 200 },
  "PUKA PUKA": { poidsMin: 4, N1: 450, N2: 410, R1: 640, R2: 560, P: 850, LTA: 200 },
  "TAKUME": { poidsMin: 4, N1: 390, N2: 350, R1: 630, R2: 550, P: 820, LTA: 200 },
  "TUBUAI": { poidsMin: 4, N1: 290, N2: 260, R1: 440, R2: 390, P: 520, LTA: 200 },
  "RIMATARA": { poidsMin: 4, N1: 290, N2: 270, R1: 450, R2: 400, P: 530, LTA: 200 },
  "RURUTU": { poidsMin: 4, N1: 270, N2: 240, R1: 410, R2: 350, P: 480, LTA: 200 },
  "RAIVAVAE": { poidsMin: 4, N1: 310, N2: 280, R1: 490, R2: 430, P: 580, LTA: 200 },
  "NUKU HIVA": { poidsMin: 4, N1: 370, N2: 330, R1: 610, R2: 540, P: 670, LTA: 200 },
  "ATUONA": { poidsMin: 4, N1: 380, N2: 330, R1: 620, R2: 550, P: 790, LTA: 200 },
  "UA POU": { poidsMin: 4, N1: 520, N2: 470, R1: 730, R2: 590, P: 930, LTA: 200 },
  "UA HUKA": { poidsMin: 4, N1: 520, N2: 470, R1: 730, R2: 590, P: 930, LTA: 200 }
  // ... (complète avec toutes les îles comme tu les as déjà fournies)
};

const fretLabel = (code) => {
  return {
    N1: 'Fret Normal - de 40kg',
    N2: 'Fret Normal + de 40kg',
    R1: 'Fret Réservé - de 40kg',
    R2: 'Fret Réservé + de 40kg',
    P: 'Fret Prioritaire'
  }[code] || code;
};

export default function App() {
  const [typeLivraison, setTypeLivraison] = useState("fret");
  const [destination, setDestination] = useState("");
  const [volume, setVolume] = useState("");
  const [poids, setPoids] = useState("");
  const [typeFret, setTypeFret] = useState("N1");
  const [resultat, setResultat] = useState(null);

  const calculer = () => {
    let livraison = 0;
    let fret = 0;
    const ile = destination.toUpperCase();
    const vol = parseFloat(volume);
  
    if (!ile || isNaN(vol)) {
      setResultat("Destination ou volume invalide");
      return;
    }
  
    if (typeLivraison === "local") {
      const zone = ebmTarifs.find(z => z.secteurs.map(s => s.toUpperCase()).includes(ile));
      if (!zone) {
        setResultat("Secteur non reconnu pour livraison sur Tahiti");
        return;
      }
      livraison = vol < 0.25 ? zone.tarifs[0] : vol <= 1 ? zone.tarifs[1] : zone.tarifs[2];
    } else {
      livraison = vol < 0.25 ? 2500 : vol <= 1 ? 4500 : 7000;
    }
  
    if (typeLivraison === "fret") {
      const data = fretData[ile];
      if (!data) {
        setResultat("Île non reconnue pour fret");
        return;
      }
      const poidsCalc = Math.max(Number(poids), data.poidsMin);
      const tarifKg = data[typeFret];
      fret = poidsCalc * tarifKg + data.LTA;
    }
  
    setResultat({ livraison, fret, total: livraison + fret });
  };
  
  // ⬇️ FONCTION BIEN EN DEHORS DE calculer
  const formatNombre = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const exporterPDF = () => {
  if (!resultat || typeof resultat !== 'object') return;

  const doc = new jsPDF();
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(33, 33, 33); // gris foncé

  doc.setFillColor(245, 245, 245);
  doc.rect(10, 10, 190, 90, 'F'); // fond clair

  doc.setFontSize(16);
  doc.text("RÉSUMÉ DU CALCUL", 105, 20, { align: "center" });

  const yStart = 40;
  let y = yStart;
  const lignes = [
    typeLivraison === 'fret'
      ? `Fret vers ${destination} (${fretLabel(typeFret)})`
      : `Livraison locale à ${destination}`,
    `Poids     : ${poids} kg`,
    `Volume    : ${volume} m³`,
    `Fret      : ${formatNombre(resultat.fret)} F`,
    `Livraison : ${formatNombre(resultat.livraison)} F`,
    `TOTAL     : ${formatNombre(resultat.total)} F`
  ];

  doc.setFontSize(13);
  lignes.forEach(ligne => {
    doc.text(ligne, 20, y);
    y += 10;
  });

  doc.save("calcul-fret-livraison.pdf");
};

  return (
    <div style={{ backgroundColor: '#111827', color: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: 600 }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Calculateur Fret + Livraison</h1>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label>Type de livraison (via EBM Coursier) :</label>
            <select value={typeLivraison} onChange={e => setTypeLivraison(e.target.value)} style={inputStyle}>
              <option value="fret">Livraison au Fret Air Tahiti</option>
              <option value="local">Livraison sur Tahiti</option>
            </select>
          </div>
          <div>
            <label>Destination :</label>
            <input value={destination} onChange={e => setDestination(e.target.value)} list="destinations" style={inputStyle} />
            <datalist id="destinations">
              {Object.keys(fretData).map(k => <option key={k}>{k}</option>)}
              {ebmTarifs.flatMap(z => z.secteurs).map(k => <option key={k}>{k}</option>)}
            </datalist>
          </div>
          {typeLivraison === 'fret' && (
            <>
              <div>
                <label>Poids (kg) :</label>
                <input type="number" value={poids} onChange={e => setPoids(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label>Type de fret :</label>
                <select value={typeFret} onChange={e => setTypeFret(e.target.value)} style={inputStyle}>
                  <option value="N1">Fret Normal - de 40kg</option>
                  <option value="N2">Fret Normal + de 40kg</option>
                  <option value="R1">Fret Réservé - de 40kg</option>
                  <option value="R2">Fret Réservé + de 40kg</option>
                  <option value="P">Fret Prioritaire</option>
                </select>
              </div>
            </>
          )}
          <div>
            <label>Volume (m³) :</label>
<input type="number" value={volume} onChange={e => setVolume(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={calculer} style={buttonStyle}>Calculer</button>
            
          </div>
          {typeof resultat === 'string' && <p style={{ color: 'red' }}>{resultat}</p>}
          {resultat && typeof resultat === 'object' && (
  <div style={{ backgroundColor: '#374151', padding: '1rem', borderRadius: '0.75rem', marginTop: '1rem' }}>
    <img
  src="/logo.png"
  alt="Logo Magic City"
  style={{ maxWidth: '200px', display: 'block', margin: '0 auto 1.5rem auto' }}
/>

    <p><strong>Résumé :</strong> {typeLivraison === 'fret'
      ? `Livraison au fret Air Tahiti vers ${destination} en ${fretLabel(typeFret)} - Poids : ${poids} kg - Volume : ${volume} m³`
      : `Livraison sur Tahiti à ${destination} - Volume : ${volume} m³`}</p>
    <p><strong>Fret :</strong> {resultat.fret.toLocaleString()} F</p>
    <p><strong>Livraison :</strong> {resultat.livraison.toLocaleString()} F</p>
    <p style={{ fontSize: '1.4rem', fontWeight: 'bold' }}><strong>TOTAL :</strong> {resultat.total.toLocaleString()} F</p>

    <button onClick={exporterPDF} style={buttonPdf}>Exporter en PDF</button>
  </div>
)}

        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  backgroundColor: '#111827',
  color: 'white',
  border: '1px solid #374151',
  padding: '0.5rem',
  borderRadius: '6px'
};

const buttonStyle = {
  flex: 1,
  padding: '0.75rem',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '6px'
};

const buttonPdf = {
  flex: 1,
  padding: '0.75rem',
  backgroundColor: '#10b981',
  color: 'white',
  border: 'none',
  borderRadius: '6px'
};