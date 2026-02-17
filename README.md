# 11+ Whiz: Exam Prep

An interactive 11+ exam preparation app with comprehensive practice questions for Maths, English, Verbal Reasoning, and Non-Verbal Reasoning.

## Features

- ✅ **Professional Landing Page** - Lead generation with email capture modal
- ✅ **No API Dependencies** - All questions are stored locally, no external API calls
- 🎨 **Multiple Themes** - Choose from Default, Ocean, Jungle, Sunset, and Midnight themes
- 📚 **Four Subjects** - Maths, English, Verbal Reasoning, Non-Verbal Reasoning
- 🎯 **Multiple Question Types** - Multiple choice, True/False, Fill-in-the-blank, Ordering
- 🏆 **Gamification** - Earn stars, unlock badges, track progress
- 💬 **Helpful Hints** - Get pre-written helpful hints (no API needed)
- 📊 **Progress Tracking** - Monitor performance across all subjects
- 🎓 **School-Specific** - Grammar, Private, or State school difficulty levels

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Canvas Confetti** - Celebration effects
- **Lucide React** - Beautiful icons

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

## Deploy to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

## Project Structure

```
whiz-exam-prep/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main app component
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── Button.tsx
│   ├── Dashboard.tsx
│   ├── Header.tsx
│   ├── QuizArea.tsx
│   ├── TutorChat.tsx
│   └── ...
├── data/
│   └── questionBank.ts     # All quiz questions (400+ questions)
├── services/
│   └── questionService.ts  # Question & tutor logic (no API)
├── types.ts                # TypeScript type definitions
└── package.json
```

## Question Bank

The app includes 400+ pre-written questions covering:

- **Maths**: Percentages, Area, Multiplication, Fractions, Geometry, Algebra
- **English**: Vocabulary, Grammar, Punctuation, Spelling, Literary Devices
- **Verbal Reasoning**: Analogies, Codes, Sequences, Synonyms, Logic
- **Non-Verbal Reasoning**: Patterns, Rotation, Reflection, Shapes, Spatial Reasoning

Each question includes:
- Question text
- Multiple options (format varies by question type)
- Correct answer
- Detailed explanation
- Topic categorization

## Customization

### Adding More Questions

Edit `data/questionBank.ts` and add questions to the relevant subject and question type:

```typescript
{
  id: 'unique-id',
  text: 'Your question here?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 'Option A',
  explanation: 'Why this is correct...',
  topic: 'Topic Name'
}
```


### Changing Themes

Modify `THEME_STYLES` in `app/page.tsx` to add or customize themes.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is for educational purposes.

## Credits

Built with ❤️ for 11+ exam preparation
