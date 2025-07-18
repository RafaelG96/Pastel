import React from 'react';
import { FaHeart, FaInstagram, FaFacebook, FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Dulces Delicias</h3>
            <p>
              Haciendo que cada celebración sea más dulce desde 2021. 
              Nuestros pasteles artesanales están hechos con amor y los mejores ingredientes.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com/dulcesdelicias" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://facebook.com/dulcesdelicias" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Productos</h4>
            <ul>
              <li><a href="#productos">Pasteles Personalizados</a></li>
              <li><a href="#productos">Cupcakes</a></li>
              <li><a href="#productos">Galletas</a></li>
              <li><a href="#productos">Postres Especiales</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Servicios</h4>
            <ul>
              <li><a href="#contacto">Pedidos Personalizados</a></li>
              <li><a href="#contacto">Entrega a Domicilio</a></li>
              <li><a href="#contacto">Eventos Especiales</a></li>
              <li><a href="#contacto">Consultas</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <ul>
              <li>📞 +1 (555) 123-4567</li>
              <li>📧 info@dulcesdelicias.com</li>
              <li>📍 Calle Principal #123, Ciudad</li>
              <li>🕒 Lun-Sáb: 9:00 AM - 8:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              © {currentYear} Dulces Delicias. Todos los derechos reservados. 
              Hecho con <FaHeart className="heart-icon" /> en México.
            </p>
            <button className="scroll-to-top" onClick={scrollToTop}>
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 