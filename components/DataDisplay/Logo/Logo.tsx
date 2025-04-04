/** @jsxImportSource @emotion/react */
import React from "react";
import { css, CSSObject } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  src?: string;
  alt?: string;
  href?: string;
  sx?: CSSObject;
  className?: string;
};




const Logo: React.FC<LogoProps> = ({
  src = "/logo.png",
  alt = "Logo",
  href,
  sx = {},
  className = "",
}) => {
  const combinedStyles = css([
    sx, // Allow overriding default styles
  ]);

  const LogoContent = (
    <>
      {src && <Image src={src} alt={alt} />}
      
    </>
  );

  // If href is provided, use Link directly
  if (href) {
    return (
      <Link href={href} css={combinedStyles} className={className}>
        {LogoContent}
      </Link>
    );
  }

  // Otherwise, render as div
  return (
    <div css={combinedStyles} className={className}>
      {LogoContent}
    </div>
  );
};

export default Logo;
