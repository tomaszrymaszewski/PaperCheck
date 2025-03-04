# MathCheck - AI-powered Mathematics Paper Analysis

MathCheck is a Next.js application that provides AI-powered analysis of mathematics papers. It uses modern web technologies to offer an intuitive interface for uploading, analyzing, and receiving feedback on mathematical work.

## Features

- User authentication system with login/signup functionality
- PDF file upload with drag and drop support
- AI-powered mathematics paper analysis
- Detailed feedback with strengths, weaknesses, and improvement tips
- History tracking of past submissions
- Performance insights with visualizations
- Responsive design for all screen sizes

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mathcheck.git
cd mathcheck
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Main Next.js app directory (App Router)
  - `/components` - React components
    - `AuthContext.jsx` - Authentication context provider
    - `Login.jsx` - Login/signup component
    - `MathCheck.jsx` - Main application component
  - `/utils` - Utility functions
    - `pdfProcessor.js` - PDF processing utilities
  - `page.js` - Main page component
  - `layout.js` - Root layout component
  - `globals.css` - Global CSS styles

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF parsing library

## Future Enhancements

- Integration with a real backend API for authentication
- Actual AI analysis of mathematical content using OpenAI or other AI services
- Enhanced PDF rendering and annotation capabilities
- User profile management
- Course and curriculum integration
- Collaborative feedback and teacher dashboard

## License

This project is licensed under the MIT License - see the LICENSE file for details.
