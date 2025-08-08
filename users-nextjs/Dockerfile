# users-nextjs/Dockerfile
FROM node:20

# Directorio de trabajo
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código
COPY . .

# Construir y exponer puerto
EXPOSE 3000

# Comando para desarrollo (puedes cambiarlo a producción después)
CMD ["npm", "run", "dev"]
