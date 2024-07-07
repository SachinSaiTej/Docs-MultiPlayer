import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import TextEditor from "./components/TextEditor";
import { v4 as uuidV4 } from "uuid";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} />} />
        <Route path="/documents/:id" element={<TextEditor />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
      {/* <Switch>
        <Route path="/" exact>
          <Redirect to={`/documents/${uuidV4()}`} />
        </Route>
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
      </Switch> */}
      {/* <Routes>
        <Route path="/"> 
          <Redirect></Redirect>
        </Route>
        <Route
          path="/document/:id"
          element={
            <>
              <h1>Docs-MultiPlayer</h1>
              <TextEditor />
            </>
          }
        ></Route>
      </Routes> */}
      {/* <h1>Docs-MultiPlayer</h1>
      <TextEditor /> */}
    </BrowserRouter>
  );
}

export default App;
