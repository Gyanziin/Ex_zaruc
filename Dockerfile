# Use a imagem oficial do Node como base
FROM node:14

# Crie e defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie os arquivos necessários para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do projeto para o contêiner
COPY . .

# Construa o projeto Angular
RUN npm run build

# Exponha a porta em que o aplicativo Angular será executado
EXPOSE 4200

# Comando para iniciar o servidor quando o contêiner for iniciado
CMD ["npm", "start"]
