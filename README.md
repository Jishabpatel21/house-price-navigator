# House Price Navigator

A modern web application for predicting house prices using machine learning algorithms, featuring an intuitive UI built with React and TypeScript.

## Features

- 🏠 Property price prediction using machine learning
- 📊 Advanced analytics and market trends visualization
- 🗺️ Interactive map view with Google Maps integration
- 📱 Responsive design with mobile support
- 🎨 Modern UI with shadcn-ui components
- 🌙 Dark mode support
- 👤 User accounts and subscription management
- 📝 Blog section with property market insights
- 🔐 Admin panel for model training and user management

## Screenshots

### Home Page
![Home Page](Images/Frontpage.png)

### Property Price Predictor
![Property Price Predictor](Images/Property%20Price%20Predictor.png)

### Admin Dashboard
![Admin Dashboard](Images/Admin%20Dashboard.png)

## Technologies Used

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - Beautiful component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form validation
- **Recharts** - Data visualization
- **Tanstack Query** - Data fetching and caching

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
├── src/
│   ├── components/     # React components
│   │   ├── admin/     # Admin panel components
│   │   ├── features/  # Feature-specific components
│   │   ├── layout/    # Layout components
│   │   └── ui/        # shadcn-ui components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Helper utilities
│   └── data/          # Static data files
├── public/            # Static assets
└── index.html         # HTML entry point
```

## Deployment

### Build for Production

```sh
npm run build
```

The built files will be in the `dist/` directory, ready to be deployed to any static hosting service.

### Deployment Options

- **Vercel** - Connect your GitHub repository for automatic deployments
- **Netlify** - Drag and drop the `dist` folder or connect via Git
- **GitHub Pages** - Use GitHub Actions for automated deployment
- **AWS S3** - Upload the `dist` folder to an S3 bucket
- **Any static hosting service** - Upload the contents of the `dist` folder

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
