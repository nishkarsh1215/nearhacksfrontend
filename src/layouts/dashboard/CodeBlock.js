import React from "react";
import { Highlight } from "prism-react-renderer";

const defaultProps = {
  // Define your default props here if needed
};

export const CodeBlock = ({ code, language }) => {
  return (
    <Highlight {...defaultProps} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <pre
            className={className}
            style={{ ...style, overflowX: "auto", whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          >
            <code>
              {tokens.map((line, idx) => {
                return (
                  <div {...getLineProps({ line, key: `line-${idx}` })}>
                    {line.map((token, i) => {
                      return <span {...getTokenProps({ token, key: `token-${i}` })} />;
                    })}
                  </div>
                );
              })}
            </code>
          </pre>
        );
      }}
    </Highlight>
  );
};
