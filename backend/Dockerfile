FROM node:18.7.0

# 2. Ordner im Container erstellen
WORKDIR /app

# 3. Abhängigkeiten kopieren und installieren
COPY package*.json ./
RUN npm install

# 4. Den restlichen Code kopieren
COPY . .

# 6. Server starten
CMD ["npm", "start"]