type Props = React.PropsWithChildren;
export default function UserLayout({ children }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 min-h-screen">
      {children}
    </div>
  );
}
