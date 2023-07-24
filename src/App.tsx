import NavBar from "./NavBar/NavBar";
import Chess from "./ChineseChess/ChineseChess";
import "./App.css";

function App() {
  return (
    <>
      <NavBar
        scrollToAbout={() =>
          window.location.replace("https://mingyuanc.github.io")
        }
        scrollToProjects={() =>
          window.location.replace("https://codefrontend.github.io")
        }
        scrollToExps={() =>
          window.location.replace("https://codefrontend.github.io")
        }
        scrollToSkills={() =>
          window.location.replace("https://codefrontend.github.io")
        }
        scrollToContact={() =>
          window.location.replace("https://codefrontend.github.io")
        }
      />
      <Chess />
    </>
  );
}
export default App;
