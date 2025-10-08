// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import ScrollToTop from "../components/ScrollToTop";
import { useTheme } from "../theme";
import PageWrapper from "../components/PageWrapper";
import logoDark from "../assets/profile-dark.png";
import logoLight from "../assets/profile-light.png";
import github from "../assets/githubL.png";
import linkedin from "../assets/linkedinL.png";
import tryhackme from "../assets/tryhackmeL.png";

export default function Home() {
  const { theme } = useTheme();

  // typing animation for initial whoami
  const [typedCommand, setTypedCommand] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showFinalPrompt, setShowFinalPrompt] = useState(false);

  // history: array of { command: string, output: string | string[] }
  const [history, setHistory] = useState([]); // start empty -> show typewriter
  const [currentInput, setCurrentInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const indexRef = useRef(0);
  const fullCommand = "whoami";
  const FLAG = "my_w3b_is_c00ler_th4n_u_th1nk";

  // Typewriter for initial whoami on mount
  useEffect(() => {
    const total = fullCommand.length;
    const interval = setInterval(() => {
      const i = indexRef.current;
      if (i < total) {
        setTypedCommand((s) => s + fullCommand[i]);
        indexRef.current = i + 1;
      } else {
        clearInterval(interval);
        // after finish typing, show result then open prompt
        setTimeout(() => {
          setShowResult(true);
          // push whoami result into history (single first line)
          setHistory([{ command: "whoami", output: "Watcharakorn Khambung" }]);
        }, 450);
        setTimeout(() => {
          setShowFinalPrompt(true);
          // autofocus input a bit later
          setTimeout(() => inputRef.current?.focus(), 50);
        }, 1100);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []); // run once

  // auto-scroll whenever history changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, showFinalPrompt]);

  // terminal appearance props
  const terminalProps = {
    container: theme === "dark" ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-300",
    header: theme === "dark" ? "bg-gray-700" : "bg-gray-200",
    headerText: theme === "dark" ? "text-gray-200" : "text-gray-700",
    content: theme === "dark" ? "text-gray-100" : "text-gray-900",
    promptColor: theme === "dark" ? "text-purple-500" : "text-blue-600",
    resultText: theme === "dark" ? "text-gray-300" : "text-gray-700",
  };

  // evaluate command
  const evaluate = (raw) => {
    const input = raw.trim();
    if (!input) return "";

    // echo handling
    const echoMatch = input.match(/^echo\s+(.+)$/i);
    if (echoMatch) {
      const echoText = echoMatch[1];
      if (/flag/i.test(echoText)) return FLAG;
      return echoText;
    }

    // typo "car flag.txt"
    if (/^car\s+flag\.txt$/i.test(input)) return "Did you mean: cat flag.txt ?";

    // cat flag
    if (/^cat\s+flag\.txt$/i.test(input)) return FLAG;

    // cat README.md
    if (/^cat\s+README\.md$/i.test(input)) {
      return `Hi, I'm Watcharakorn Khambung!
This is my portfolio site. I build tools, write CTF writeups, and explore cybersecurity.`;
    }

    // simple commands
    const lc = input.toLowerCase();
    if (lc === "whoami") return "Watcharakorn Khambung";
    if (lc === "pwd") return "/home/watkorn";
    if (lc === "ls") return "flag.txt  README.md";
    if (lc === "ls -la") {
      return [
        "drwxr-xr-x 2 watkorn users 4096 Oct 8 2025 .",
        "drwxr-xr-x 2 watkorn users 4096 Oct 8 2025 ..",
        "-rw-r--r-- 1 watkorn users   67 Oct 8 2025 flag.txt",
        "-rw-r--r-- 1 watkorn users  123 Oct 8 2025 README.md",
      ];
    }
    if (lc === "date") return new Date().toString();
    if (lc === "help") return "Available commands: whoami, pwd, ls, ls -la, cat README.md, cat flag.txt, date, echo, help, clear, projects, blogs";
    if (lc === "projects") return "Cybersecurity-Tools  CTF-Challenges  Web-Apps";
    if (lc === "blogs") return "CTF-Writeups  Security-Tips  Tutorials";

    // composite simple "&&" support
    if (input.includes("&&")) {
      const parts = input.split("&&").map((p) => p.trim());
      const outs = parts.map((p) => {
        const r = evaluate(p);
        return Array.isArray(r) ? r.join("\n") : r;
      });
      return outs.join("\n");
    }

    return `Command not found: ${input}`;
  };

  const submitCommand = () => {
    if (!currentInput.trim()) return;

    const cmdText = currentInput;
    // special: clear -> keep only whoami (first line)
    if (cmdText.trim().toLowerCase() === "clear") {
      // keep initial whoami line if exists; otherwise reset typed states
      setHistory([{ command: "whoami", output: "Watcharakorn Khambung" }]);
      setCurrentInput("");
      setTypedCommand(""); // don't re-run animation, but clear typed buffer
      setShowResult(true);
      setShowFinalPrompt(true);
      // focus input
      setTimeout(() => inputRef.current?.focus(), 50);
      return;
    }

    const result = evaluate(cmdText);
    setHistory((h) => [...h, { command: cmdText, output: result }]);
    setCurrentInput("");
    setTimeout(() => inputRef.current?.focus(), 20);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitCommand();
    }
  };

  return (
    <PageWrapper title="WATKORN">
      <div className="flex-1 flex justify-center bg-gray-50 dark:bg-gray-895 transition-colors duration-300">
        <div className="app-center-container max-w-4xl w-full text-gray-900 dark:text-gray-200 px-4 py-8 space-y-8">
          {/* Profile */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src={theme === "dark" ? logoDark : logoLight}
              alt="Profile"
              className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover shadow-lg transition-all duration-300"
            />
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://linkedin.com/in/watkorn" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <img src={linkedin} alt="LinkedIn" className={`w-5 h-5 ${theme === "dark" ? "filter invert" : ""}`} />
                <span className="text-gray-700 dark:text-white text-sm font-medium">LinkedIn</span>
              </a>
              <a href="https://github.com/watkorn" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <img src={github} alt="GitHub" className={`w-5 h-5 ${theme === "dark" ? "filter invert" : ""}`} />
                <span className="text-gray-700 dark:text-white text-sm font-medium">GitHub</span>
              </a>
              <a href="https://tryhackme.com/p/watkorn" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <img src={tryhackme} alt="TryHackMe" className={`w-5 h-5 ${theme === "dark" ? "filter invert" : ""}`} />
                <span className="text-gray-700 dark:text-white text-sm font-medium">TryHackMe</span>
              </a>
            </div>
          </div>

          {/* Terminal */}
          <section id="terminal" className="w-full">
            <div className={`rounded-xl shadow-lg w-full max-w-2xl mx-auto overflow-hidden ${terminalProps.container}`}>
              <div className={`px-3 py-1 flex items-center rounded-t-xl ${terminalProps.header}`}>
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className={`ml-3 text-xs font-mono ${terminalProps.headerText}`}>watkorn@me:~</span>
              </div>

              <div ref={scrollRef} className={`px-4 pt-1 pb-3 font-mono text-sm leading-relaxed ${terminalProps.content}`} style={{ maxHeight: "48vh", overflowY: "auto" }}>
                {/* if history is empty, show the typing animation block */}
                {history.length === 0 ? (
                  <div className="mb-2">
                    <div className="flex items-start">
                      <span className={`${terminalProps.promptColor} font-bold`}>watkorn@me:~$</span>
                      <span className="ml-2">{typedCommand}</span>
                    </div>
                    <div className={`ml-[1.2rem] mt-1 ${terminalProps.resultText}`} style={{ opacity: showResult ? 1 : 0 }}>
                      Watcharakorn Khambung
                    </div>
                  </div>
                ) : (
                  // render history items
                  history.map((h, i) => (
                    <div key={i} className="mb-2">
                      <div className="flex items-start">
                        {/* only show prompt text for the very top whoami line to match requirement */}
                        <span className={`${terminalProps.promptColor} font-bold`}>{i === 0 ? "watkorn@me:~$" : ""}</span>
                        <span className="ml-2 whitespace-pre-wrap">{h.command}</span>
                      </div>
                      <div className={`ml-[1.2rem] mt-1 ${terminalProps.resultText} whitespace-pre-wrap`}>
                        {Array.isArray(h.output) ? h.output.join("\n") : h.output}
                      </div>
                    </div>
                  ))
                )}

                {/* input line (always shown after initial animation) */}
                {showFinalPrompt && (
                  <div className="flex items-start mt-1">
                    <span className={`${terminalProps.promptColor} font-bold`}>watkorn@me:~$</span>
                    <input
                      ref={inputRef}
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      className={`ml-2 w-full bg-transparent outline-none font-mono text-sm ${terminalProps.content} placeholder:text-gray-400`}
                      placeholder="Type a command (try: help)"
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* About */}
          <section id="about" className="w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">About Me</h2>
            <div className="space-y-3 text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              <p>I love working on cybersecurity projects just for fun and to challenge myself.</p>
              <p>I build tools and code to try things out, learn new stuff, and solve problems I run into.</p>
              <p>It's all about experimenting, testing, and improving my skills while having fun.</p>
            </div>
          </section>

          <ScrollToTop />
        </div>

        <style>{`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s step-start infinite;
          }
          input:focus { outline: none; }
        `}</style>
      </div>
    </PageWrapper>
  );
}
