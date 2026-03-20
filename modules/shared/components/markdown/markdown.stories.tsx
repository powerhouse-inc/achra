import { Markdown } from './markdown'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/Markdown',
  component: Markdown,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Markdown>

export default meta
type Story = StoryObj<typeof meta>

// Default variant with basic markdown elements
export const Default: Story = {
  args: {
    children: `# Heading 1
## Heading 2
### Heading 3

This is a **bold text** and this is *italic text*. You can also combine them like ***bold and italic***.

Here's a [link to Streamdown](https://streamdown.ai/) which is built for AI-powered streaming.

> This is a blockquote. It can contain multiple lines and will be properly formatted.

Here's a list of features:
- Built-in typography styles
- GitHub Flavored Markdown support
- Beautiful code blocks with syntax highlighting
- Mathematical expressions support
- Interactive Mermaid diagrams
- Security hardening

And here's a numbered list:
1. First item
2. Second item
3. Third item with **bold text**

Here's some \`inline code\` and a code block:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`
}

console.log(greet('Streamdown'))
\`\`\`

You can also create task lists:
- [x] Completed task
- [ ] Pending task
- [x] Another completed task`,
  },
}

// Variant with table
export const WithTable: Story = {
  args: {
    children: `# Network Performance Report

This report shows the performance metrics for different networks over the past quarter.

## Summary

The data below represents key performance indicators across various blockchain networks, including transaction throughput, average fees, and user adoption rates.

| Network | TPS | Avg Fee (USD) | Active Users | Market Cap (B) | Status |
|---------|-----|---------------|--------------|----------------|--------|
| Ethereum | 15 | 2.50 | 1,200,000 | 450.2 | ✅ Active |
| Bitcoin | 7 | 5.20 | 800,000 | 1,200.5 | ✅ Active |
| Solana | 2,500 | 0.001 | 500,000 | 85.3 | ✅ Active |
| Polygon | 7,000 | 0.01 | 300,000 | 8.9 | ✅ Active |
| Arbitrum | 4,000 | 0.05 | 150,000 | 2.1 | ✅ Active |
| Optimism | 2,000 | 0.08 | 100,000 | 1.8 | ✅ Active |
| Base | 1,500 | 0.03 | 80,000 | 0.9 | 🟡 Growing |
| Avalanche | 4,500 | 0.02 | 200,000 | 12.4 | ✅ Active |

## Key Insights

- **Solana** leads in transaction throughput with 2,500 TPS
- **Bitcoin** has the highest average fees at $5.20 per transaction
- **Ethereum** maintains the largest user base with 1.2M active users
- **Base** shows promising growth potential as a newer network

> **Note**: All data is current as of Q4 2024 and represents average values over the reporting period.`,
  },
}

// Variant with KaTeX math expressions
export const WithKatex: Story = {
  args: {
    children: `# Mathematical Expressions in Markdown

Streamdown supports both inline and block mathematical expressions using KaTeX.

## Inline Math

Here are some inline math expressions: $$E = mc^2$$, $$ \\sum_{i=1}^{n} x_i$$, and $$ \\frac{a}{b} = \\frac{c}{d}$$.

You can also use inline math in sentences like: The quadratic formula is $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$.

## Block Math

Here's a block-level mathematical expression:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

And here's the famous Euler's identity:

$$
e^{i\\pi} + 1 = 0
$$

## Complex Equations

Here's a more complex equation showing the Schrödinger equation:

$$
i\\hbar\\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\hat{H}\\Psi(\\mathbf{r},t)
$$

Where:
- $$ \\Psi(\\mathbf{r},t)$$ is the wave function
- $$ \\hat{H}$$ is the Hamiltonian operator
- $$ \\hbar$$ is the reduced Planck constant

## Matrix Notation

You can also display matrices:

$$
\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
\\begin{pmatrix}
x \\\\
y
\\end{pmatrix}
=
\\begin{pmatrix}
ax + by \\\\
cx + dy
\\end{pmatrix}
$$

## Probability and Statistics

Here's Bayes' theorem:

$$
P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}
$$

And the normal distribution probability density function:

$$
f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}
$$

> **Note**: All mathematical expressions are rendered using KaTeX and support LaTeX syntax.`,
  },
}
