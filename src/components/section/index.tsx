import Link from "next/link";
import { PropsWithChildren } from "react";

interface SectionProps {
  title: string;
  titleIcon?: string;
  description: string;
  action: {
    label: string;
    link: string;
    disabled?: boolean;
  };
  className?: string;
  children?: React.ReactNode;
}

function Section({ title, titleIcon, description, action, className, children }: SectionProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          {titleIcon && <span className="text-2xl">{titleIcon}</span>}
          <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
        </div>

        <p className="text-gray-400 mb-6 leading-relaxed">
          {description}
        </p>

        <button
          className={`px-4 py-2 rounded-lg ${action.disabled
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-400 text-white'
            } transition-colors`}
          disabled={action.disabled}
        >
          {action.label}
        </button>
      </div>
    </div>
  );
}

interface BackgroundProps extends PropsWithChildren { }
Section.Background = function SectionBackground(props: BackgroundProps) {
  const { children } = props;

  return (
    <div className="z-0 absolute left-0 top-0 h-full w-full brightness-24">
      {children}
      <div
        className="absolute w-full h-full top-0 left-0"
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
