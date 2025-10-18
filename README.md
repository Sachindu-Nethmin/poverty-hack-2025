# Hope4Ever - Sri Lanka's Public Health Support Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff.svg)

A modern, responsive web platform dedicated to supporting critical hospital equipment needs across Sri Lankan hospitals. Built with React, TypeScript, and Tailwind CSS, this platform connects donors with verified medical equipment requests from hospitals.

## 🌟 Features

### Core Functionality
- **Equipment Donation System**: Browse and donate to critical hospital equipment needs
- **Payment Integration**: Dedicated payment pages for each equipment with detailed information
- **Multi-Page Routing**: Seamless navigation between home and payment pages
- **Responsive Design**: Fully mobile-responsive layout optimized for all devices
- **Lazy Loading**: Optimized performance with code-splitting and image lazy loading

### User Experience
- **Smooth Scrolling**: Native smooth scroll with section-based navigation
- **3D Animated Statistics**: Eye-catching 3D rotation effects on stats cards
- **Auto-Scrolling Partners**: Infinite horizontal slider showcasing partner organizations
- **Healthcare Blog**: Curated articles on hospital innovation and patient care
- **Interactive Cards**: Hover effects and animations throughout the interface

### Technical Features
- **Component-Based Architecture**: Modular, reusable React components
- **TypeScript**: Full type safety throughout the application
- **React Router**: Client-side routing with dynamic parameters
- **Centralized Data Management**: Shared equipment data source
- **Performance Optimized**: Lazy loading, code splitting, and image optimization

## 📦 Installed Packages

### Dependencies
```json
{
  "@tailwindcss/vite": "^4.1.14",          // Tailwind CSS Vite plugin
  "class-variance-authority": "^0.7.1",    // CVA for component variants
  "clsx": "^2.1.1",                        // Utility for constructing className strings
  "lucide-react": "^0.546.0",              // Beautiful icon library
  "react": "^19.1.1",                      // React library
  "react-dom": "^19.1.1",                  // React DOM renderer
  "react-router-dom": "^7.9.4",            // Routing library
  "tailwind-merge": "^3.3.1",              // Merge Tailwind classes intelligently
  "tailwindcss": "^4.1.14"                 // Utility-first CSS framework
}
```

### Dev Dependencies
```json
{
  "@eslint/js": "^9.36.0",                 // ESLint JavaScript config
  "@types/node": "^24.8.1",                // Node.js type definitions
  "@types/react": "^19.1.16",              // React type definitions
  "@types/react-dom": "^19.1.9",           // React DOM type definitions
  "@vitejs/plugin-react": "^5.0.4",        // Vite plugin for React
  "eslint": "^9.36.0",                     // Code linting tool
  "eslint-plugin-react-hooks": "^5.2.0",   // ESLint rules for React Hooks
  "eslint-plugin-react-refresh": "^0.4.22", // ESLint for React Fast Refresh
  "globals": "^16.4.0",                    // Global identifiers
  "tw-animate-css": "^1.4.0",              // Tailwind CSS animations
  "typescript": "~5.9.3",                  // TypeScript compiler
  "typescript-eslint": "^8.45.0",          // ESLint TypeScript parser
  "vite": "^7.1.7"                         // Build tool and dev server
}
```

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sachindu-Nethmin/poverty-hack-2025.git
   cd poverty-hack-2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📜 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module replacement (HMR) on `http://localhost:5173`

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder
- TypeScript type checking
- Vite build optimization
- Asset minification and bundling

### Preview
```bash
npm run preview
```
Preview the production build locally before deployment

### Lint
```bash
npm run lint
```
Run ESLint to check code quality and catch potential errors

## 📁 Project Structure

