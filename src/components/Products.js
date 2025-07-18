import React, { useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('todos');

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'pasteles', name: 'Pasteles' },
    { id: 'cupcakes', name: 'Cupcakes' },
    { id: 'galletas', name: 'Galletas' },
    { id: 'postres', name: 'Postres' }
  ];

  const products = [
    {
      id: 1,
      name: 'Pastel de Chocolate',
      category: 'pasteles',
      description: 'Delicioso pastel de chocolate con relleno de ganache y decoraciones personalizadas',
      rating: 4.9,
      image: '🍫',
      popular: true
    },
    {
      id: 2,
      name: 'Cupcakes de Vainilla',
      category: 'cupcakes',
      description: 'Cupcakes esponjosos con frosting de vainilla y toppings variados',
      rating: 4.8,
      image: '🧁'
    },
    {
      id: 3,
      name: 'Galletas de Mantequilla',
      category: 'galletas',
      description: 'Galletas caseras con chispas de chocolate, perfectas para regalar',
      rating: 4.7,
      image: '🍪'
    },
    {
      id: 4,
      name: 'Pastel de Frutas',
      category: 'pasteles',
      description: 'Pastel fresco con frutas de temporada y crema chantilly',
      rating: 4.9,
      image: '🍓',
      popular: true
    },
    {
      id: 5,
      name: 'Tiramisú',
      category: 'postres',
      description: 'Clásico postre italiano con café y mascarpone, servido en porciones individuales',
      rating: 4.8,
      image: '☕'
    },
    {
      id: 6,
      name: 'Cupcakes de Red Velvet',
      category: 'cupcakes',
      description: 'Cupcakes rojos con frosting de queso crema y decoraciones elegantes',
      rating: 4.9,
      image: '🎂'
    }
  ];

  const filteredProducts = activeCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section id="productos" className="products">
      <div className="container">
        <h2 className="section-title fade-in-up">Nuestros Productos</h2>
        <p className="section-subtitle fade-in-up">
          Descubre nuestra selección de dulces artesanales
        </p>

        <div className="categories fade-in-up">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {product.popular && (
                <div className="popular-badge">Más Popular</div>
              )}
              
              <div className="product-image">
                <span className="product-emoji">{product.image}</span>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < Math.floor(product.rating) ? 'star filled' : 'star'} 
                      />
                    ))}
                  </div>
                  <span className="rating-text">{product.rating}</span>
                </div>
                
                <div className="product-footer">
                  <button className="btn btn-primary" onClick={scrollToContact}>
                    Consultar Precio
                  </button>
                  <button className="favorite-btn">
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="products-cta fade-in-up">
          <p>¿Te interesa algún producto o quieres algo personalizado?</p>
          <p className="cta-subtitle">¡Contáctanos para consultar precios y hacer tu pedido!</p>
          <button className="btn btn-primary" onClick={scrollToContact}>
            Contactar para Consultar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products; 