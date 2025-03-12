import Link from "next/link";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  description: string;
  action?: { label: string; link: string; disabled?: boolean };
  reversed?: boolean;
}

function Section(props: Props) {
  const { title, description, action, reversed, children } = props;
  const row = reversed ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <div className={"z-10 flex items-center mt-16 mb-8 flex-col " + row}>
      <div
        style={{ boxShadow: "black 0px 0px 64px 64px" }}
        className={
          "bg-black relative flex flex-col pt-8 px-6 m-2 rounded-xl w-full md:w-1/2"
        }
      >
        <h2 className="z-10 text-2xl mb-8 font-semibold text-gray-100">
          {title}
        </h2>
        {children}
      </div>
      <div
        style={{ boxShadow: "black 0px 0px 64px 64px" }}
        className="bg-black z-10 flex flex-col"
      >
        <p className="w-full px-2 md:px-8 mt-2 max-w-2xl mx-auto text-gray-400 text-left">
          {description}
        </p>
        {action && (
          <Link
            style={action.disabled ? { pointerEvents: "none" } : {}}
            className={
              "flex px-5 mt-4 py-2.5 justify-center w-full border-gray-100 rounded-lg transition-colors text-gray-100 " +
              (action.disabled ? "opacity-50 cursor-not-allowed" : "")
            }
            href={action.link}
          >
            <span className={action.disabled ? "line-through" : ""}>
              {action.label}
            </span>
            {action.disabled && <span className="mx-4">Em breve!</span>}
          </Link>
        )}
      </div>
    </div>
  );
}

interface BackgroundProps extends PropsWithChildren {}
Section.Background = function SectionBackground(props: BackgroundProps) {
  const { children } = props;

  return (
    <div className="z-0 absolute left-0 top-0 h-full w-full brightness-24">
      {children}
      <div
        className="absolute w-full h-full top-0 left-0"
        style={{
          boxShadow: "black 0px 0px 16px 24px inset,black 0px 0px 64px 64px",
        }}
      />
    </div>
  );
};

interface StripeProps {
  text: string;
}
Section.Stripe = function SectionStripe({ text }: StripeProps) {
  return (
    <div className="z-10 absolute right-0 top-0">
      <div className="rotate-45 translate-y-full translate-x-1/4">
        <span className="px-8 bg-accent">{text}</span>
      </div>
    </div>
  );
};

export default Section;
