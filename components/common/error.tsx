import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  subtitle: string;
  statusCode: number;
  btnProps: {
    link: string;
    text: string;
  };
};

const ErrorWrapper = ({ title, subtitle, statusCode, btnProps }: Props) => {
  return (
    <div className="flex flex-col items-center h-screen justify-center w-full">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary mb-4 animate-bounce">
          {statusCode}
        </h1>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-8 max-w-md">{subtitle}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={btnProps.link}
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors group"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            {btnProps.text}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorWrapper;
