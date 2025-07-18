import React, { useState } from 'react';
import { FaPhone, FaWhatsapp, FaInstagram, FaFacebook, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    product: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se manejaría el envío del formulario
    console.log('Formulario enviado:', formData);
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      product: ''
    });
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: 'Teléfono',
      info: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      info: '+1 (555) 123-4567',
      link: 'https://wa.me/15551234567'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      info: 'info@dulcesdelicias.com',
      link: 'mailto:info@dulcesdelicias.com'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Ubicación',
      info: 'Calle Principal #123, Ciudad',
      link: '#'
    },
    {
      icon: <FaClock />,
      title: 'Horarios',
      info: 'Lun-Sáb: 9:00 AM - 8:00 PM',
      link: '#'
    }
  ];

  const socialLinks = [
    {
      icon: <FaInstagram />,
      name: 'Instagram',
      url: 'https://instagram.com/dulcesdelicias',
      color: '#E4405F'
    },
    {
      icon: <FaFacebook />,
      name: 'Facebook',
      url: 'https://facebook.com/dulcesdelicias',
      color: '#1877F2'
    },
    {
      icon: <FaWhatsapp />,
      name: 'WhatsApp',
      url: 'https://wa.me/15551234567',
      color: '#25D366'
    }
  ];

  return (
    <section id="contacto" className="contact">
      <div className="container">
        <h2 className="section-title fade-in-up">Contáctanos</h2>
        <p className="section-subtitle fade-in-up">
          Estamos aquí para hacer tus sueños dulces realidad
        </p>

        <div className="contact-content">
          <div className="contact-info fade-in-up">
            <h3>Información de Contacto</h3>
            <p>
              ¿Tienes una idea especial en mente? ¡Nos encantaría escucharla! 
              Contáctanos para discutir tu pedido personalizado.
            </p>

            <div className="contact-details">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-icon">{item.icon}</div>
                  <div className="contact-text">
                    <h4>{item.title}</h4>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.info}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-section">
              <h4>Síguenos en Redes Sociales</h4>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ '--social-color': social.color }}
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form-container fade-in-up">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Envíanos un Mensaje</h3>
              
              <div className="form-group">
                <label htmlFor="name">Nombre Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="product">Producto de Interés</label>
                <select
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                >
                  <option value="">Selecciona un producto</option>
                  <option value="pastel-personalizado">Pastel Personalizado</option>
                  <option value="cupcakes">Cupcakes</option>
                  <option value="galletas">Galletas</option>
                  <option value="postres">Postres</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Cuéntanos sobre tu pedido especial..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 