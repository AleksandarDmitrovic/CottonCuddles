import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./App.module.css";
import { Button } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <StyledEngineProvider injectFirst>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className={styles.logo} alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img
              src={reactLogo}
              className={styles.logoReact}
              alt="React logo"
            />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className={styles.card}>
          <Button
            className={styles.btn}
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </Button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className={styles.readTheDocs}>
          Click on the Vite and React logos to learn more
        </p>
      </StyledEngineProvider>
    </>
  );
}

export default App;
