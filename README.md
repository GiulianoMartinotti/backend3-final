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

-Realizar lo siguientes comandos por si acaso:
npm pkg set type="module"
npm pkg set scripts.start="node src/app.js"
npm pkg set scripts.dev="nodemon src/app.js"
npm pkg set scripts.test="mocha \"test/**/*.js\" --timeout 15000"

-En caso de no poder levantar el servidor probar los siguientes cambios en package.json: 
  "dev": "nodemon --experimental-specifier-resolution=node src/app.js",
  "start": "node --experimental-specifier-resolution=node src/app.js",

2. Levantar el servidor:
- npm run dev

---

## 🧪 Tests funcionales (adoption.router.js)
*Importante: npm i -D mocha supertest chai nodemon

Ejecuta:
```bash
npm test
```
*Si se corre en docker, se utiliza: TEST_BASE_URL=http://localhost:8081 npm test

- Los tests usan **Supertest** sobre el **router real**. 
- Archivo: `test/supertest.test.js`.

---

## 🧪 Tests de Mocks (/api/mocks)

Los tests cubren:
- `GET /api/mocks/mockingusers?size=N` → genera usuarios en memoria (password encriptada, role user/admin, pets=[]).
- `GET /api/mocks/mockingpets?size=N` → genera mascotas en memoria.
- `POST /api/mocks/generateData` con `{ "users": 0, "pets": 0 }` → confirma el endpoint sin requerir DB.

Ejecutar:
```bash
# API local en 8080
npm test

# Si corres en Docker en 8081
TEST_BASE_URL=http://localhost:8081 npm test



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

