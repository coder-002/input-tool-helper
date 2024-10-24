<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

  <h1>input-tool-helper</h1>

  <p>input-tool-helper is a JavaScript package that provides transliteration functionality, specifically allowing the transformation of user input from one script to another. It leverages Google's transliteration API for dynamic transliteration suggestions as the user types, which can be useful for creating language input tools.</p>

  <h3>Installation</h3>

  <p>To install the <strong>input-tool-helper</strong> package, use npm or yarn:</p>

  <pre class="bash">
    <code>npm install input-tool-helper</code>
  </pre>
  <p>or</p>
  <pre class="bash">
    <code>yarn add input-tool-helper</code>
  </pre>

  <h3>Usage</h3>

  <p>Here is a basic example of how to use <strong>input-tool-helper</strong> to integrate transliteration functionality in a React component:</p>

  <h3>Example</h3>
  
  <pre class="typescript">
    <code>
      import { useState } from "react";
      import googleTransliterate from "input-tool-helper";
      
      export default function Dashboard() {
        let inputLanguage = "ne-t-i0-und"; // Example: Nepali transliteration
        let maxResult = 8; // Maximum number of transliteration suggestions
        let request = new XMLHttpRequest();
      
        const [inputValue, setInputValue] = useState("");
        const [suggestions, setSuggestions] = useState<string[]>([]);
          
        const onChangeHandler = (event: any) => {
          setInputValue(event.target.value);
          googleTransliterate(request, event.target.value, inputLanguage, maxResult)
            .then(function (response: string[][]) {
              const suggestionList = response.map((item: string[]) => item[0]);
              setSuggestions(suggestionList);
            })
            .catch((error: any) => {
              console.error("Error fetching transliterated data:", error);
            });
        };
          
        const onSuggestionClick = (suggestion: string, event: any) => {
          event.preventDefault();
          setInputValue(suggestion);
          setSuggestions([]);
          document.getElementById("input-field")?.focus();
        };
        return (
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="name"
              id="input-field"
              onChange={onChangeHandler}
              value={inputValue}
              autoComplete="off"
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
            {suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  maxHeight: "150px",
                  overflowY: "auto",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  zIndex: 1000,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <p
                    key={index}
                    onMouseDown={(event) => onSuggestionClick(suggestion, event)}
                    style={{
                      padding: "8px",
                      margin: 0,
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                      backgroundColor: "#fff",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f0f0f0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fff")
                    }
                  >
                    {suggestion}
                  </p>
                ))}
              </div>
            )}
          </div>
        );
      }
    </code>
  </pre>

  <h3>Parameters</h3>
  <ul>
    <li><strong>inputLanguage:</strong> Specifies the language and transliteration script. This is a language tag (e.g., <code>ne-t-i0-und</code> for Nepali).</li>
    <li><strong>maxResult:</strong> The maximum number of transliteration suggestions to display.</li>
    <li><strong>request:</strong> An <code>XMLHttpRequest</code> object used by the Google Transliteration API for handling requests and responses.</li>
  </ul>

  <h3>Transliterate Function</h3>
  <pre class="javascript">
    <code>
      googleTransliterate(request, text, inputLanguage, maxResult)
    </code>
  </pre>

  <ul>
    <li><strong>request:</strong> The <code>XMLHttpRequest</code> object to make the request.</li>
    <li><strong>text:</strong> The string the user types, which will be transliterated.</li>
    <li><strong>inputLanguage:</strong> A string that specifies the language code for the target language (e.g., Hindi, Nepali).</li>
    <li><strong>maxResult:</strong> Maximum number of transliteration suggestions to fetch.</li>
  </ul>

  <h3>Handling the Suggestions</h3>
  <p>The package provides transliteration suggestions as a list of arrays, where each inner array contains possible transliterations for a specific input. You can process these to display the suggestions and allow users to select from them.</p>

  <h3>Error Handling</h3>
  <p>In case of an error while fetching transliteration suggestions, ensure proper error handling to avoid breaking the user experience:</p>

  <pre class="javascript">
    <code>
      .catch((error) => {
        console.error("Error fetching transliterated data:", error);
      });
    </code>
  </pre>

  <table border="1">
    <thead>
        <tr>
            <th>Language</th>
            <th>Code</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Amharic</td>
            <td>am-t-i0-und</td>
        </tr>
        <tr>
            <td>Arabic</td>
            <td>ar-t-i0-und</td>
        </tr>
        <tr>
            <td>Bengali</td>
            <td>bn-t-i0-und</td>
        </tr>
        <tr>
            <td>Chinese (Hong Kong)</td>
            <td>yue-hant-t-i0-und</td>
        </tr>
        <tr>
            <td>Chinese (Simplified, China)</td>
            <td>zh-t-i0-pinyin</td>
        </tr>
        <tr>
            <td>Chinese (Traditional, Taiwan)</td>
            <td>zh-hant-t-i0-und</td>
        </tr>
        <tr>
            <td>Greek</td>
            <td>el-t-i0-und</td>
        </tr>
        <tr>
            <td>Gujarati</td>
            <td>gu-t-i0-und</td>
        </tr>
        <tr>
            <td>Hindi</td>
            <td>hi-t-i0-und</td>
        </tr>
        <tr>
            <td>Kannada</td>
            <td>kn-t-i0-und</td>
        </tr>
        <tr>
            <td>Malayalam</td>
            <td>ml-t-i0-und</td>
        </tr>
        <tr>
            <td>Marathi</td>
            <td>mr-t-i0-und</td>
        </tr>
        <tr>
            <td>Nepali</td>
            <td>ne-t-i0-und</td>
        </tr>
        <tr>
            <td>Oriya</td>
            <td>or-t-i0-und</td>
        </tr>
        <tr>
            <td>Persian</td>
            <td>fa-t-i0-und</td>
        </tr>
        <tr>
            <td>Punjabi</td>
            <td>pu-t-i0-und</td>
        </tr>
        <tr>
            <td>Russian</td>
            <td>ru-t-i0-und</td>
        </tr>
        <tr>
            <td>Sanskrit</td>
            <td>sa-t-i0-und</td>
        </tr>
        <tr>
            <td>Serbian</td>
            <td>sr-t-i0-und</td>
        </tr>
        <tr>
            <td>Sinhalese</td>
            <td>si-t-i0-und</td>
        </tr>
        <tr>
            <td>Tamil</td>
            <td>ta-t-i0-und</td>
        </tr>
        <tr>
            <td>Telugu</td>
            <td>te-t-i0-und</td>
        </tr>
        <tr>
            <td>Thai</td>
            <td>th-t-i0-und</td>
        </tr>
        <tr>
            <td>Tigrinya</td>
            <td>ti-t-i0-und</td>
        </tr>
        <tr>
            <td>Urdu</td>
            <td>ur-t-i0-und</td>
        </tr>
    </tbody>
</table>


</body>
</html>
