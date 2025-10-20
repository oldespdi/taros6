# Design Guidelines: ReveLove.IA Clone - Mystical Love Reading Application

## Design Approach
**Reference-Based Approach**: Faithful recreation of the ReveLove.IA spiritual/romantic web application with mystical aesthetic, particle effects, and multi-step user journey.

## Core Design Principles
- **Mystical Romance**: Blend spiritual/celestial themes with romantic elements
- **Gradual Revelation**: Build anticipation through progressive disclosure across steps
- **Emotional Connection**: Create intimate, personalized experience through warm visuals
- **Trust Building**: Professional polish with testimonials and social proof

## Color Palette

### Primary Colors (Dark Mode)
- **Background Base**: 280 40% 8% (deep purple-black)
- **Background Gradient**: Linear gradient from 320 50% 15% to 280 45% 10%
- **Primary Accent**: 320 70% 60% (vibrant pink)
- **Secondary Accent**: 280 60% 55% (mystical purple)
- **Success/Energy**: 340 80% 65% (warm coral-pink)

### Supporting Colors
- **Text Primary**: 0 0% 98%
- **Text Secondary**: 300 20% 75%
- **Card Background**: 280 30% 12% with 40% opacity
- **Glow/Shimmer**: 320 100% 70% (bright pink for effects)

## Typography

### Font Stack
- **Primary**: 'Playfair Display' (Google Fonts) - Elegant serif for headlines
- **Secondary**: 'Poppins' (Google Fonts) - Clean sans-serif for body text
- **Accent**: 'Montserrat' (Google Fonts) - For CTAs and labels

### Hierarchy
- **Hero Headline**: text-5xl md:text-6xl lg:text-7xl, font-bold
- **Section Titles**: text-3xl md:text-4xl, font-semibold
- **Body Text**: text-base md:text-lg, font-normal
- **Small Text**: text-sm, font-light

## Layout System

### Spacing Primitives
Use Tailwind units: **2, 4, 6, 8, 12, 16, 20** (p-2, m-4, gap-6, py-8, space-y-12, etc.)

### Grid Structure
- **Container**: max-w-7xl mx-auto px-4
- **Content Width**: max-w-4xl for reading content
- **Multi-Column**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for cards/features

## Component Library

### Navigation
- Minimal top bar with logo centered
- Progress indicator for multi-step flow (dots or progress bar)
- Sticky positioning with glassmorphism backdrop

### Buttons
- **Primary CTA**: Large rounded-full buttons (px-12 py-4) with gradient background (pink to purple)
- **Secondary**: outline variant with blur backdrop when over images
- **Hover**: Subtle scale transform (scale-105) and glow effect

### Cards
- **Glassmorphism**: backdrop-blur-xl bg-white/10 with subtle border
- **Tarot Cards**: Aspect ratio 2:3, hover lift effect (hover:-translate-y-2)
- **Result Cards**: Rounded-2xl with gradient borders and soft shadows

### Form Elements
- **Input Fields**: Dark background (bg-purple-950/50) with pink focus ring
- **Dropdowns**: Custom styled with purple accent
- **Radio/Checkbox**: Purple accent with smooth transitions
- **Labels**: Small caps with letter-spacing

### Loading States
- **Spinner**: Pulsating heart icon or rotating mystical symbol
- **Progress Messages**: Fade in/out animated text with typing effect
- **Particle Background**: Continuous floating hearts/stars animation

### Interactive Elements
- **Card Selection**: Grid of 6 cards, selectable with glow effect when chosen
- **Photo Upload**: Drag-and-drop zone with dotted border and preview
- **Question Options**: Large touchable areas with radio selection

## Visual Effects & Animations

### Background Effects
- **Particle System**: Floating hearts (pink) and stars (white) using CSS animations or lightweight JS
- **Gradient Animation**: Subtle shifting background gradients
- **Glow Effects**: Box-shadow with pink/purple blur on cards and buttons

### Micro-interactions
- **Hover States**: Scale transforms, glow intensity changes
- **Click Feedback**: Ripple effect or brief scale-down
- **Transitions**: 300ms ease-in-out for most elements
- **Page Transitions**: Fade or slide between steps (400ms)

### Loading Animations
- Pulsating heart for main loading
- Sequential text reveals for processing messages
- Shimmer effect on card reveals

## Images

### Required Images
1. **Hero Section**: Mystical background with celestial elements (stars, nebula, soft pink/purple glow) - full viewport height
2. **Tarot Cards**: 6 unique colorful tarot card designs with mystical imagery
3. **Result Profile Image**: Blurred romantic couple silhouette or abstract energy visualization
4. **Testimonial Avatars**: 3-4 circular avatars for social proof
5. **Decorative Elements**: Heart icons, sparkle icons, zodiac symbols

### Image Treatment
- Subtle blur/glow overlays for depth
- Gradient overlays for readability
- Rounded corners (rounded-xl to rounded-2xl)

## Page-Specific Guidelines

### Landing Page
- Full-height hero with animated background
- Centered headline with mystical tagline
- Large primary CTA button
- Trust indicators below fold

### Multi-Step Form
- Clear step indicators at top
- Single focused question per view
- Previous/Next navigation
- Validation feedback in pink

### Results Page
- Large profile card at top (glassmorphism)
- Detailed reading in paragraphs
- Testimonial grid (2-3 columns)
- Prominent payment CTA
- FAQ accordion at bottom

## Accessibility
- Maintain WCAG AA contrast ratios despite dark theme
- Focus indicators visible on all interactive elements
- Keyboard navigation through all steps
- Screen reader labels for decorative elements

## Performance Considerations
- Lazy load images below fold
- Optimize particle count for mobile devices
- Preload critical fonts
- Use CSS animations over JavaScript where possible