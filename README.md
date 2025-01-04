# Car Shop Application 🚗🛠️

**Car Shop** is a simple yet powerful web application designed to streamline the process of managing car parts and orders. Whether you're a car enthusiast, a parts shop owner, or just someone who loves clean and efficient interfaces, this application has got you covered!

## Key Features ✨

1. **Categories Management**  
   Easily add, edit, or delete categories and parts. Assign parts to specific categories to keep everything organized.  

2. **Creator Workflow**  
   A step-by-step ordering process that guides users through selecting parts from different categories. At the end, finalize your order by providing customer details (name, email) for processing.  

3. **Order History**  
   Review detailed order histories, including:  
   - A breakdown of ordered parts  
   - Total order value  
   - Customer information (name and email)  

## Why Choose Car Shop? 🤔

- **User-Friendly Interface**: Navigate effortlessly with a sleek, modern design and clear functionality.  
- **Streamlined Process**: From selecting parts to managing orders, everything is designed to save time and minimize effort.  
- **Customizable & Scalable**: Built using React and TypeScript with `@tanstack/react-router` and styled-components, the app can be extended to suit your needs.

# Table of content
- Demo
- Technologies

# Demo
Here is a demonstration how it works:
- Desktop: TO-CHANGE

To run the application, follow these steps:

1. Clone the repository:
    ```bash
    git clone = https://github.com/Paveu99/CarShop.git
    cd car-shop
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application in development mode:
    ```bash
    npm run dev
    ```

4. Start json-server:
    ```bash
    npx json-server .\src\utils\car-shop-data.json
    ```

# Tech stack
Front end side was created using:
- "@mui/material": "^6.2.1",
- "json-server": "^1.0.0-beta.3",
- "react": "^18.3.1",
- "react-dom": "^18.3.1",
- "react-hook-form": "^7.54.2",
- "zustand": "^5.0.2"
- "globals": "^15.12.0",
- "husky": "^8.0.0",
- "lint-staged": "^15.2.11",
- "prettier": "^3.4.2",
- "sass-embedded": "^1.83.0",
- "typescript": "~5.6.2",
- "vite": "^6.0.1"
