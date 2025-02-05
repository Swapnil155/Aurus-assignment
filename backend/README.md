# **TypeScript Backend Template**

This backend template follows the principles of CLEAN Architecture to ensure:

- **Separation of Concerns:** Layers are organized to separate business logic, application logic, and infrastructure concerns.
- **Scalability:** Modular and well-organized codebase makes it easy to extend functionality.
- **Testability:** Well-defined boundaries between layers simplify unit and integration testing.
- **Maintainability:** Consistent structure and adherence to SOLID principles reduce technical debt over time.

### **Structure Overview**
- **Core Domain:** Contains the business rules and logic.
- **Use Cases:** Implements application-specific rules and orchestrates the flow of data.
- **Infrastructure:** Deals with external systems (e.g., database, APIs).
- **Presentation:** Manages HTTP communication and routes.

Refer to the documentation for details on how to structure and organize your code.

---

## **Table of Contents**
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [License](#license)

---

## **Installation**

### **Prerequisites**
- [Node.js](https://nodejs.org/) (version 14 or higher recommended)  
- [npm](https://www.npmjs.com/) (bundled with Node.js)  

### **Steps**
1. Fork the repository to your GitHub or GitLab account.  
2. Clone your forked repository:  
	```bash
	git clone https://<your-git-account>/TypeScript-Backend.git
	```
3. Navigate to the project directory:  
	```bash
	cd TypeScript-Backend
	```
4. Install dependencies:  
	```bash
	npm install
	```

---

## **Usage**

### **Development Mode**
1. Start the development server:  
	```bash
	npm run dev
	```
2. Open your browser and navigate to:  
	```
	http://localhost:3000
	```

### **Production Mode**
1. Install [PM2](https://pm2.keymetrics.io/) globally for process management:  
	```bash
	npm install pm2 -g
	```
2. Start the production server:  
	```bash
	npm start
	```

---

## **Environment Variables**

Create a `.env` file in the root directory based on the structure of [`.env.example`](.env.example).

---

## **Scripts**

| Script             | Description                                                 |
|---------------------|-------------------------------------------------------------|
| `npm start`         | Starts the app in production mode using PM2.                |
| `npm run dev`       | Starts the app in development mode with `nodemon`.          |
| `npm run lint`      | Runs ESLint to check for code quality issues.               |
| `npm run lint:fix`  | Fixes fixable issues detected by ESLint.                    |
| `npm run prettier`  | Checks code formatting using Prettier.                      |
| `npm run prettier:fix` | Formats code files according to Prettier rules.          |
| `npm run prepare`   | Prepares Husky for managing Git hooks.                      |

---

## **License**

This project is licensed under the [MIT License](LICENSE).

