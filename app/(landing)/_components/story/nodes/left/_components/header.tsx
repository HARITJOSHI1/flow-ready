import React from "react";

type Props = {
    title: string;
    badgeTitle: string;
};

const Header = ({title, badgeTitle}: Props) => {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-xs md:text-sm tracking-wide">
          {title}
        </h3>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="px-3 py-1 text-xs rounded-full bg-primary text-primary-foreground font-medium inline-flex items-center">
            {badgeTitle}
          </span>
          <span className="px-2.5 py-1 text-xs rounded-full bg-secondary text-secondary-foreground inline-flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            5
          </span>

          <button className="w-5 h-5 flex items-center justify-center hover:bg-secondary rounded">
            <svg
              className="w-4 h-4 text-muted-foreground"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
