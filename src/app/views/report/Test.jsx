import React, { useState } from "react";

import LanguageContext from "./Context";
import LanguageSwitcher from "./ContextB";

const App = () => {
  const [language, setLanguage] = useState("en");
  const value = { language, setLanguage };

  return (
    <LanguageContext.Provider value={value}>
      <h2>Current Language: {language}</h2>
      <p>Click button to change to jp</p>
      <div>
        {/* Can be nested */}
        <LanguageSwitcher />
      </div>
    </LanguageContext.Provider>
  );
};

export default App;