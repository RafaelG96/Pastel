import React from 'react';
import { FaPhone, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero">
      <div className="hero-background">
        <div className="hero-pattern"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title fade-in-up">
              Dulces Delicias
            </h1>
            <p className="hero-subtitle fade-in-up">
              Donde cada bocado es una experiencia única
            </p>
            <p className="hero-description fade-in-up">
              Descubre nuestros pasteles artesanales, elaborados con ingredientes frescos 
              y mucho amor. Desde clásicos hasta creaciones únicas, cada pastel cuenta una historia.
            </p>
            
            <div className="hero-buttons fade-in-up">
              <button className="btn btn-primary" onClick={scrollToContact}>
                <FaPhone /> Hacer Pedido
              </button>
              <button className="btn btn-secondary" onClick={scrollToContact}>
                <FaWhatsapp /> Consultar
              </button>
            </div>

            <div className="hero-features fade-in-up">
              <div className="feature">
                <span className="feature-icon">🎂</span>
                <span>Pasteles Artesanales</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🌟</span>
                <span>Diseños Únicos</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💝</span>
                <span>Ingredientes Frescos</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-container float">
              <div className="hero-image-placeholder">
                <div className="cake-decoration">
                  <div className="cake-layer"></div>
                  <div className="cake-layer"></div>
                  <div className="cake-layer"></div>
                  <div className="cake-topping"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-social fade-in">
          <div className="social-links">
            <a href="https://instagram.com/dulcesdelicias" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram />
            </a>
            <a href="https://facebook.com/dulcesdelicias" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaFacebook />
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 