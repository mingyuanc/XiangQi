import NavBar from "./NavBar/NavBar";
import Chess from "./ChineseChess/ChineseChess";
import "./App.css";

function App() {
  return (
    <>
      <NavBar
        scrollToAbout={() =>
          window.location.assign("https://mingyuanc.github.io#about")
        }
        scrollToProjects={() =>
          window.location.assign("https://mingyuanc.github.io#project")
        }
        scrollToExps={() =>
          window.location.assign("https://mingyuanc.github.io#experience")
        }
        scrollToSkills={() =>
          window.location.assign("https://mingyuanc.github.io/#skill")
        }
        scrollToContact={() =>
          window.location.assign("https://mingyuanc.github.io/#contact")
        }
      />
      <Chess />
    </>
  );
}
export default App;
