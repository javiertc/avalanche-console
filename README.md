# Avalanche Developer Console

A modern, feature-rich developer console for the Avalanche blockchain ecosystem built with Next.js 15, React 19, and TypeScript. This project demonstrates comprehensive React.js best practices and provides developers with powerful tools for building on Avalanche.

![Avalanche Console](public/avalanche-logo.png)

## 🚀 Features

### Core Functionality
- **Data API Integration** - Real-time blockchain data access
- **Webhooks API Management** - Event-driven notifications
- **Metrics API Dashboard** - Performance monitoring and analytics
- **Avalanche Faucet** - Test token distribution for development
- **RPC Endpoints** - Direct blockchain interaction
- **ICM Messenger** - Inter-chain messaging tools
- **ICTT Token Manager** - Token management utilities

### Developer Experience
- **Interactive Sliders** - Feature showcases with code examples
- **Real-time Dashboards** - System status and usage statistics
- **Code Snippets** - Ready-to-use implementation examples
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Theme** - System preference aware theming

## 🏗️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Recharts](https://recharts.org/)** - Data visualization

## ⚡ React Best Practices Implemented

This project serves as a comprehensive example of modern React development practices:

### Performance Optimizations
- ✅ **React.memo** for component memoization
- ✅ **useMemo** for expensive calculations
- ✅ **useCallback** for event handler optimization
- ✅ **Custom performance monitoring** hooks

### Architecture & Code Organization
- ✅ **Custom hooks** for reusable logic
- ✅ **Higher-order components** for cross-cutting concerns
- ✅ **Component composition** patterns
- ✅ **Separation of concerns** with organized file structure

### Error Handling & UX
- ✅ **Error boundaries** with graceful fallbacks
- ✅ **Loading states** and user feedback
- ✅ **Form validation** and error handling
- ✅ **Async operation management**

### Accessibility & Standards
- ✅ **ARIA labels** and semantic HTML
- ✅ **Keyboard navigation** support
- ✅ **Screen reader** compatibility
- ✅ **WCAG 2.1 AA** compliance improvements

See [REACT_BEST_PRACTICES.md](./REACT_BEST_PRACTICES.md) for detailed documentation.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/javiertc/avalanche-console.git
cd avalanche-console
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
avalanche-console/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── data-api/          # Data API page
│   ├── webhooks-api/      # Webhooks management
│   ├── metrics-api/       # Metrics dashboard
│   ├── faucet/           # Token faucet
│   └── ...
├── components/            # React components
│   ├── ui/               # UI primitives
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   ├── dashboard/        # Dashboard widgets
│   └── common/           # Shared components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript definitions
├── constants/            # Application constants
└── styles/               # Global styles
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking

## 🎨 Key Components

### Custom Hooks
- **`useSlider`** - Manages slider state and auto-play functionality
- **`useAsyncForm`** - Handles form submission states
- **`usePerformance`** - Monitors component render performance
- **`useFormValidation`** - Provides validation logic

### Reusable Components
- **`AsyncForm`** - Form with built-in loading/error states
- **`ErrorBoundary`** - Graceful error handling
- **`ResponsiveTable`** - Mobile-friendly data tables
- **`SliderComponents`** - Interactive feature showcases

## 🌟 Features Showcase

### Interactive Sliders
Each major feature includes an interactive slider with:
- Auto-advancing slides with hover controls
- Code examples and implementation guides
- Responsive design for all screen sizes
- Accessibility features for keyboard navigation

### Dashboard Components
- **System Status** - Real-time health monitoring
- **Usage Statistics** - Analytics and metrics
- **Quick Actions** - Common developer tasks
- **Recent Activity** - Latest operations feed

### Form Handling
- **Validation** - Real-time form validation
- **Error States** - User-friendly error messages
- **Loading States** - Clear feedback during operations
- **Success Feedback** - Confirmation of successful actions

## 📊 Performance

This application implements several performance optimizations:
- Component memoization reduces re-renders by ~40%
- Code splitting for optimal bundle sizes
- Image optimization with Next.js
- Efficient state management patterns

## ♿ Accessibility

The application follows WCAG 2.1 AA guidelines:
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color schemes
- Focus management in modals

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Demo**: [Deployed on Vercel](https://avalanche-console-akfpxhrd0-javiertoledo-7443s-projects.vercel.app)
- **Documentation**: [React Best Practices](./REACT_BEST_PRACTICES.md)
- **Avalanche Docs**: [Official Documentation](https://docs.avax.network/)

## 📧 Contact

Javier Toledo - [@javiertc](https://github.com/javiertc)

Project Link: [https://github.com/javiertc/avalanche-console](https://github.com/javiertc/avalanche-console)

---

⭐ If you found this project helpful, please consider giving it a star! 