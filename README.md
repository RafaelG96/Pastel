# 🎂 Pastelería Frontend

Sitio web de pastelería desarrollado con React.

## 🚀 Despliegue en GitHub Pages

### Pasos para subir a GitHub Pages:

1. **Crear un repositorio en GitHub:**
   - Ve a [GitHub](https://github.com) y crea un nuevo repositorio
   - Dale un nombre como `pasteleria` o `pasteleria-frontend`

2. **Configurar el repositorio local:**
   ```bash
   git init
   git add .
   git commit -m "Primer commit"
   git branch -M main
   git remote add origin https://github.com/[TU-USUARIO]/[NOMBRE-DEL-REPO].git
   git push -u origin main
   ```

3. **Actualizar la URL en package.json:**
   - Cambia `[TU-USUARIO]` por tu nombre de usuario de GitHub
   - Cambia `[NOMBRE-DEL-REPO]` por el nombre de tu repositorio
   - Ejemplo: `"homepage": "https://rafael.github.io/pasteleria"`

4. **Desplegar a GitHub Pages:**
   ```bash
   npm run deploy
   ```

5. **Configurar GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: selecciona "Deploy from a branch"
   - Branch: selecciona `gh-pages` y `/ (root)`
   - Click "Save"

### 📝 Comandos útiles:

- `npm start` - Ejecutar en desarrollo
- `npm run build` - Construir para producción
- `npm run deploy` - Desplegar a GitHub Pages

## 🛠️ Tecnologías utilizadas:

- React 18
- CSS3
- React Icons
- GitHub Pages

## 📱 Características:

- Diseño responsivo
- Componentes reutilizables
- Navegación entre páginas
- Secciones: Inicio, Productos, Sobre Nosotros, Contacto

---

**Nota:** Asegúrate de reemplazar `[TU-USUARIO]` y `[NOMBRE-DEL-REPO]` en el `package.json` antes de hacer el deploy. 