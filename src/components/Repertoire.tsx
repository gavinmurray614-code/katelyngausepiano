import { useState, useRef, useEffect } from 'react';
import './Repertoire.css';

interface Song {
  title: string;
  audioPath?: string;
}

interface RepertoireCategory {
  category: string;
  items: Song[];
}

const repertoireData: RepertoireCategory[] = [
  {
    category: "Featured Wedding Selections",
    items: [
      { title: "Canon in D – Johann Pachelbel" },
      { title: "A Thousand Years – Christina Perri" },
      { title: "Perfect – Ed Sheeran" },
      { title: "Can’t help falling in love – Elvis Presley" },
      { title: "All of me – John Legend" },
      { title: "Any others upon request" }
    ]
  },
  {
    category: "Classical & Romantic",
    items: [
      { title: "Waltzes & Preludes – Frédéric Chopin" },
      { title: "Consolations – Franz Liszt" },
      { title: "Salut D’amour – Edward Elgar" },
      { title: "Preludes – Sergei Rachmaninoff" },
      { title: "Venetian boat song – Felix Mendelssohn" },
      { title: "Kinderszenen – Robert Schumann" },
      { title: "Works from Arietta – Grieg" },
      { title: "To a Wild Rose – Edward Macdowell" },
      { title: "Sicilienne & Berceuse – Gabriel Faure" }
    ]
  },
  {
    category: "Impressionist & Atmospheric",
    items: [
      { title: "Clair de Lune & Reverie – Claude Debussy" },
      { title: "Gymnopédies & Gnossiennes – Erik Satie" },
      { title: "Spiegel im Spiegel – Arvo Pärt" }
    ]
  },
  {
    category: "Baroque & Classical",
    items: [
      { title: "Preludes, Air BWV 1068, Brandenburg concerto no. 2 – Johann Sebastian Bach" },
      { title: "Movements from Sonata op. 10 no. 1 and Sonata op. 27 no. 2 – Ludwig Van Beethoven" },
      { title: "Selections and works from Wolfgang Amadeus Mozart and Joseph Haydn" }
    ]
  },
  {
    category: "Contemporary & Modern",
    items: [
      { title: "River Flows in You & Kiss the Rain – Yiruma" },
      { title: "Nuvole Bianche – Ludovico Einaudi" },
      { title: "Cristofori’s Dream – David Lanz" },
      { title: "Grace & Once Upon Love – William Joseph" },
      { title: "Song for Sienna – Brian Crain" },
      { title: "Comptine d’un autre été – Yann Tiersen" },
      { title: "Mariage d’Amour – Paul de Senneville" }
    ]
  },
  {
    category: "Hymns & Religious",
    items: [
      { title: "Ave Maria – Charles Gounod" },
      { title: "Amazing Grace (Traditional)" },
      { title: "Be Thou My Vision" },
      { title: "Come Thou Fount of Every Blessing" },
      { title: "How Great Thou Art" }
    ]
  }
];

const Repertoire: React.FC = () => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (audioPath: string) => {
    if (playingAudio === audioPath) {
      audioRef.current?.pause();
      setPlayingAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioPath;
        audioRef.current.play().catch(e => console.error("Audio playback error:", e));
        setPlayingAudio(audioPath);
      }
    }
  };

  useEffect(() => {
    const handleEnded = () => setPlayingAudio(null);
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', handleEnded);
    }
    return () => {
      if (audio) audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <section id="repertoire" className="repertoire">
      <div className="container">
        <h1 className="section-title centered">Repertoire</h1>
        <p className="repertoire-intro centered">
          A curated selection of pieces to set the perfect tone for your event.
        </p>
        <div className="repertoire-grid">
          {repertoireData.map((section, idx) => (
            <div key={idx} className="repertoire-category">
              <h3>{section.category}</h3>
              <ul className="song-list">
                {section.items.map((song, sIdx) => (
                  <li key={sIdx} className="song-item">
                    <span className="song-title">{song.title}</span>
                    {song.audioPath && (
                      <button 
                        className={`play-btn ${playingAudio === song.audioPath ? 'playing' : ''}`}
                        onClick={() => togglePlay(song.audioPath!)}
                        title={playingAudio === song.audioPath ? "Pause" : "Play Preview"}
                      >
                        {playingAudio === song.audioPath ? (
                          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        )}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="repertoire-footer centered">
          <p className="custom-music-note">
            <strong>Custom Music:</strong> Personalized song selections are available upon request. Katelyn is willing to learn special pieces to make your event unique.
          </p>
        </div>
      </div>
      <audio ref={audioRef} style={{ display: 'none' }} />
    </section>
  );
};

export default Repertoire;
