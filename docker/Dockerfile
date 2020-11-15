FROM node:14 AS compiler
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY . .
ARG REACT_APP_FLAVOR
ENV REACT_APP_FLAVOR $REACT_APP_FLAVOR
ARG PUBLIC_URL
ENV PUBLIC_URL $PUBLIC_URL
RUN yarn build

FROM nginx:alpine
COPY --from=compiler /app/build /usr/share/nginx/html
EXPOSE 80
