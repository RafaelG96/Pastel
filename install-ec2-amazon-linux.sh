#!/bin/bash

# Script de instalación para Amazon Linux EC2 - Dulces Delicias
# Uso: ./install-ec2-amazon-linux.sh

set -e

echo "🚀 Instalando componentes necesarios para Dulces Delicias en Amazon Linux EC2..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Verificar si estamos en Amazon Linux
if ! command -v yum &> /dev/null; then
    print_error "Este script está diseñado para Amazon Linux. Si usas otra distribución, instala manualmente."
    exit 1
fi

print_step "1. Actualizando el sistema..."
sudo yum update -y
print_status "✅ Sistema actualizado"

print_step "2. Instalando herramientas de desarrollo..."
sudo yum groupinstall "Development Tools" -y

# En Amazon Linux, curl-minimal puede causar conflictos
# Intentamos instalar curl completo, si falla, usamos curl-minimal
if ! sudo yum install curl wget git -y --allowerasing 2>/dev/null; then
    print_warning "⚠️  Instalando curl-minimal en lugar de curl completo..."
    sudo yum install curl-minimal wget git -y
fi
print_status "✅ Herramientas de desarrollo instaladas"

print_step "3. Instalando Node.js 18.x..."
# Agregar repositorio de NodeSource para Amazon Linux
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verificar instalación
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
print_status "✅ Node.js instalado: $NODE_VERSION"
print_status "✅ npm instalado: $NPM_VERSION"

print_step "4. Instalando Nginx..."
# En Amazon Linux, Nginx está en el repositorio EPEL
sudo yum install epel-release -y
sudo yum install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Verificar estado de Nginx
if sudo systemctl is-active --quiet nginx; then
    print_status "✅ Nginx instalado y ejecutándose"
else
    print_error "❌ Nginx no se pudo iniciar"
    exit 1
fi

print_step "5. Instalando PM2..."
sudo npm install -g pm2

# Verificar instalación de PM2
if command -v pm2 &> /dev/null; then
    print_status "✅ PM2 instalado correctamente"
else
    print_error "❌ PM2 no se pudo instalar"
    exit 1
fi

print_step "6. Instalando Serve..."
sudo npm install -g serve

# Verificar instalación de Serve
if command -v serve &> /dev/null; then
    print_status "✅ Serve instalado correctamente"
else
    print_error "❌ Serve no se pudo instalar"
    exit 1
fi

print_step "7. Configurando firewall (Security Groups)..."
# En Amazon Linux, el firewall se maneja principalmente a través de Security Groups
# Pero configuramos el firewall local también
if command -v firewall-cmd &> /dev/null; then
    sudo firewall-cmd --permanent --add-service=http
    sudo firewall-cmd --permanent --add-service=https
    sudo firewall-cmd --permanent --add-service=ssh
    sudo firewall-cmd --reload
    print_status "✅ Firewall configurado"
else
    print_warning "⚠️  Firewall no disponible. Asegúrate de configurar Security Groups en AWS"
fi

print_step "8. Configurando PM2 para inicio automático..."
# Configurar PM2 para iniciar automáticamente
if [ "$EUID" -eq 0 ]; then
    # Si estamos ejecutando como root, configurar para ec2-user
    sudo -u ec2-user pm2 startup
    print_warning "⚠️  IMPORTANTE: Ejecuta el comando que te mostró PM2 arriba"
    print_warning "   Ejemplo: sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user"
else
    # Si estamos ejecutando como ec2-user
    pm2 startup
    print_warning "⚠️  IMPORTANTE: Ejecuta el comando que te mostró PM2 arriba"
fi

print_step "9. Creando directorio de logs..."
mkdir -p logs
print_status "✅ Directorio de logs creado"

print_step "10. Configurando permisos de Nginx..."
# En Amazon Linux, el usuario de Nginx puede ser diferente
sudo chown -R nginx:nginx /var/log/nginx
sudo chmod -R 755 /var/log/nginx

print_step "11. Verificando instalaciones..."
echo ""
print_status "📋 Resumen de instalaciones:"
echo "  - Node.js: $(node --version)"
echo "  - npm: $(npm --version)"
echo "  - Nginx: $(nginx -v 2>&1)"
echo "  - PM2: $(pm2 --version)"
echo "  - Serve: $(serve --version)"
echo "  - Git: $(git --version)"
echo ""

print_status "🎉 ¡Instalación completada exitosamente!"
echo ""
print_status "📝 Próximos pasos:"
echo "  1. Clona tu repositorio: git clone <tu-repositorio>"
echo "  2. Navega al directorio: cd pasteleria-frontend"
echo "  3. Instala dependencias: npm install"
echo "  4. Construye la aplicación: npm run build"
echo "  5. Ejecuta el script de despliegue: ./deploy-amazon-linux.sh"
echo ""
print_status "🔧 Comandos útiles:"
echo "  - Verificar estado de Nginx: sudo systemctl status nginx"
echo "  - Ver logs de Nginx: sudo tail -f /var/log/nginx/error.log"
echo "  - Reiniciar Nginx: sudo systemctl restart nginx"
echo "  - Ver procesos de PM2: pm2 list"
echo "  - Ver logs de PM2: pm2 logs"
echo ""
print_status "🌐 Tu aplicación estará disponible en:"
echo "  - http://tu-ip-ec2 (después del despliegue)"
echo "  - http://tu-dominio.com (si configuras un dominio)"
echo ""

# Verificar que todos los servicios estén funcionando
print_step "12. Verificación final de servicios..."
if sudo systemctl is-active --quiet nginx; then
    print_status "✅ Nginx está ejecutándose"
else
    print_warning "⚠️  Nginx no está ejecutándose"
fi

if command -v node &> /dev/null && command -v npm &> /dev/null; then
    print_status "✅ Node.js y npm están disponibles"
else
    print_error "❌ Node.js o npm no están disponibles"
fi

if command -v pm2 &> /dev/null; then
    print_status "✅ PM2 está disponible"
else
    print_error "❌ PM2 no está disponible"
fi

echo ""
print_status "🎯 ¡Todo listo para desplegar tu aplicación en Amazon Linux!" 