import React from 'react';
import { FaHeart, FaStar, FaUsers, FaAward } from 'react-icons/fa';
import './About.css';

const About = () => {
  const stats = [
    { icon: <FaHeart />, number: "500+", label: "Clientes Felices" },
    { icon: <FaStar />, number: "4.9", label: "Calificación" },
    { icon: <FaUsers />, number: "3", label: "Años de Experiencia" },
    { icon: <FaAward />, number: "100+", label: "Pasteles Únicos" }
  ];

  return (
    <section id="nosotros" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title fade-in-up">Nuestra Historia</h2>
            <p className="about-description fade-in-up">
              En Dulces Delicias, cada pastel es una obra de arte creada con pasión y dedicación. 
              Nuestro viaje comenzó hace 3 años con un simple sueño: hacer que cada celebración 
              sea más dulce y memorable.
            </p>
            
            <div className="about-features fade-in-up">
              <div className="feature-item">
                <div className="feature-icon">🎨</div>
                <div className="feature-content">
                  <h3>Diseños Personalizados</h3>
                  <p>Creamos pasteles únicos que reflejan tu personalidad y celebran tus momentos especiales.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🌱</div>
                <div className="feature-content">
                  <h3>Ingredientes Frescos</h3>
                  <p>Utilizamos solo los mejores ingredientes frescos y naturales para garantizar el mejor sabor.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">💝</div>
                <div className="feature-content">
                  <h3>Hecho con Amor</h3>
                  <p>Cada pastel es elaborado artesanalmente con mucho cariño y atención a los detalles.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className="about-image-container fade-in-up">
              <div className="about-image-placeholder">
                <div className="cake-showcase">
                  <div className="cake-slice"></div>
                  <div className="cake-slice"></div>
                  <div className="cake-slice"></div>
                </div>
              </div>
              <div className="floating-elements">
                <div className="floating-element">🍰</div>
                <div className="floating-element">🎂</div>
                <div className="floating-element">🧁</div>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-section fade-in-up">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 