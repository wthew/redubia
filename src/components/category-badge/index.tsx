import Link from "next/link";
import { hashColor } from "../../utils";
import Color from "color";
import { WikiCategoriesSchema } from "@/lib/services/gen";

type Props = { category: WikiCategoriesSchema };
export function Category({ category }: Props) {
  const bg = Color({ hex: hashColor(category.category) }).desaturate(0.16);
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
        <span>{category.category}</span>
      </div>
    </Link>
  );
}

export default async function Categories(props: { categories: WikiCategoriesSchema[] }) {
  return (
    <div className="flex flex-wrap">
      {props.categories.map((category) => (
        <Category key={category.category} category={category} />
      ))}
    </div>
  );
}
