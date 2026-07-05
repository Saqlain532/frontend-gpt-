
## 🚀 Architecture & Deployment

> **Note:** The live AWS EC2 environment is currently spun down to optimize cloud resource usage. The deployment architecture and automated pipeline are documented below. 

<img width="2816" height="1536" alt="Gemini_Generated_Image_bnhqavbnhqavbnhq" src="https://github.com/user-attachments/assets/0d01efad-8a94-45b4-a9f3-3e80af452d0b" />

Gromni utilizes a fully automated CI/CD pipeline to ensure seamless, reliable delivery from development to production. The infrastructure is designed with a strong focus on separation of concerns and automated provisioning.

### System Architecture
* **Frontend:** React application bundled with Vite, served statically via **Nginx** for high-performance asset delivery.
* **Backend:** Node.js/Express REST API managed by **PM2** to ensure high availability and automatic process restarts.
* **Database:** **MongoDB** handling document-based data persistence.
* **Hosting:** **AWS EC2 (Ubuntu)** instance acting as the primary application server.

### CI/CD Pipeline (GitHub Actions)
The deployment workflow is completely automated, eliminating the need for manual server configuration. Pushing code to the `main` branch triggers a GitHub Actions workflow that executes the following sequence:

1. **Environment Provisioning:** Spins up an isolated runner and securely injects environment variables (`VITE_` prefixed for the frontend) via GitHub Secrets.
2. **Build Phase:** Performs a clean dependency installation (`npm ci`) and compiles the optimized Vite production build (`npm run build`).
3. **Artifact Transfer:** Establishes a secure SSH connection to the AWS EC2 instance and synchronizes the latest build artifacts (`dist` folder).
4. **Service Reload:** Automatically restarts the PM2 backend process and Nginx services to serve the latest code with minimal downtime.

By treating infrastructure as code via GitHub Actions, the project maintains a reliable, stateless deployment process that can be easily scaled or migrated to new host environments.

[![Node.js CI](https://github.com/Saqlain532/frontend-gpt-/actions/workflows/cicd.js.yml/badge.svg)](https://github.com/Saqlain532/frontend-gpt-/actions/workflows/cicd.js.yml)

<img width="1888" height="907" alt="Screenshot 2026-07-05 081424" src="https://github.com/user-attachments/assets/7d42261b-13cf-4f1c-bcd6-abe6e17a38b7" />
