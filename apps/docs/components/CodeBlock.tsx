export const CodeBlock: React.FC<{ code: string; language?: string }> = ({
  code,
}) => (
  <div className="code-block">
    <pre>{code}</pre>
  </div>
);
