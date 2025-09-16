# Imagen base
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

COPY package*.json ./

# Dependencias
RUN npm ci || npm install


COPY . .

# Puerto de la app
EXPOSE 8080

#  Valor por defecto para la conexión a Mongo (se puede sobrescribir en `docker run -e MONGO_URL=...`)
ENV MONGO_URL=mongodb://localhost:27017/adoptme


CMD [ "npm", "start" ]
