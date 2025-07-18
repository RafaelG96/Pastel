#!/bin/bash

# Script de despliegue automatizado para Amazon Linux - Dulces Delicias
# Uso: ./deploy-amazon-linux.sh

set -e

echo "🚀 Iniciando despliegue de Dulces Delicias en Amazon Linux..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json. Asegúrate de estar en el directorio del proyecto."
    exit 1
fi

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor instálalo primero."
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado. Por favor instálalo primero."
    exit 1
fi

print_status "Verificando dependencias..."

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    print_status "Instalando dependencias..."
    npm install
else
    print_status "Dependencias ya instaladas. Actualizando..."
    npm install
fi

# Limpiar build anterior
if [ -d "build" ]; then
    print_status "Limpiando build anterior..."
    rm -rf build
fi

# Construir para producción
print_status "Construyendo para producción..."
npm run build

# Verificar si la construcción fue exitosa
if [ ! -d "build" ]; then
    print_error "La construcción falló. Revisa los errores."
    exit 1
fi

print_status "✅ Construcción completada exitosamente!"

# Verificar si PM2 está instalado
if command -v pm2 &> /dev/null; then
    print_status "PM2 detectado. Configurando aplicación..."
    
    # Crear directorio de logs si no existe
    mkdir -p logs
    
    # Detener aplicación si está corriendo
    if pm2 list | grep -q "pasteleria-frontend"; then
        print_status "Deteniendo aplicación anterior..."
        pm2 stop pasteleria-frontend
        pm2 delete pasteleria-frontend
    fi
    
    # Iniciar aplicación con PM2
    print_status "Iniciando aplicación con PM2..."
    pm2 start ecosystem.config.js
    
    # Guardar configuración de PM2
    pm2 save
    
    print_status "✅ Aplicación iniciada con PM2!"
    print_status "Para ver logs: pm2 logs pasteleria-frontend"
    print_status "Para monitorear: pm2 monit"
    
else
    print_warning "PM2 no está instalado. Instalando..."
    sudo npm install -g pm2
    
    # Crear directorio de logs
    mkdir -p logs
    
    # Iniciar aplicación con PM2
    print_status "Iniciando aplicación con PM2..."
    pm2 start ecosystem.config.js
    pm2 save
    
    print_status "✅ PM2 instalado y aplicación iniciada!"
fi

# Verificar si Nginx está instalado
if command -v nginx &> /dev/null; then
    print_status "Nginx detectado. Configurando proxy reverso..."
    
    # Crear configuración de Nginx para Amazon Linux
    NGINX_CONFIG="/etc/nginx/conf.d/pasteleria.conf"
    
    if [ -f "$NGINX_CONFIG" ]; then
        print_status "Configuración de Nginx ya existe. Actualizando..."
    else
        print_status "Creando configuración de Nginx..."
    fi
    
    # Crear configuración de Nginx específica para Amazon Linux
    sudo tee "$NGINX_CONFIG" > /dev/null <<EOF
server {
    listen 80;
    server_name _;
    
    root /home/ec2-user/pasteleria-frontend/build;
    index index.html;
    
    # Configuración para React Router
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Configuración para archivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Access-Control-Allow-Origin *;
    }
    
    # Configuración para archivos de manifiesto
    location ~* \.(json|webmanifest)$ {
        expires 1d;
        add_header Cache-Control "public";
    }
    
    # Configuración de seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Configuración de compresión
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
    
    # Configuración de logs
    access_log /var/log/nginx/pasteleria_access.log;
    error_log /var/log/nginx/pasteleria_error.log;
}
EOF
    
    # Verificar configuración de Nginx
    if sudo nginx -t; then
        sudo systemctl restart nginx
        print_status "✅ Nginx configurado y reiniciado!"
    else
        print_error "Error en la configuración de Nginx"
        exit 1
    fi
else
    print_warning "Nginx no está instalado. Para instalarlo ejecuta:"
    echo "sudo yum install epel-release -y"
    echo "sudo yum install nginx -y"
    echo "sudo systemctl start nginx"
    echo "sudo systemctl enable nginx"
fi

# Mostrar información final
echo ""
print_status "🎉 ¡Despliegue completado exitosamente!"
echo ""
print_status "Información de la aplicación:"
echo "  - Puerto: 3000"
echo "  - Build: ./build"
echo "  - Logs: ./logs/"
echo ""
print_status "Comandos útiles:"
echo "  - Ver logs: pm2 logs pasteleria-frontend"
echo "  - Monitorear: pm2 monit"
echo "  - Reiniciar: pm2 restart pasteleria-frontend"
echo "  - Detener: pm2 stop pasteleria-frontend"
echo ""
print_status "La aplicación debería estar disponible en:"
echo "  - http://localhost:3000 (si usas PM2)"
echo "  - http://tu-ip-ec2 (si configuraste Nginx)"
echo "  - http://tu-dominio.com (si configuraste un dominio)"
echo ""

# Verificar si la aplicación está corriendo
if pm2 list | grep -q "pasteleria-frontend"; then
    print_status "✅ Aplicación corriendo correctamente!"
else
    print_error "❌ La aplicación no está corriendo. Revisa los logs."
fi 