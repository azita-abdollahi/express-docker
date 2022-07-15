FROM node:14 
# As build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
# RUN npm run start

# FROM nginx:1.21
# COPY --from=build-stage /app/build /usr/share/nginx/html
# EXPOSE 3000
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