```
poverty-hack-2025/
├── public/                          # Static assets
├── src/
│   ├── assets/                      # Images and media files
│   │   ├── logo .png               # Application logo
│   │   ├── hero.png                # Hero section image
│   │   ├── machine.png             # NICU equipment image
│   │   ├── machine2.png            # Lab equipment image
│   │   ├── hospital_donation.png   # Featured campaign image
│   │   ├── CT1.jpg                 # CT Scanner image
│   │   ├── X-ray.jpg               # X-ray machine image
│   │   ├── BP.jpg                  # Blood pressure monitor
│   │   ├── Glucometer.jpg          # Glucometer image
│   │   ├── thermo.jpg              # Thermometer image
│   │   ├── Ultrasound Scanner1.jpg # Ultrasound equipment
│   │   ├── unicef.png              # Partner logo
│   │   ├── drdone.png              # Partner logo
│   │   ├── careplus.png            # Partner logo
│   │   ├── medrelay.png            # Partner logo
│   │   ├── aidnetwork.png          # Partner logo
│   │   ├── sricare.png             # Partner logo
│   │   ├── Hospital Innovation.png
│   │   ├── Hospital Architecture.png
│   │   ├── Hospital Technology.png
│   │   └── Patient Care Improvement.png
│   │
│   ├── components/                  # React components
│   │   ├── App.tsx                 # Main app component with routing
│   │   ├── Header.tsx              # Navigation header
│   │   ├── Hero.tsx                # Hero section
│   │   ├── Stats.tsx               # Animated statistics
│   │   ├── Partners.tsx            # Partner logos slider
│   │   ├── FeaturedCampaign.tsx    # Featured donation campaign
│   │   ├── HowToStart.tsx          # How it works section
│   │   ├── DonationGrid.tsx        # Equipment donation cards
│   │   ├── FAQ.tsx                 # Frequently asked questions
│   │   ├── BlogList.tsx            # Healthcare articles
│   │   ├── Newsletter.tsx          # Newsletter signup
│   │   ├── Footer.tsx              # Footer with links
│   │   ├── PaymentPage.tsx         # Dynamic payment page
│   │   ├── Payment.tsx             # Payment form component
│   │   └── LazyImage.tsx           # Lazy loading image component
│   │
│   ├── data/
│   │   └── equipmentData.ts        # Equipment data and utilities
│   │
│   ├── lib/
│   │   └── utils.ts                # Utility functions
│   │
│   ├── App.css                      # App-specific styles
│   ├── index.css                    # Global styles and Tailwind
│   └── main.tsx                     # Application entry point
│
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.app.json                # App TypeScript config
├── tsconfig.node.json               # Node TypeScript config
├── vite.config.ts                   # Vite configuration
├── eslint.config.js                 # ESLint configuration
├── components.json                  # UI components config
├── LAZY_LOADING_IMPLEMENTATION.md   # Performance docs
└── README.md                        # This file
```

## 🎨 Key Components

### Navigation Components
- **Header**: Logo, navigation menu, donate button with smart routing
- **Footer**: Links, social media, copyright information

### Content Components
- **Hero**: Main landing section with featured campaigns
- **Stats**: Animated statistics (145+ funded, 1200+ donors, 54+ hospitals)
- **Partners**: Auto-scrolling partner logos
- **FeaturedCampaign**: Highlighted donation opportunity
- **DonationGrid**: Grid of equipment donation cards
- **BlogList**: Healthcare articles and insights

### Functional Components
- **PaymentPage**: Dynamic payment page with equipment details
- **Payment**: Payment form and donation processing
- **LazyImage**: Performance-optimized image component

## 🔧 Data Management

### Equipment Data Structure
```typescript
export type Equipment = {
  id: string;                    // Unique identifier
  title: string;                 // Equipment name
  img: string;                   // Image URL
  raised: number;                // Amount raised (LKR)
  goal: number;                  // Target amount (LKR)
  desc: string;                  // Short description
  hospital: string;              // Hospital name
  category: string;              // Equipment category
  urgency: 'critical' | 'high' | 'medium';
  beneficiaries: number;         // Number of patients served
  detailedDesc: string;          // Full description
};
```

### Utility Functions
- `formatCurrency(amount)`: Format numbers as LKR currency
- `calculateProgress(raised, goal)`: Calculate donation progress percentage
- `getEquipmentById(id)`: Retrieve equipment data by ID

## 🎯 Routing System

### Routes
```typescript
/ (Home Page)
├── #home           → Hero section
├── #donations      → Equipment grid
├── #how            → How it works
├── #faq            → FAQ section
└── #newsletter     → Newsletter signup

/payment/:equipmentId (Payment Page)
├── CT Scanner      → /payment/ct-scanner
├── X-Ray Machine   → /payment/xray-machine
├── Blood Pressure  → /payment/blood-pressure
├── Glucometer      → /payment/glucometer
├── Thermometer     → /payment/thermometer
└── Ultrasound      → /payment/ultrasound-scanner
```

