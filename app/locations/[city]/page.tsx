import { redirect, notFound } from 'next/navigation';
import { UK_CITIES } from '@/lib/siteData';

interface Props { params: { city: string } }

export async function generateStaticParams() {
  return UK_CITIES.map((c) => ({ city: c.slug }));
}

export default function LocationsRedirect({ params }: Props) {
  const city = UK_CITIES.find((c) => c.slug === params.city);
  if (!city) notFound();
  redirect(`/tutors/${city.slug}`);
}
