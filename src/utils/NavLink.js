import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { pathToRegexp } from "path-to-regexp";

export default function NavLink({ href, as, exact, activeClassName, children, ...props }) {
  const { asPath } = useRouter();
  const isActive = pathToRegexp(as || href, [], { sensitive: true, end: !!exact }).test(asPath);

  const child = React.Children.only(children);
  const className = (
    (child.props.className || "") +
    " " +
    (isActive ? activeClassName : "")
  ).trim();

  return (
    <Link href={href} as={as} {...props}>
      {React.cloneElement(child, { className })}
    </Link>
  );
}
