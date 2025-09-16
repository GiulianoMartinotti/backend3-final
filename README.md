# AdoptMe - Entrega Final (Docker + Tests + Swagger Users)

## 
- **Swagger (OpenAPI)** del módulo **Users**: `/api/docs`
- **Tests funcionales** (Mocha + Supertest) para `adoption.router.js`
- **Dockerfile** listo para construir y publicar la imagen
- Instrucciones para ejecutar con **Mongo local** o **Atlas**
- Imagen publicada en **DockerHub**:  
 [https://hub.docker.com/r/gmdocker22/adoptme](https://hub.docker.com/r/gmdocker22/adoptme)

---

## 🚀 Correr el proyecto local (sin Docker)
1. Instala dependencias:
   ```bash
   npm install

---

## 🧪 Tests funcionales (adoption.router.js)
Ejecuta:
```bash
npm test
```
- Los tests usan **Supertest** sobre el **router real**. 
- Archivo: `test/supertest.test.js`.

---

## 📜 Cómo montar Swagger en `src/app.js`
Instala dependencias:
```bash
npm i swagger-ui-express yamljs
```
Luego agrega en `src/app.js`:
```js
import { swaggerMiddleware } from './docs/swagger.js';
app.use('/api/docs', ...swaggerMiddleware);
```
La especificación está en `src/docs/users.yaml`.

---

## 🐳 Construir y publicar imagen Docker
```bash
# Build
docker build -t gmdocker22/adoptme:latest .

# Run (con conexión a Mongo)
docker run -it --rm -p 8081:8080 \
  -e MONGO_URL="mongodb://host.docker.internal:27017/adoptme" \
  <"gmdocker22">/adoptme:latest
```

### DockerHub
```bash
docker login
docker push <"gmdocker22">/adoptme:latest
```
**Enlace público a la imagen:**
> https://hub.docker.com/r/gmdocker22/adoptme

---

