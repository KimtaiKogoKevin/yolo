#The image used for the backed is node alpine ~ mainly because it is light weight 
#according to the documentation it is around 5mbs
#
FROM node:alpine as builder

# The working   directory for the client app
WORKDIR /app/client


# copy the package.json from the app directory to the image 
COPY package*.json ./



#Copy the project from its client directory into the working directory declared above 
COPY . .

#remove node mosuled to optimize the size of the image
#  RUN rm -rf node_modules

#Install the dependencies after copying the json file above
RUN npm ci && npm run build



#Expose port 5000 and execute the command to start the  backend server
EXPOSE 5000



FROM node:alpine 

WORKDIR /app/client

COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/client/dist/  dist/
CMD [ "npm", "start" ]