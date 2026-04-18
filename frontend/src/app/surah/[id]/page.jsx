import SurahById from "@/components/SurahPageComponents/SurahById";

export default async function SurahPage({ params }) {
  const { id } = await params;
  return (
    <SurahById id={id} />
  );
}