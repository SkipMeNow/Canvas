import { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "./context/themeContext";
import { Sidemenu } from "./components/sidemenu/sidemenu";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="app-grid">
      <header className="topbar">
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "dark" : "light"} mode
        </button>
      </header>
      <PanelGroup
        direction="horizontal"
        autoSaveId="Panel"
        style={{ width: "calc(100vw - 15px)", height: "100vh" }}
      >
        <Panel defaultSize={20} minSize={15} maxSize={30}>
          <Sidemenu />
        </Panel>
        <PanelResizeHandle className="resizableHandle" />
        <Panel>
          <p>Welcome to your dashboard. Scroll to see layout in action.</p>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default App;

//  <div className="app-grid">
//       <header className="topbar">
//         <button onClick={toggleTheme}>
//           Switch to {theme === "light" ? "dark" : "light"} mode
//         </button>
//       </header>
//       <aside className="sidebar">
//         <Sidemenu />
//       </aside>
//       <main className="main-content">
//         <p>Welcome to your dashboard. Scroll to see layout in action.</p>
//       </main>
//     </div>
