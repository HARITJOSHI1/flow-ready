import React from "react";

type HeaderColors = {
  primary: string;
  secondary: string;
  shadow: string;
};

type HeaderFont = {
  size: string;
};

type HeaderSection = {
  text: string;
  colors?: HeaderColors;
  font?: HeaderFont;
};

type Props = {
  main: HeaderSection;
  sub?: HeaderSection;
};

const Header = ({ main, sub }: Props) => {
  return (
    <h1 className="font-semibold leading-tight tracking-tight text-[10rem] sm:text-[10rem] flex flex-col items-center">
      <span
        className={`
                    relative inline-block
                    text-[10rem] sm:text-[15rem]
                    bg-gradient-to-tr from-yellow-400 via-fuchsia-500 to-blue-500
                    bg-clip-text text-transparent
                    transition-all duration-300
                    hover:from-blue-400 hover:via-pink-500 hover:to-yellow-400
                    hover:scale-105
                    hover:drop-shadow-[0_0_16px_rgba(236,72,153,0.5)]
                    drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]
                    cursor-pointer
                    mb-[-2rem]
                  `}
      >
        {main.text}
      </span>
      <span
        className={`
                    relative z-10 mx-auto max-w-4xl text-center text-5xl font-bold text-wrap text-neutral-800 md:text-6xl lg:text-7xl dark:text-neutral-100
                    bg-gradient-to-tr from-neutral-800 via-neutral-400 to-neutral-800
                    dark:from-neutral-100 dark:via-neutral-400 dark:to-neutral-800
                    bg-clip-text text-transparent
                    transition-all duration-200
                  `}
      >
        {sub?.text}
      </span>
    </h1>
  );
};

export default Header;
