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

# Variable de entorno para Mongo (reemplazar con tu cadena real en ejecución)
ENV MONGO_URL=mongodb://host.docker.internal:27017/adoptme


CMD [ "npm", "start" ]
