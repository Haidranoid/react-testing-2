import ColorButton from "./components/color-button/ColorButton.tsx";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <a
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <br/>
                <ColorButton/>
            </header>
        </div>
    );
}

export default App;
