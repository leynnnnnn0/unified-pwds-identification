import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
const CodeContainer = ({
    code = `import axios from 'axios;
            
const result = await axios.get('https://unified-pwds-identification/api/verification', {
        apiKey = env('apiKey'),
        uid = 1434534645654346545
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err));`,
    language = "javascript",
}) => {
    return (
        <SyntaxHighlighter
            language={language}
            showLineNumbers={true}
            customStyle={{
                background: "#fcfcfc",
                padding: 10,
                borderRadius: "10px",
                margin: 0,
                fontSize: "14px",
            }}
        >
            {code}
        </SyntaxHighlighter>
    );
};

export default CodeContainer;
