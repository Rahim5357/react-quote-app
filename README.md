# React Quote Application

This is a React-based web application for creating and viewing quotes. It features user authentication, a quote listing page, and a quote creation page.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (later)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/yourusername/react-quote-app.git
   ```

2. Navigate to the project directory:
   ```
   cd react-quote-app
   ```

3. Install the required dependencies:
   ```
   npm install
   ```

4. Install Tailwind CSS and its dependencies:
   ```
   npm install tailwindcss@latest postcss@latest autoprefixer@latest
   ```

5. Generate Tailwind configuration files:
   ```
   npx tailwindcss init -p
   ```

6. Update the `tailwind.config.js` file in the root directory with the following content:
   ```javascript
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

7. Replace the contents of `src/index.css` with:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

## Running the Application

1. Start the development server:
   ```
   npm start
   ```

2. Open your web browser and navigate to `http://localhost:3000`

The application should now be running and accessible in your web browser.

## Usage

- Login Page: Enter your username and OTP to log in.
- Quote List Page: View existing quotes and click the "+" button to create a new quote.
- Quote Creation Page: Enter the quote text and upload an image to create a new quote.

## Building for Production

To create a production build of the application, run:
```
npm run build
```

This will create a `build` directory with optimized production-ready files.

## Additional Information

For more information on React and Tailwind CSS, refer to their official documentation:
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Troubleshooting

If you encounter any issues while setting up or running the application, please check the following:

1. Ensure all dependencies are correctly installed.
2. Verify that you're using a compatible version of Node.js.
3. Clear your browser cache or try running the application in an incognito/private window.

If problems persist, please open an issue in the project repository.