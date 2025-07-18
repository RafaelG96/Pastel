# 🚀 Guía de Despliegue para Amazon Linux EC2

## 📋 Diferencias con Ubuntu

| Ubuntu/Debian | Amazon Linux |
|---------------|--------------|
| `sudo apt` | `sudo yum` |
| `/etc/nginx/sites-available/` | `/etc/nginx/conf.d/` |
| Usuario: `ubuntu` | Usuario: `ec2-user` |
| `ufw` (firewall) | Security Groups + `firewall-cmd` |

## 🔧 Paso 1: Conectar a tu Instancia EC2

```bash
# Conectar a tu instancia Amazon Linux
ssh -i tu-clave.pem ec2-user@tu-ip-ec2

# Ejemplo:
ssh -i dulces-delicias.pem ec2-user@18.191.123.456
```

## 📦 Paso 2: Instalar Componentes Necesarios

### Opción A: Instalación Automática (Recomendada)

```bash
# Descargar el script de instalación para Amazon Linux
wget https://raw.githubusercontent.com/tu-usuario/pasteleria-frontend/main/install-ec2-amazon-linux.sh

# Hacer ejecutable
chmod +x install-ec2-amazon-linux.sh

# Ejecutar instalación
./install-ec2-amazon-linux.sh
```

### Opción B: Instalación Manual

```bash
# 1. Actualizar sistema
sudo yum update -y

# 2. Instalar herramientas de desarrollo
sudo yum groupinstall "Development Tools" -y
sudo yum install curl wget git -y

# 3. Instalar Node.js 18.x
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# 4. Instalar Nginx
sudo yum install epel-release -y
sudo yum install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# 5. Instalar PM2
sudo npm install -g pm2

# 6. Instalar Serve
sudo npm install -g serve

# 7. Configurar firewall (opcional, Security Groups manejan esto)
if command -v firewall-cmd &> /dev/null; then
    sudo firewall-cmd --permanent --add-service=http
    sudo firewall-cmd --permanent --add-service=https
    sudo firewall-cmd --permanent --add-service=ssh
    sudo firewall-cmd --reload
fi
```

## 📥 Paso 3: Clonar y Configurar el Proyecto

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/pasteleria-frontend.git
cd pasteleria-frontend

# Instalar dependencias
npm install

# Construir para producción
npm run build
```

## 🚀 Paso 4: Desplegar la Aplicación

### Opción A: Despliegue Automático

```bash
# Ejecutar script de despliegue para Amazon Linux
./deploy-amazon-linux.sh
```

### Opción B: Despliegue Manual

```bash
# 1. Crear directorio de logs
mkdir -p logs

# 2. Iniciar con PM2
pm2 start ecosystem.config.js

# 3. Guardar configuración de PM2
pm2 save

# 4. Configurar inicio automático
pm2 startup
# Ejecuta el comando que te muestra PM2
```

## 🌐 Paso 5: Configurar Nginx

```bash
# Copiar configuración de Nginx para Amazon Linux
sudo cp nginx-amazon-linux.conf /etc/nginx/conf.d/pasteleria.conf

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

## 🔒 Paso 6: Configurar SSL (Opcional)

```bash
# Instalar Certbot para Amazon Linux
sudo yum install certbot python3-certbot-nginx -y

# Obtener certificado SSL (reemplaza con tu dominio)
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Configurar renovación automática
sudo crontab -e
# Agregar esta línea:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## ✅ Paso 7: Verificar el Despliegue

```bash
# Verificar estado de servicios
sudo systemctl status nginx
pm2 list
pm2 logs pasteleria-frontend

# Verificar que la aplicación esté funcionando
curl http://localhost:3000
```

## 🎯 Paso 8: Configurar Security Groups en AWS

En la consola de AWS EC2, asegúrate de que tu Security Group permita:

- **SSH (puerto 22)** - Para conexión remota
- **HTTP (puerto 80)** - Para tráfico web
- **HTTPS (puerto 443)** - Para SSL (opcional)

## 📊 Monitoreo y Mantenimiento

### Comandos Útiles

```bash
# Ver logs de la aplicación
pm2 logs pasteleria-frontend

# Monitorear procesos
pm2 monit

# Reiniciar aplicación
pm2 restart pasteleria-frontend

# Ver logs de Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Verificar estado de servicios
sudo systemctl status nginx
pm2 status
```

### Actualizaciones

```bash
# Actualizar código
git pull origin main

# Reinstalar dependencias (si es necesario)
npm install

# Reconstruir aplicación
npm run build

# Reiniciar servicios
pm2 restart pasteleria-frontend
sudo systemctl restart nginx
```

## 🛠️ Solución de Problemas Específicos de Amazon Linux

### Problema: Permisos de Nginx
```bash
# Verificar permisos
sudo chown -R nginx:nginx /var/log/nginx
sudo chmod -R 755 /var/log/nginx

# Verificar que Nginx pueda acceder al directorio del proyecto
sudo chown -R ec2-user:ec2-user /home/ec2-user/pasteleria-frontend
sudo chmod -R 755 /home/ec2-user/pasteleria-frontend
```

### Problema: Node.js no se instala
```bash
# Limpiar repositorios y reinstalar
sudo yum clean all
sudo yum update -y
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

### Problema: Nginx no encuentra archivos
```bash
# Verificar ruta en configuración
sudo nano /etc/nginx/conf.d/pasteleria.conf

# Asegúrate de que la ruta sea correcta:
# root /home/ec2-user/pasteleria-frontend/build;
```

### Problema: PM2 no inicia automáticamente
```bash
# Configurar PM2 para Amazon Linux
pm2 startup
# Ejecuta el comando que te muestra, debería ser algo como:
# sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user
```

## 📱 Configuración de Variables de Entorno

```bash
# Crear archivo .env
cp env.example .env

# Editar variables
nano .env
```

## 🎉 ¡Listo!

Tu aplicación estará disponible en:
- **Sin dominio**: `http://tu-ip-ec2`
- **Con dominio**: `http://tu-dominio.com`
- **Con SSL**: `https://tu-dominio.com`

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs: `pm2 logs` y `sudo tail -f /var/log/nginx/error.log`
2. Verifica la configuración de Security Groups en AWS
3. Asegúrate de que todos los servicios estén ejecutándose
4. Verifica permisos de archivos y directorios

¡Tu pastelería ya está en línea en Amazon Linux! 🎂✨ 