import './Gallery.css';

const Gallery: React.FC = () => {
  const items = [
    { id: 1, title: 'Live Performance', type: 'Photo', image: '/katelyn-1.jpg' },
    { id: 2, title: 'Classical Elegance', type: 'Photo', image: '/katelyn-2.jpg' },
    { id: 3, title: 'Event Artistry', type: 'Photo', image: '/katelyn-3.jpg' },
    { id: 4, title: 'Professional Portrait', type: 'Photo', image: '/katelyn-4.jpg' },
  ];

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title centered">Performances</h2>
        <div className="gallery-grid">
          {items.map(item => (
            <div key={item.id} className="gallery-item">
              <div className="gallery-image-wrapper">
                <img src={item.image} alt={item.title} className="gallery-img" />
              </div>
              <div className="gallery-info">
                <h4>{item.title}</h4>
                <span>{item.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
