FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY package.json package-lock.json ./

COPY --from=build /app/.next ./
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"

CMD ["npm", "run", "start"]