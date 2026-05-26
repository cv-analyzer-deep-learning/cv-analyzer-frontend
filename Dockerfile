# Dockerfile.dev — development container for the app
FROM node:20
WORKDIR /app

# copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# copy application source (context should be the app folder)
COPY . ./

EXPOSE 5173
ENV PORT=5173
CMD ["npm", "run", "dev", "--", "--host"]