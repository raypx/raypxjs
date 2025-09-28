# Raypx Dev Tool

A comprehensive development tool for the Raypx application suite, inspired by Makerkit's dev-tool approach.

## Overview

The Raypx Dev Tool provides a centralized interface for monitoring, testing, and managing your development environment. It helps developers quickly identify issues, test components, and manage configuration.

## Features

### 🔍 **Service Monitoring**
- **Database Status**: PostgreSQL connection health
- **Redis Status**: Cache service connectivity
- **Email Service**: Email provider status
- **AI Services**: AI provider connectivity check

### ⚙️ **Environment Management**
- **Environment Variables**: View and validate configuration
- **Mode Switching**: Development/Production environment toggle
- **Configuration Validation**: Check for missing or invalid settings

### 🎨 **UI Development**
- **Component Library**: Preview @raypx/ui components
- **Theme Testing**: Light/dark mode switching
- **Responsive Preview**: Mobile/desktop view testing

### 🔧 **Development Tools**
- **Database Explorer**: View schemas and data
- **API Testing**: Test endpoints and responses
- **Email Templates**: Preview and test email templates
- **Internationalization**: Manage translations and locales

## Quick Start

```bash
# Start the dev tool (runs on port 3010)
pnpm dev-tool

# Or start individually
pnpm --filter @raypx/dev-tool run dev
```

Navigate to `http://localhost:3010` to access the dev tool interface.

## Project Structure

```
apps/dev-tool/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Dashboard page
│   ├── environment/            # Environment variables management
│   ├── components/             # UI component preview
│   ├── database/               # Database tools
│   ├── api/                    # API testing
│   ├── email/                  # Email templates
│   ├── i18n/                   # Internationalization
│   └── logs/                   # Application logs
├── components/
│   ├── status-card.tsx         # Service status display
│   ├── tool-navigation.tsx     # Navigation sidebar
│   └── ...                     # Other shared components
└── lib/
    ├── connectivity.ts         # Service connectivity checks
    └── ...                     # Utility functions
```

## Usage Guide

### Service Status Monitoring

The dashboard provides real-time status of critical services:

- **Green**: Service is online and healthy
- **Red**: Service is offline or has errors
- **Yellow**: Service is being checked
- **Gray**: Service status unknown

### Environment Variables

- Switch between development and production modes
- Validate required environment variables
- Check for security issues (exposed secrets)
- Generate .env templates

### Component Preview

- Browse all UI components from @raypx/ui
- Test different states and props
- Preview in different themes
- Test responsive behavior

### API Testing

- Test API endpoints
- View request/response data
- Check authentication
- Monitor performance

## Development Notes

### Adding New Tools

To add a new tool to the dev interface:

1. Create a new page in `app/[tool-name]/page.tsx`
2. Add navigation item in `components/tool-navigation.tsx`
3. Implement the tool functionality
4. Update this README

### Service Checks

Service connectivity checks are implemented in `lib/connectivity.ts`. To add a new service:

1. Add the service check function
2. Update the dashboard to display the status
3. Add error handling and recovery suggestions

### Security Considerations

⚠️ **Important**: This dev tool is for development use only.

- Never deploy to production
- Don't expose sensitive environment variables
- Use proper access controls in team environments
- Keep the tool updated with security patches

## Troubleshooting

### Common Issues

**Tool won't start**:
- Check if port 3010 is available
- Verify dependencies are installed
- Check for TypeScript errors

**Service status shows offline**:
- Verify service configuration
- Check environment variables
- Review connection settings

**Components not loading**:
- Ensure @raypx/ui is built
- Check import paths
- Verify workspace dependencies

### Performance

The dev tool is designed to be lightweight:
- Service checks are cached
- Components lazy load
- Minimal external dependencies

## Contributing

When contributing to the dev tool:

1. Follow the established patterns
2. Add proper TypeScript types
3. Include error handling
4. Update documentation
5. Test in both development and production modes

## Related Tools

- **E2E Tests**: `apps/e2e/` - Automated testing
- **Web App**: `apps/web/` - Main application
- **Docs**: `apps/docs/` - Documentation site

## Support

For issues with the dev tool:

1. Check the console for errors
2. Verify environment configuration
3. Review service dependencies
4. Check network connectivity