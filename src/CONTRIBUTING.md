# Contributing to Namastey Thailand

Thank you for your interest in contributing to Namastey Thailand! This document provides guidelines and instructions for contributing.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/namastey-thailand.git
   cd namastey-thailand
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Workflow

### Running Locally

```bash
npm run dev
```

### Code Style

- We use TypeScript for type safety
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Component Guidelines

- Place new components in `/components`
- Use functional components with hooks
- Extract reusable logic into custom hooks
- Use TypeScript interfaces for props
- Follow the existing naming conventions

Example:
```typescript
interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  return (
    <button onClick={onClick}>
      {title}
    </button>
  );
}
```

### Styling Guidelines

- Use Tailwind CSS classes
- Follow the design system in `styles/globals.css`
- Use shadcn/ui components when possible
- Ensure responsive design (mobile-first)
- Test on different screen sizes

### State Management

- Use React Context for global state
- Use local state for component-specific data
- Keep state as close to where it's used as possible

## 🧪 Testing

Before submitting a PR:

1. **Test your changes manually**
   - Test on desktop and mobile
   - Test in different browsers
   - Test both freelancer and client flows

2. **Check for console errors**
   - Open browser DevTools
   - Verify no errors or warnings

3. **Verify TypeScript**
   ```bash
   npm run build
   ```

## 📝 Commit Guidelines

Use clear and meaningful commit messages:

- `feat: add new feature`
- `fix: resolve bug in component`
- `docs: update README`
- `style: format code`
- `refactor: restructure component`
- `test: add tests`
- `chore: update dependencies`

Example:
```bash
git commit -m "feat: add job filtering to dashboard"
```

## 🔄 Pull Request Process

1. **Update your fork**
   ```bash
   git fetch upstream
   git merge upstream/main
   ```

2. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

4. **PR Description Should Include:**
   - What changes were made
   - Why these changes are needed
   - Screenshots (for UI changes)
   - How to test the changes

5. **Wait for Review**
   - Address any feedback
   - Make requested changes
   - Push updates to your branch

## 🐛 Reporting Bugs

When reporting bugs, include:

- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser and OS information
- Console errors (if any)

## 💡 Feature Requests

When suggesting features:

- Describe the feature clearly
- Explain why it would be useful
- Provide examples or mockups (if possible)
- Consider implementation complexity

## 📚 Areas for Contribution

### High Priority
- Improve mobile responsiveness
- Add unit tests
- Enhance accessibility (ARIA labels, keyboard navigation)
- Performance optimization
- SEO improvements

### Features
- Advanced search and filtering
- Real-time notifications
- Chat/messaging system
- Payment integration
- Multi-language support enhancements

### Documentation
- API documentation
- Component documentation
- Tutorial videos
- Translation improvements

## 🔧 Technical Debt

Help us improve:
- Refactor complex components
- Reduce code duplication
- Improve error handling
- Add TypeScript types where missing
- Optimize bundle size

## 🌍 Localization

To add or improve translations:

1. Edit language files
2. Test in both languages
3. Ensure cultural appropriateness
4. Maintain consistent terminology

## 📖 Documentation

- Update README if adding features
- Document new components
- Update DEPLOYMENT guide if needed
- Add inline code comments for complex logic

## ✅ Checklist Before Submitting

- [ ] Code follows existing style
- [ ] Changes tested manually
- [ ] No console errors
- [ ] TypeScript compiles without errors
- [ ] Responsive design works
- [ ] Commit messages are clear
- [ ] PR description is complete
- [ ] Screenshots included (for UI changes)

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the about section

## 📞 Questions?

- Open a discussion on GitHub
- Ask in pull request comments
- Check existing issues and PRs

---

Thank you for contributing to Namastey Thailand! Your efforts help connect professionals across India and Thailand. 🙏
