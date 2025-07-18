# Dulces Delicias - Frontend

Una página web moderna y responsiva para una pastelería artesanal, construida con React.

## 🎂 Características

- **Diseño Responsivo**: Se adapta perfectamente a todos los dispositivos
- **Navegación Suave**: Scroll suave entre secciones
- **Formulario de Contacto**: Para pedidos y consultas
- **Galería de Productos**: Con filtros por categorías
- **Enlaces a Redes Sociales**: Instagram, Facebook y WhatsApp
- **Información de Contacto**: Teléfono, email y ubicación
- **Animaciones**: Efectos visuales atractivos
- **Optimizado para SEO**: Meta tags y estructura semántica

## 🚀 Instalación

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd pasteleria-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm start
   ```

4. **Construir para producción**
   ```bash
   npm run build
   ```

## 📱 Secciones de la Página

### 1. Header
- Logo y navegación
- Menú hamburguesa para móviles
- Navegación fija con efecto de scroll

### 2. Hero
- Título principal atractivo
- Botones de llamada a la acción
- Enlaces a redes sociales
- Diseño visual con gradientes

### 3. Nosotros
- Historia de la pastelería
- Características principales
- Estadísticas de la empresa
- Elementos visuales animados

### 4. Productos
- Galería de productos con filtros
- Categorías: Pasteles, Cupcakes, Galletas, Postres
- Calificaciones y precios
- Botón para pedidos personalizados

### 5. Contacto
- Información de contacto completa
- Formulario de contacto funcional
- Enlaces a redes sociales
- Horarios y ubicación

### 6. Footer
- Información adicional
- Enlaces rápidos
- Botón para volver arriba
- Copyright y créditos

## 🎨 Personalización

### Colores
Los colores se pueden modificar en `src/index.css` en las variables CSS:

```css
:root {
  --primary-color: #FF6B9D;
  --secondary-color: #FFB6C1;
  --accent-color: #FFD700;
  --text-dark: #2C1810;
  --text-light: #6B4423;
  --background-light: #FFF8F0;
  --background-white: #FFFFFF;
}
```

### Información de Contacto
Modificar en `src/components/Contact.js`:
- Números de teléfono
- Email
- Dirección
- Enlaces a redes sociales

### Productos
Editar en `src/components/Products.js`:
- Lista de productos
- Precios
- Descripciones
- Categorías

## 🌐 Despliegue en AWS EC2

### Opción 1: Despliegue con Nginx

1. **Preparar la instancia EC2**
   ```bash
   # Conectar a tu instancia EC2
   ssh -i tu-key.pem ubuntu@tu-ip-ec2
   
   # Actualizar el sistema
   sudo apt update && sudo apt upgrade -y
   
   # Instalar Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Instalar Nginx
   sudo apt install nginx -y
   ```

2. **Clonar y construir el proyecto**
   ```bash
   # Clonar el repositorio
   git clone <url-del-repositorio>
   cd pasteleria-frontend
   
   # Instalar dependencias
   npm install
   
   # Construir para producción
   npm run build
   ```

3. **Configurar Nginx**
   ```bash
   # Crear configuración de Nginx
   sudo nano /etc/nginx/sites-available/pasteleria
   ```

   Agregar esta configuración:
   ```nginx
   server {
       listen 80;
       server_name tu-dominio.com www.tu-dominio.com;
       
       root /home/ubuntu/pasteleria-frontend/build;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Configuración para archivos estáticos
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

4. **Activar el sitio**
   ```bash
   # Crear enlace simbólico
   sudo ln -s /etc/nginx/sites-available/pasteleria /etc/nginx/sites-enabled/
   
   # Verificar configuración
   sudo nginx -t
   
   # Reiniciar Nginx
   sudo systemctl restart nginx
   ```

### Opción 2: Despliegue con PM2

1. **Instalar PM2**
   ```bash
   sudo npm install -g pm2
   ```

2. **Configurar PM2**
   ```bash
   # Crear archivo ecosystem.config.js
   nano ecosystem.config.js
   ```

   ```javascript
   module.exports = {
     apps: [{
       name: 'pasteleria-frontend',
       script: 'serve',
       args: '-s build -l 3000',
       env: {
         NODE_ENV: 'production'
       }
     }]
   };
   ```

3. **Instalar serve y ejecutar**
   ```bash
   npm install -g serve
   pm2 start ecosystem.config.js
   pm2 startup
   pm2 save
   ```

## 🔧 Configuración Adicional

### Dominio Personalizado
1. Configurar DNS para apuntar a tu instancia EC2
2. Actualizar configuración de Nginx con tu dominio
3. Configurar SSL con Let's Encrypt

### SSL/HTTPS
```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado SSL
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
```

### Variables de Entorno
Crear archivo `.env` para configuraciones:
```env
REACT_APP_API_URL=https://tu-api.com
REACT_APP_CONTACT_EMAIL=info@dulcesdelicias.com
REACT_APP_PHONE_NUMBER=+15551234567
```

## 📊 Monitoreo y Mantenimiento

### Logs
```bash
# Logs de Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Logs de PM2
pm2 logs
```

### Actualizaciones
```bash
# Actualizar código
git pull origin main
npm install
npm run build

# Reiniciar servicios
sudo systemctl restart nginx
pm2 restart all
```

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework principal
- **CSS3**: Estilos con variables CSS y Grid/Flexbox
- **React Icons**: Iconografía
- **Google Fonts**: Tipografías (Dancing Script, Poppins)
- **Responsive Design**: Mobile-first approach

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto:
- Email: info@dulcesdelicias.com
- Teléfono: +1 (555) 123-4567

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles. 