# Contributing to Mero Link

Thank you for your interest in contributing to Mero Link! This document provides guidelines and instructions for contributing to our project.

---

## Code of Conduct

By participating in this project, you agree to uphold our Code of Conduct:
- Be respectful and inclusive
- Avoid harassment and discrimination
- Welcome feedback and collaborate constructively

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/mero-link.git
   cd mero-link
   ```
3. **Create a feature branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Follow the development setup** in [GETTING-STARTED.md](./GETTING-STARTED.md)

---

## Development Workflow

### Before You Start

1. Check existing [Issues](https://github.com/yourusername/mero-link/issues) and [PRs](https://github.com/yourusername/mero-link/pulls)
2. For large changes, open an issue for discussion first
3. Ensure your changes align with project goals

### Making Changes

1. **Write clean code** following the existing style
2. **Add tests** for new features (if applicable)
3. **Update documentation** if behavior changes
4. **Test locally** before submitting:
   ```bash
   npm run build  # Verify production build
   npm run lint   # Check code quality
   npm run dev    # Test in development
   ```

### Code Style

- **JavaScript/React**: Use ES6+ syntax
- **Formatting**: 2-space indentation
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Comments**: Add comments for complex logic
- **No console logs**: Remove debug logs before committing

### Git Commit Messages

Use clear, descriptive commit messages:

```
✨ feat: Add dark mode toggle to theme selector
🐛 fix: Resolve cache invalidation on saveTheme
📚 docs: Update API documentation
🎨 style: Format button component styles
♻️ refactor: Simplify cache utility functions
🧪 test: Add unit tests for cache module
⚡ perf: Optimize database queries with indexes
```

**Commit message format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, test, perf, chore

---

## Submitting Changes

### Before Submitting a PR

1. **Pull latest main**:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
2. **Run tests and linting**:
   ```bash
   npm run lint
   npm run build
   ```
3. **Ensure no merge conflicts**

### Creating a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Description of what changed and why
   - Link to related issue (if any): `Closes #123`
   - Screenshots for UI changes
   - List of breaking changes (if any)

3. **PR Template**:
   ```markdown
   ## Description
   Brief description of the changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement

   ## Testing
   How to test the changes

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex logic
   - [ ] Documentation updated
   - [ ] No new warnings generated
   - [ ] Tested in development
   - [ ] Built successfully for production
   ```

---

## Reviewing Process

1. **Automated checks** run (lint, build, tests)
2. **Code review** by maintainers
3. **Feedback and revisions** as needed
4. **Approval and merge**

---

## Areas to Contribute

### Backend
- Database optimizations
- API improvements
- Authentication enhancements
- Error handling

### Frontend
- UI/UX improvements
- New themes
- Performance optimizations
- Accessibility features

### Documentation
- API documentation
- Guides and tutorials
- Code examples
- Troubleshooting

### Tooling
- Build process improvements
- Testing infrastructure
- CI/CD enhancements

---

## Reporting Bugs

### Before Reporting

1. Check if bug already exists in Issues
2. Try reproducing with latest code
3. Gather relevant information

### Bug Report Template

```markdown
## Describe the Bug
Clear description of the issue

## To Reproduce
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen instead

## Screenshots
If applicable, add screenshots

## Environment
- OS: [e.g., Windows, macOS, Linux]
- Browser: [e.g., Chrome 120]
- Node.js version: [e.g., 18.0.0]

## Additional Context
Any other relevant information
```

---

## Suggesting Enhancements

### Enhancement Request Template

```markdown
## Description
Clear description of the enhancement

## Motivation
Why this would be useful

## Proposed Solution
How you envision it working

## Alternatives Considered
Other approaches considered

## Additional Context
Screenshots or mockups if applicable
```

---

## Development Tips

### Testing Locally

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
npm run dev

# Test specific route
curl http://localhost:3000/api/livePageData?uri=test
```

### Database Operations

```bash
# Connect to MongoDB locally
mongosh

# View collections
db.pages.find()

# Clear test data
db.pages.deleteMany({ owner: "test" })
```

### Environment Variables

Keep a `.env.local.example` for development setup:
```env
MONGO_URI=mongodb://localhost:27017/merolink-dev
NEXTAUTH_SECRET=dev-secret-key
NEXTAUTH_URL=http://localhost:3000
```

---

## Performance Considerations

When contributing, keep these in mind:

- **Database**: Use indexes, lean queries, field projection
- **Caching**: Implement cache invalidation for mutations
- **Images**: Use Next.js Image component
- **Bundles**: Avoid large dependencies, use code splitting
- **Network**: Minimize payload size, use compression

---

## Documentation Guidelines

- Write clear, concise documentation
- Include code examples
- Add screenshots for UI changes
- Update README if behavior changes
- Keep docs up to date

---

## Licensing

By contributing, you agree your code is licensed under the MIT License.

---

## Need Help?

- 📖 [GETTING-STARTED.md](./GETTING-STARTED.md)
- 📡 [API Documentation](./API.md)
- 🐛 [Issues](https://github.com/yourusername/mero-link/issues)
- 💬 [Discussions](https://github.com/yourusername/mero-link/discussions)

**Thank you for contributing! 🎉**
