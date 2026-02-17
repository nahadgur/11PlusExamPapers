import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import TutorCityPageClient from './TutorCityPageClient';
import { UK_CITIES } from '@/lib/siteData';

interface Props {
  params: { city: string };
}

export async function generateStaticParams() {
  return UK_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = UK_CITIES.find((c) => c.slug === params.city);
  if (!city) return {};

  const title = `11 Plus Tutor in ${city.label} | 11 Plus Exam Papers`;
  const description =
    `Find 11+ tutor support in ${city.label}. Local exam context, practical preparation guidance, and a simple enquiry form.`;

  return {
    title,
    description,
    alternates: { canonical: `/tutors/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `/tutors/${city.slug}`,
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    keywords: [
      '11+',
      '11 plus',
      '11+ tutor',
      `11+ tutor ${city.label}`,
      `11+ tutor in ${city.label}`,
      'grammar school tutor',
      'independent school tutor',
    ],
  };
}

export default function TutorCityPage({ params }: Props) {
  const city = UK_CITIES.find((c) => c.slug === params.city);
  if (!city) notFound();

  return (
    <div className="min-h-screen bg-white">
      <SiteNav />
      <TutorCityPageClient city={city} />
      <SiteFooter />
    </div>
  );
}
