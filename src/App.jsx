import { useState, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const copyText = ()=>{
    let newText = document.getElementById('passInput');
    newText.select();
    navigator.clipboard.writeText(newText.value);
  }

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(()=> {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])  

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 h-15 text-orange-500 bg-blue-900">
        <div className="flex shadow rounded-lg overflow-hidden mb-4 px-4 py-4">
          <input
            type="text"
            value={password}
            id="passInput"
            className="outline-none w-full py-1 px-3 rounded-lg"
            placeholder="password"
            readOnly
          />
          <button className="sdf px-3 bg-blue-700 rounded-lg mx-2" onClick={copyText}>COPY</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex text-sm gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Lentgth: {length}</label>
          </div>

          <div className="flex text-sm gap-x-1">
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() =>{
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex text-sm gap-x-1">
            <input type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() =>{
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
