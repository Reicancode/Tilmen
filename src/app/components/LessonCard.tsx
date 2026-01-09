import Link from "next/link";

type Props = {
  id: number;
  title: string;
};

export default function LessonCard({ id, title }: Props) {
  return (
    <Link
      href={`/lesson/${id}`}
      className="block bg-white p-5 rounded-2xl shadow
                 hover:shadow-lg hover:scale-[1.02] transition"
    >
      <h2 className="font-semibold text-lg text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600">Урок {id}</p>
    </Link>
  );
}
