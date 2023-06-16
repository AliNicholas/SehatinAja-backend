# SehatinAja API

This is a backend API using Node.js and Express. The API seamlessly integrates with Google Cloud Platform (GCP) services, Firebase services, and deploy as docker in Cloud Run

## ✍️ Documentations

- [API Documentation](https://documenter.getpostman.com/view/26415963/2s93sf4CET)

## Installation & Set Up

Clone the project

```bash
  git clone https://github.com/SehatinAja-Bangkit/SehatinAja-Backend.git
```

Go to the project directory

```bash
  cd SehatinAja
```

Install npm dependencies

```bash
  npm install
```

#### Create `.env` file

To run this project, you will need to add the following environment variables to your .env file

- `PORT`: Specify the port number on which your application will listen (default `8080`)

- `FIREBASE_API_KEY`: set your Firebase API key got in Account Settings in Firebase Console

- `FIREBASE_AUTH_DOMAIN`: set your Firebase Auth Domain got in Account Settings in Firebase Console

- `FIREBASE_PROJECT_ID`: set your Firebase or GCP Project ID

- `CS_PROJECT_ID`: set your GCP project ID

- `CS_BUCKET_NAME`: set your Cloud Storage bucket name

#### Create a folder named `credentials`

place the following service accounts in JSON format inside the folder:

- Firebase Service Account
- Google Cloud Storage Service Account

## 🏃‍♂️ Run Locally

After you install the dependencies, set the environment variables, and create service account, you can start the server by running

```bash
  npm start
```

## 🌐 Deployment

This app utilizes CI/CD pipelines using GitHub Actions to automate deployment to Cloud Run. If you want to deploy this app, you just need `Dockerfile` and push your changes into the master branch in the GitHub repository. But before doing so, you need to set the configuration as below.

#### Prerequisites

- Make sure you have correctly installed and set up the necessary configurations.
- Ensure that you have a working GitHub repository.
- Check the **Dockerfile** in the **root directory**

  ```yaml
  FROM node
  WORKDIR /app
  COPY . /app
  COPY /credentials/firebaseServiceAccount.json /app/credentials/firebaseServiceAccount.json
  COPY /credentials/cloud-storage.json /app/credentials/cloud-storage.json
  RUN npm install
  EXPOSE 8080
  CMD node src/server.js
  ```

- You can edit the **Dockerfile** based on your configurations

- Open the file `.github/workflows/build-deploy.yaml`.
- Modify the following environment variables in the file:

  ```yaml
  env:
    PROJECT_ID: `your_project_id`
    GAR_LOCATION: `your_gar_location`
    SERVICE: `your_service`
    REGION: `your_region`
    IMAGE_NAME: `your_image_name`

  ```

- Go to your prepared GitHub repository.
- Navigate to **settings** and click on **Secrets and Variables**.
- Add the following secrets and variables:

  - `CLOUD_STORAGE_KEY`: Service account key for Cloud Storage.
  - `FIREBASEAPP`: Firebase configuration.
  - `FIREBASESERVICEACCOUNT`: Firebase service account.
  - `GH_ACTIONS_KE`: Service account with the necessary roles for Cloud Run deployment
  - `MY_ENV`: Contents of your local **.env** file.

- Push your code changes to the master branch. and it will automate deploment process into Cloud Run in GCP

#### Workflows Diagram

![App Screenshot](https://storage.googleapis.com/sehatinaja-c7205/Continuous%20Deployment%20Workflows.jpg)

## Database Structure

![App Screenshot](https://storage.googleapis.com/sehatinaja-c7205/database-structure.png)

## 🤵 Author

- [Nicholas Ali](https://github.com/AliNicholas)

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/nicholas-ali-5b9020225)