### Smart Navigation
- **Same-page navigation**: Smooth scroll to sections
- **Cross-page navigation**: Navigate to home, then scroll to section
- **Payment routing**: Dynamic routes based on equipment ID

## 🚀 Performance Optimizations

### Lazy Loading Implementation
- **Code Splitting**: React.lazy() for below-the-fold components
- **Image Lazy Loading**: Native `loading="lazy"` attribute
- **Suspense Boundaries**: Loading states for async components
- **Content Visibility**: CSS optimization for offscreen content

### Loading Strategy
- **Eager Loading**: Hero image, critical above-the-fold content
- **Lazy Loading**: Equipment images, partner logos, blog images
- **Progressive Enhancement**: Components load as needed

### Mobile Optimizations
- **Touch Scrolling**: `-webkit-overflow-scrolling: touch`
- **Viewport Meta**: Proper scaling and zoom limits
- **Font Smoothing**: Antialiasing for better text rendering
- **Horizontal Overflow**: Prevention of unwanted scrolling

## 🎨 Styling

### Tailwind CSS Configuration
- **Custom Colors**: Emerald green theme (#059669)
- **Typography**: Inter, Segoe UI, Roboto fonts
- **Animations**: Custom scroll and 3D rotation effects
- **Responsive Breakpoints**: Mobile-first approach

### CSS Features
- **Smooth Scrolling**: Native scroll behavior
- **3D Transforms**: Perspective and rotation effects
- **Transitions**: Smooth hover and state changes
- **Gradients**: Background gradients for visual appeal

## 🌐 Browser Support

- **Chrome**: ✅ Latest 2 versions
- **Firefox**: ✅ Latest 2 versions
- **Safari**: ✅ Latest 2 versions
- **Edge**: ✅ Latest 2 versions
- **Mobile Browsers**: ✅ iOS Safari, Chrome Mobile

## 📱 Mobile Responsiveness

### Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### Responsive Features
- **Adaptive Layouts**: Grid columns adjust by screen size
- **Touch-Friendly**: Minimum 44x44px touch targets
- **Readable Text**: Optimized font sizes for all devices
- **Flexible Images**: Scale properly on all screens

## 🔐 Best Practices

### Code Quality
- ✅ **TypeScript**: Full type safety
- ✅ **ESLint**: Code quality enforcement
- ✅ **Component Modularity**: Reusable, single-responsibility components
- ✅ **DRY Principle**: Centralized data management

### Performance
- ✅ **Code Splitting**: Reduced initial bundle size
- ✅ **Lazy Loading**: Progressive content loading
- ✅ **Image Optimization**: Proper loading strategies
- ✅ **CSS Optimization**: Tailwind CSS with PurgeCSS

### Accessibility
- ✅ **Semantic HTML**: Proper heading hierarchy
- ✅ **Alt Text**: Descriptive image alternatives
- ✅ **Keyboard Navigation**: All interactive elements accessible
- ✅ **ARIA Labels**: Screen reader support

### SEO
- ✅ **Meta Tags**: Proper page metadata
- ✅ **Semantic Structure**: Meaningful HTML elements
- ✅ **Fast Loading**: Optimized for Core Web Vitals
- ✅ **Mobile-Friendly**: Responsive design

## 🐛 Troubleshooting

### Common Issues

**Issue**: Development server won't start
```bash
# Solution: Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Issue**: Build errors
```bash
# Solution: Run TypeScript check
npm run build
# Check for type errors and fix them
```

**Issue**: Styling not working
```bash
# Solution: Ensure Tailwind is properly configured
# Check that index.css imports are present
```

## 📝 Environment Variables

Currently, this project doesn't use environment variables. If you need to add them:

1. Create `.env` file in root directory
2. Add variables with `VITE_` prefix
3. Access in code with `import.meta.env.VITE_VARIABLE_NAME`

Example:
```env
VITE_API_URL=https://api.example.com
VITE_PAYMENT_GATEWAY=https://payment.example.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 👥 Team

- **Repository Owner**: Sachindu-Nethmin
- **Branch**: patch-2
- **Default Branch**: main

## 🔗 Links

- **Repository**: [github.com/Sachindu-Nethmin/poverty-hack-2025](https://github.com/Sachindu-Nethmin/poverty-hack-2025)
- **Issues**: [Report bugs or request features](https://github.com/Sachindu-Nethmin/poverty-hack-2025/issues)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for Sri Lanka's Public Health**

*Last Updated: October 17, 2025*
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
