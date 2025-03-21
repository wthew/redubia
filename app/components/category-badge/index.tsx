import Link from "next/link";
import { hashColor } from "../../utils";
import Color from "color";
import { WikiEntity } from "@/lib/services/gen";

type Props = { category: WikiEntity };
export function Category({ category }: Props) {
  const bg = Color({ hex: hashColor(category.title) }).desaturate(0.16);
  const fg = bg.lighten(0.25).isDark()
    ? bg.negate().lighten(0.5)
    : bg.negate().darken(0.75);

  const style = { background: bg.lighten(0.25).hex(), color: fg.hex() };

  return (
    <Link href={`/categories/${category.id}`}>
      <div
        className="w-max p-2 rounded-full m-1 text-xs hover:scale-110 transition-all"
        style={style}
      >
        <span>{category.title}</span>
      </div>
    </Link>
  );
}

export default async function Categories(props: { categories: WikiEntity[] }) {
  return (
    <div className="flex flex-wrap">
      {props.categories.map((category) => (
        <Category key={category.title} category={category} />
      ))}
    </div>
  );
}
