import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SubjectPageClient from './SubjectPageClient';
import { SUBJECTS, UK_CITIES } from '@/lib/siteData';

interface Props { params: { subject: string } }

export async function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const subject = SUBJECTS.find((s) => s.slug === params.subject);
  if (!subject) return {};
    return {
    title: `11+ ${subject.label} Practice Questions | 11 Plus Exam Papers`,
    description: `Practise 11+ ${subject.label} with free online questions, topic guides and mock-style quizzes. Trusted by UK families preparing for grammar and independent school entrance exams.`,
    alternates: { canonical: `/subjects/${subject.slug}` },
    openGraph: {
      title: `11+ ${subject.label} Practice Questions | 11 Plus Exam Papers`,
      description: `Practise 11+ ${subject.label} with free online questions, topic guides and mock-style quizzes. Trusted by UK families preparing for grammar and independent school entrance exams.`,
      url: `/subjects/${subject.slug}`,
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `11+ ${subject.label} Practice Questions | 11 Plus Exam Papers`,
      description: `Practise 11+ ${subject.label} with free online questions, topic guides and mock-style quizzes. Trusted by UK families preparing for grammar and independent school entrance exams.`,
    },
    keywords: [
      '11+',
      '11 plus',
      `${subject.label} 11+`,
      `11+ ${subject.label.toLowerCase()} practice`,
      'grammar school entrance',
      'independent school entrance',
      'UK 11+ practice questions',
    ],
  };
}

export default function SubjectPage({ params }: Props) {
  const subject = SUBJECTS.find((s) => s.slug === params.subject);
  if (!subject) notFound();
  return <SubjectPageClient subject={subject} cities={UK_CITIES} />;
}
