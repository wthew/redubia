import Link from "next/link";
import { getCategoriesForPage, GetCategoriesForPage200 } from "../../services/gen";
import { hashColor } from "../../utils";
import Color from "color";

type Props = { category: GetCategoriesForPage200[number] };
export function Category({ category }: Props) {
  const bg = Color({ hex: hashColor(category.title) }).desaturate(0.16);
  const fg = bg.lighten(0.25).isDark()
    ? bg.negate().lighten(0.5)
    : bg.negate().darken(0.75);

  const style = { background: bg.lighten(0.25).hex(), color: fg.hex() };

  return (
    <Link href={`/${category.id}`}>
      <div
        className="w-max p-2 rounded-full m-1 text-xs hover:scale-110 transition-all"
        style={style}
      >
        <span>{category.title}</span>
      </div>
    </Link>
  );
}

export default async function Categories(props: { id: number }) {
    const { data: categories } = await getCategoriesForPage({ id: props.id });

  return (
    <div className="flex flex-wrap">
      {categories.map((category) => (
        <Category key={category.title} category={category} />
      ))}
    </div>
  );
}
