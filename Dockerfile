FROM node:18.19-alpine3.18
WORKDIR /frontend
COPY . .
RUN npm ci
EXPOSE 3000
CMD ["npm", "run", "dev"]
