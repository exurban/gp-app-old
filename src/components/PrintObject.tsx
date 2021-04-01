import React from "react";

type Props = {
  content: Record<string, unknown>;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PrintObject = ({ content }: Props) => {
  const formattedContent: string = JSON.stringify(content, null, 2);
  return <pre>{formattedContent}</pre>;
};

export default PrintObject;
