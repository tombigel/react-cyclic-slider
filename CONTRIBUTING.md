# Contributing to React Cyclic Slider

Thank you for your interest in contributing to React Cyclic Slider! This document provides guidelines and instructions for contributing to this project.

## Development Setup

1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-cyclic-slider.git
   cd react-cyclic-slider
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   This will run Vite and serve the demo application at http://localhost:5173/react-cyclic-slider/

## Development Workflow

### Testing

We use Vitest for testing. You can run tests in different ways:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Building

```bash
# Build the demo app
npm run build

# Build the library
npm run build:lib
```

### Code Style

We use ESLint for linting. Our configuration is in `.eslintrc.cjs`.

## Project Structure

- `src/components/` - Component source code
- `src/theme/` - CSS theme files
- `src/` - Demo application

## Pull Requests

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them using descriptive commit messages

3. Push changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a pull request against the `master` branch

## Release Process

The maintainers will handle the release process, which includes:

1. Merging approved PRs
2. Updating version in package.json
3. Building and publishing to npm
4. Deploying demo to GitHub Pages

## License

By contributing to React Cyclic Slider, you agree that your contributions will be licensed under the project's MIT license. 