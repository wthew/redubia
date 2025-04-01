import Link from "next/link";

export default function TagsSelector() {
  return (
    <div className="flex flex-wrap gap-3">
      {[
        "Heróis",
        "Vilões",
        "Animação",
        "Live-Action",
        "Clássicos",
        "Reboots",
      ].map((tag) => (
        <Link
          key={tag}
          href={`/wiki/tags?tags=[${tag.toLowerCase()}]`}
          className="px-4 py-2 bg-gray-900/40 backdrop-blur-sm rounded-full border border-gray-700 hover:border-cyan-400/30 text-gray-300 hover:text-cyan-300 transition-all duration-200 text-sm"
        >
          <span className="opacity-50 mr-1">#</span>
          {tag}
        </Link>
      ))}
    </div>
  );
}
