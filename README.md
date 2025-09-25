# Raypx

[![Version](https://img.shields.io/github/package-json/v/raypx/raypx?style=flat-square)](https://github.com/raypx/raypx)
[![License](https://img.shields.io/github/license/raypx/raypx?style=flat-square)](https://opensource.org/licenses/Apache-2.0)
[![pnpm](https://img.shields.io/badge/pnpm-10.17.1-orange?style=flat-square&logo=pnpm)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-monorepo-red?style=flat-square&logo=turborepo)](https://turbo.build/)
[![Biome](https://img.shields.io/badge/Biome-linter%20%26%20formatter-yellow?style=flat-square&logo=biome)](https://biomejs.dev/)

> A modern, high-performance web application platform built with Next.js 15 and TypeScript, designed specifically for building scalable AI-powered applications with enterprise-grade security and developer experience.

## 🚧 Project Status

> **⚠️ This project is currently under active development and not yet ready for production use.**

We're working on significant improvements to enhance performance, developer experience, and maintainability. See our [roadmap](#-roadmap) for upcoming changes and current progress.

**Current Phase**: Architecture Optimization & Consolidation

## ✨ Features

- **🤖 AI-First Architecture** - Built-in AI integrations and optimizations
- **⚡ Lightning Fast** - Next.js 15 with React 19 and Turbopack
- **🔐 Enterprise Security** - Advanced authentication and authorization
- **🎨 Modern UI/UX** - Beautiful components with Radix UI + Tailwind CSS
- **📊 Real-time Analytics** - Comprehensive monitoring and insights
- **🔄 Type-Safe APIs** - End-to-end TypeScript with tRPC
- **🗄️ Database Agnostic** - Flexible ORM with Drizzle
- **🚀 Deploy Anywhere** - Optimized for cloud platforms

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 20.0.0 (LTS recommended)
- **pnpm** >= 10.17.0 (required for workspace management)
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/raypx/raypx.git
cd raypx

# Install dependencies with pnpm
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations (if applicable)
pnpm db:migrate

# Start development server
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

> **Note**: Some features may not be fully functional during the development phase. See [Known Issues](#-known-issues) for current limitations.

## 📚 Documentation

### User Documentation
Comprehensive user guides and API documentation will be available at the documentation website once deployed.

### Technical Documentation
Technical documentation is managed within the development workflow and will be integrated into the main documentation site.

## ⚠️ Known Issues

We're actively working on resolving the following issues:

### High Priority
- **i18n Middleware Incomplete** - The current middleware implementation lacks proper internationalization routing
- **Performance Optimization Missing** - Translation files are not optimized for lazy loading
- **Configuration Duplication** - Locale settings are duplicated across multiple files

### Medium Priority
- **Type Safety Gaps** - Some translation keys lack TypeScript type checking
- **Caching Strategy** - Missing intelligent caching for translation resources

These issues are being actively tracked and resolved as part of the ongoing development work.

## 🚀 Current Work in Progress

### Phase 1: i18n Foundation (In Progress)
- [x] Architecture analysis and planning
- [ ] Middleware implementation with next-intl
- [ ] Unified configuration system
- [ ] Type safety improvements

### Phase 2: Smart Loading System (Planned)
- [ ] Intelligent translation loading
- [ ] Caching strategy implementation
- [ ] Performance monitoring integration
- [ ] Developer tools enhancement

### Phase 3: Performance & Production (Planned)
- [ ] Bundle optimization and code splitting
- [ ] Advanced caching strategies
- [ ] Production deployment optimization
- [ ] Performance monitoring integration

## 🗺️ Roadmap

### Q1 2025 - Architecture Optimization
- **i18n System Overhaul** - Complete internationalization system with smart loading
- **Performance Enhancements** - Implement caching and lazy loading strategies
- **Code Quality Improvements** - Enhanced type safety and developer tools

### Q2 2025 - Feature Completion
- **AI Integration Completion** - Finalize AI-powered features
- **Authentication System** - Complete enterprise-grade auth implementation
- **Analytics Dashboard** - Real-time monitoring and insights
- **Production Readiness** - Security audits and performance optimization

### Q3 2025 - Ecosystem Expansion
- **Plugin Architecture** - Extensible plugin system
- **Third-party Integrations** - Major platform integrations
- **Developer Tools** - CLI tools and development utilities
- **Community Features** - Open source community tools

These improvements are being tracked through GitHub Issues and project milestones.

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 15.5.0](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript 5.9.2](https://www.typescriptlang.org/)** - Type-safe development

### Development Tools
- **[pnpm 10.17.0](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Turborepo](https://turbo.build/)** - High-performance build system for monorepos
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter
- **[Husky](https://typicode.github.io/husky/)** + **[Commitlint](https://commitlint.js.org/)** - Git hooks and commit standards

### UI & Styling
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, customizable component library
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library

### Backend & Database
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM with SQL-like syntax
- **[PostgreSQL](https://www.postgresql.org/)** - Advanced open source database
- **[Redis](https://redis.io/)** - In-memory data structure store
- **[Nodemailer](https://nodemailer.com/)** - Email service integration

### Testing & Quality
- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[Playwright](https://playwright.dev/)** - End-to-end testing
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript linting rules

## 📁 Project Structure

```
raypx/
├── apps/                          # Applications
│   ├── web/                      # Main Next.js application (raypx.com)
│   │   ├── app/                  # App Router pages and layouts
│   │   ├── components/           # React components
│   │   ├── lib/                  # Utility functions and configurations
│   │   └── public/               # Static assets
│   ├── docs/                     # Documentation website (docs.raypx.com)
│   │   ├── app/                  # Next.js app with Fumadocs
│   │   ├── content/              # User guides and API docs (MDX)
│   │   ├── components/           # Doc-specific UI components
│   │   └── locales/              # Documentation translations
│   └── api/                      # API service (api.raypx.com)
├── packages/                      # Shared packages
│   ├── ui/                       # UI component library
│   │   ├── components/           # Reusable UI components
│   │   └── lib/                  # UI utilities and themes
│   ├── i18n/                     # Internationalization system [UNDER RENOVATION]
│   │   ├── src/                  # Core i18n functionality
│   │   └── locales/              # Translation files
│   ├── auth/                     # Authentication system
│   ├── db/                       # Database layer and migrations
│   ├── email/                    # Email templates and service
│   ├── analytics/                # Analytics and tracking
│   ├── config/                   # Shared configurations
│   ├── shared/                   # Common utilities and types
│   └── testing/                  # Testing utilities and setup
├── tooling/                       # Development tools
│   ├── biome/                    # Biome configuration
│   ├── tsconfig/                 # TypeScript configurations
│   └── scripts/                  # Build and deployment scripts
└── .github/                       # GitHub workflows and templates
    └── workflows/                # CI/CD pipelines
```

> **📝 Note**:
> - `apps/docs/` is the user-facing documentation website built with Fumadocs
> - The `packages/i18n` system is undergoing significant improvements

## 🚀 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm preview          # Preview production build

# Code Quality
pnpm check            # Run Biome linting
pnpm format           # Format code with Biome
pnpm typecheck        # Run TypeScript type checking

# Testing
pnpm test             # Run unit tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage
pnpm test:e2e         # Run end-to-end tests

# Database
pnpm db:migrate       # Run database migrations
pnpm db:studio        # Open Drizzle Studio
pnpm db:seed          # Seed database with test data

# Utilities
pnpm clean            # Clean build artifacts
pnpm update:deps      # Update dependencies interactively
```

## 🔧 Development Notes

### Current Development Status

This project is in an active refactoring phase. Please be aware of the following:

### ⚠️ Important Warnings

- **i18n System**: The current internationalization implementation has known issues. Middleware functionality is incomplete.
- **Configuration**: Some configuration files contain duplicated settings that will be consolidated.

### 🛠️ Development Best Practices

- **Run Tests**: Always run `pnpm test` before committing changes
- **Check Types**: Use `pnpm typecheck` to verify TypeScript compliance
- **Code Quality**: Run `pnpm check` and `pnpm format` before submitting PRs
- **i18n Changes**: Coordinate any i18n-related changes with the ongoing optimization work

### 🐛 Reporting Issues

When reporting issues, please include:

1. **Environment Details**: Node.js version, pnpm version, operating system
2. **Steps to Reproduce**: Clear reproduction steps
3. **Expected vs Actual**: What you expected vs what happened
4. **Context**: Whether this is related to ongoing refactoring work

### 💡 Development Tips

- Use `pnpm dev --filter web` to run only the main web application (:3000)
- Use `pnpm dev --filter docs` to run only the documentation website (:3003)
- Use `pnpm dev --filter api` to run only the API service (:3001)
- Check `apps/docs/content/` for user-facing documentation content
- Monitor the GitHub Issues for ongoing architecture discussions

## 🤝 Contributing

We welcome contributions from the community! Since the project is under active development, please check our current priorities before contributing.

### How to Contribute

1. **Check Current Work**: Review our [Current Work in Progress](#-current-work-in-progress) to see what we're actively working on
2. **Review GitHub Issues**: Check ongoing work and technical discussions in GitHub Issues
3. **Join Discussions**: Participate in GitHub Discussions for architecture decisions
4. **Start Small**: Begin with documentation improvements or bug fixes

### Development Guidelines

- **Architecture Changes**: Large architectural changes should be discussed in issues first
- **i18n Work**: Coordinate with ongoing i18n optimization efforts
- **Testing**: Ensure all tests pass, especially during the refactoring phase
- **Documentation**: Update relevant docs when making changes

### Priority Areas for Contributions

- **Bug Reports**: Help us identify and fix issues during development
- **Documentation**: Improve setup guides and API documentation
- **Testing**: Add test coverage for existing functionality
- **UI/UX**: Suggest improvements to user interface and experience

For detailed contributing information, please check:

- Code of Conduct
- Development setup
- Submitting pull requests
- Reporting issues
- Coding standards

## 📄 License

This project is licensed under the [Apache License 2.0](https://opensource.org/licenses/Apache-2.0).

## 🙏 Acknowledgments

Special thanks to all the amazing open source projects that make Raypx possible:
- [Vercel](https://vercel.com/) for Next.js and deployment platform
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Tailwind Labs](https://tailwindlabs.com/) for Tailwind CSS
- [Drizzle Team](https://orm.drizzle.team/) for the excellent ORM

---

<div align="center">

**[Website](https://raypx.com)** • **[Documentation](https://docs.raypx.com)** • **[GitHub](https://github.com/raypx/raypx)** • **[Issues](https://github.com/raypx/raypx/issues)**

Made with ❤️ by the Raypx team

</div>