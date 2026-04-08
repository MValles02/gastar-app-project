# Design System

This document outlines the visual language and UI components for the Gastar App.

## Approach

The MVP uses a combination of Tailwind CSS for styling and `shadcn/ui` for accessible, pre-built components. The UI is exclusively Spanish, mobile-first, and optimized for fast interaction.

## MagicPatterns Base

The design system is seeded from an initial MagicPatterns prototype. It establishes a warm, readable, and modern "app-like" feel, specifically designed to avoid eye strain and make financial data highly scannable.

### 1. Typography

- **Primary Font (Display & Body)**: `Geist`
- **Monospace Font**: `Geist Mono` (for code or specific ID rendering if needed).
- **Hierarchy**:
  - Section headers use tight tracking (`tracking-tight`) and bold weights (`font-bold`, `font-extrabold`).
  - Small labels (like form inputs) use wide tracking (`tracking-wider`), uppercase (`uppercase`), and slightly muted colors (`text-muted-foreground`).

### 2. Color Palette (OKLCH)

The palette uses OKLCH to ensure smooth, perceptual gradients and contrast. Crucially, it avoids pure whites and pure blacks to reduce eye fatigue.

- **Primary**: A warm amber/orange (`oklch(0.746 0.16 53.23)`) used for primary actions and accents.
- **Backgrounds**: Soft off-white for light mode (`oklch(0.98 0.01 53.23)`), and soft dark-gray for dark mode (`oklch(0.18 0.01 53.23)`).
- **Cards & Surfaces**: Often utilize subtle gradients (`bg-gradient-to-br from-card to-secondary/20`) and ambient background glows (`bg-[radial-gradient...]`) to create depth without harsh borders.
- **Semantic Colors**:
  - **Income**: Soft greens (`text-green-600` / `bg-green-100`).
  - **Expense**: Inherits standard text color or destructive red/orange for warnings.
  - **Destructive**: Deep red/orange (`oklch(0.577 0.245 27.325)` in light mode).

### 3. Shape & Space

- **Border Radius**: The UI favors heavily rounded corners (`--radius: 0.625rem;`). Buttons often use `rounded-full`, while cards and inputs use `rounded-xl` or `rounded-2xl` to feel more like a mobile app than a strict enterprise dashboard.
- **Touch Targets**: Inputs and buttons are large and finger-friendly (e.g., `h-12` or `h-14` for form fields).

### 4. Components

- **Icons**: `lucide-react` is the standard icon set.
- **Form Inputs**:
  - Inputs have subtle tinted backgrounds (`bg-secondary/30`) rather than stark white boxes.
  - Number inputs on mobile should invoke the numeric keypad.
- **Buttons**:
  - Primary buttons use solid primary color with a soft shadow (`shadow-primary/20 shadow-lg`).
  - Secondary/Ghost buttons are used heavily to reduce visual clutter until hovered.
- **Transaction Lists**:
  - List items are separated by generous padding and hover states (`hover:bg-secondary/50`), usually featuring a circular icon container on the left, details in the middle, and the amount (with explicit + or - sign) on the right.

## Principles

- **Mobile First**: All views are designed for a phone screen first. Desktop views are an enhancement, not the baseline.
- **High Contrast**: Ensure text and interactive elements are easily distinguishable.
- **Fast Entry**: Forms should have large touch targets and default to sensible numeric keyboards on mobile.
- **Minimal Chrome**: Avoid heavy navbars or sidebars; focus on the primary action (e.g., adding an expense or transfer).
