import ConverterView from '@/components/ConverterView';

export default async function HomePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  return <ConverterView locale={locale} page="home" />;
}
