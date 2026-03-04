import { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function App() {
  const [idea, setIdea] = useState("");
  const [budget, setBudget] = useState(10);
  const [teamSize, setTeamSize] = useState(5);
  const [timeline, setTimeline] = useState(12);

  const [result, setResult] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [closestStartup, setClosestStartup] = useState(null);
  const [shap, setShap] = useState(null);
  const [report, setReport] = useState("");
  const [topShap, setTopShap] = useState([]);
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState("single");

  const [ideaA, setIdeaA] = useState("");
  const [ideaB, setIdeaB] = useState("");

  const [budgetA, setBudgetA] = useState(10);
  const [teamA, setTeamA] = useState(5);
  const [timelineA, setTimelineA] = useState(12);

  const [budgetB, setBudgetB] = useState(10);
  const [teamB, setTeamB] = useState(5);
  const [timelineB, setTimelineB] = useState(12);

  const [probA, setProbA] = useState(null);
  const [probB, setProbB] = useState(null);

  const [compareReport, setCompareReport] = useState("");

  const [shapA, setShapA] = useState(null);
  const [shapB, setShapB] = useState(null);

  const analyzeStartup = async (ideaText, b, t, time) => {
    if (loading) return;
    if (!ideaText) {
      alert("Please describe your startup idea");
      return;
    }

    setLoading(true);

    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idea: ideaText,
        budget: Number(b),
        team_size: Number(t),
        timeline: Number(time),
      }),
    });

    const data = await response.json();

    setResult(data.success_probability);
    setSimilar(data.similar_startups);
    setClosestStartup(data.closest_startup);
    setShap(data.structured_shap);
    setReport(data.ai_report);
    setTopShap(data.top_shap);
    setLoading(false);
  };

  const compareStartups = async () => {
    const response = await fetch("http://127.0.0.1:8000/compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idea_a: ideaA,
        budget_a: budgetA,
        team_a: teamA,
        timeline_a: timelineA,

        idea_b: ideaB,
        budget_b: budgetB,
        team_b: teamB,
        timeline_b: timelineB,
      }),
    });

    const data = await response.json();

    setProbA(data.prob_a);
    setProbB(data.prob_b);
    setShapA(data.shap_a);
    setShapB(data.shap_b);
    setCompareReport(data.report);
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Dynamic moving background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 animate-gradient-shift"></div>

        {/* Moving orbs with parallax */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>

        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"
          style={{
            transform: `translate(${mousePosition.x * -0.04}px, ${mousePosition.y * -0.04}px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>

        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"
          style={{
            transform: `translate(${mousePosition.x * 0.06}px, ${mousePosition.y * 0.06}px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>

        <div
          className="absolute top-2/3 left-1/3 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-6000"
          style={{
            transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5 animate-grid-float">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.3)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Light rays effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 left-1/4 w-1 h-1/2 bg-gradient-to-b from-cyan-500 to-transparent opacity-10 blur-lg animate-pulse"
            style={{
              transform: `translateX(${mousePosition.x * 0.02}px)`,
              transition: "transform 0.3s ease-out",
            }}
          ></div>
          <div
            className="absolute top-0 right-1/4 w-1 h-1/2 bg-gradient-to-b from-indigo-500 to-transparent opacity-10 blur-lg animate-pulse"
            style={{
              transform: `translateX(${mousePosition.x * -0.02}px)`,
              transition: "transform 0.3s ease-out",
            }}
          ></div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=IBM+Plex+Mono:wght@500&display=swap');

        * {
          font-family: 'Sora', sans-serif;
        }

        .monospace {
          font-family: 'IBM Plex Mono', monospace;
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 0%;
          }
          25% {
            background-position: 100% 100%;
          }
          50% {
            background-position: 0% 100%;
          }
          75% {
            background-position: 100% 0%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes grid-float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.2); }
          50% { box-shadow: 0 0 40px rgba(34, 211, 238, 0.4); }
        }

        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 15s ease infinite;
          background-size: 400% 400%;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-grid-float {
          animation: grid-float 8s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }

        .animate-slide-up {
          animation: slideInUp 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slideInDown 0.5s ease-out;
        }

        .animate-fade {
          animation: fadeIn 0.8s ease-out;
        }

        .glow-effect {
          animation: glow 3s ease-in-out infinite;
        }

        .pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }

        .glass-effect {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
        }

        .gradient-text {
          background: linear-gradient(135deg, #06b6d4 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        input:focus, textarea:focus {
          outline: none;
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
          border-color: rgba(34, 211, 238, 0.5);
        }

        .button-primary {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .button-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .button-primary:hover::before {
          width: 300px;
          height: 300px;
        }

        .button-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(34, 211, 238, 0.2);
        }

        .button-primary:active {
          transform: translateY(0);
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(34, 211, 238, 0.15);
        }

        .input-field {
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .grid-cols-3 {
            grid-template-columns: 1fr;
          }

          .flex-col-mobile {
            flex-direction: column;
          }
        }
      `}</style>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        {/* Header */}
        <div className="animate-slide-down w-full max-w-4xl text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="gradient-text">AI Startup</span>
            <br />
            <span className="text-white">Intelligence Engine</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Harness AI to analyze startup success potential with advanced
            insights and strategic recommendations
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="animate-fade mb-8 sm:mb-10">
          <div className="glass-effect rounded-full p-1.5 sm:p-2 flex gap-2 sm:gap-3">
            <button
              onClick={() => {
                setMode("single");
                setProbA(null);
                setProbB(null);
              }}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 button-primary ${
                mode === "single"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Single Analysis
            </button>
            <button
              onClick={() => {
                setMode("compare");
                setResult(null);
              }}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 button-primary ${
                mode === "compare"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Compare Startups
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full max-w-4xl space-y-6 sm:space-y-8">
          {mode === "single" && (
            <div className="animate-slide-up space-y-4 sm:space-y-6">
              {/* Idea Textarea */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <textarea
                  placeholder="Describe your startup idea..."
                  className="relative w-full p-4 sm:p-6 rounded-lg glass-effect text-white text-sm sm:text-base placeholder-slate-500 resize-none h-28 sm:h-32 input-field"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                />
              </div>

              {/* Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  {
                    label: "Budget (lakhs)",
                    value: budget,
                    setter: setBudget,
                    icon: "💰",
                  },
                  {
                    label: "Team Size",
                    value: teamSize,
                    setter: setTeamSize,
                    icon: "👥",
                  },
                  {
                    label: "Timeline (months)",
                    value: timeline,
                    setter: setTimeline,
                    icon: "⏱️",
                  },
                ].map((field, idx) => (
                  <div
                    key={idx}
                    className="relative group animate-fade"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-lg blur opacity-10 group-hover:opacity-25 transition duration-300"></div>
                    <div className="relative flex flex-col">
                      <label className="text-xs sm:text-sm font-semibold text-cyan-400 mb-2 block">
                        {field.icon} {field.label}
                      </label>
                      <input
                        type="number"
                        className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg glass-effect text-white text-sm sm:text-base placeholder-slate-500 input-field"
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => analyzeStartup(idea, budget, teamSize, timeline)}
                className="w-full button-primary py-3 sm:py-4 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 font-bold text-base sm:text-lg"
              >
                Analyze Startup
              </button>

              {/* Loading State */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 border-r-indigo-500 animate-spin"></div>
                  </div>
                  <p className="mt-4 sm:mt-6 text-slate-400 text-sm sm:text-base animate-pulse">
                    🤖 AI analyzing startup potential...
                  </p>
                </div>
              )}

              {/* Results Section */}
              {!loading && result !== null && (
                <div className="space-y-6 sm:space-y-8 animate-slide-up">
                  {/* Success Gauge */}
                  <div className="glass-effect p-6 sm:p-8 rounded-xl card-hover">
                    <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-center">
                      <span className="gradient-text">
                        🚀 Success Probability
                      </span>
                    </h2>
                    <div className="flex justify-center overflow-x-auto">
                      <Plot
                        data={[
                          {
                            type: "indicator",
                            mode: "gauge+number",
                            value: result,
                            title: { text: "AI Success Score" },
                            gauge: {
                              axis: { range: [0, 100] },
                              bar: {
                                color:
                                  result > 70
                                    ? "#06b6d4"
                                    : result > 40
                                      ? "#f59e0b"
                                      : "#ef4444",
                              },
                              threshold: {
                                line: { color: "rgba(100,100,100,0.3)" },
                                thickness: 4,
                                value: 50,
                              },
                            },
                          },
                        ]}
                        layout={{
                          width: Math.min(450, window.innerWidth - 48),
                          height: 350,
                          paper_bgcolor: "rgba(0,0,0,0)",
                          plot_bgcolor: "rgba(0,0,0,0)",
                          font: {
                            color: "white",
                            family: "'Sora', sans-serif",
                          },
                          margin: { t: 50, b: 40, l: 50, r: 50 },
                        }}
                      />
                    </div>
                  </div>

                  {/* Closest Startup */}
                  {closestStartup && (
                    <div className="glass-effect p-6 sm:p-8 rounded-xl card-hover border-l-4 border-cyan-500">
                      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                        <span className="gradient-text">
                          🧠 Closest Successful Startup
                        </span>
                      </h2>
                      <div className="space-y-3">
                        <p className="text-lg sm:text-xl font-semibold text-white">
                          {closestStartup.name}
                        </p>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                          {closestStartup.description}
                        </p>
                        <div className="inline-block mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30">
                          <p className="text-cyan-300 font-semibold text-sm">
                            ✨ Similarity: {closestStartup.score}%{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Similar Startups */}
                  {similar.length > 0 && (
                    <div className="glass-effect p-6 sm:p-8 rounded-xl card-hover">
                      <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
                        <span className="gradient-text">
                          🏢 Similar Successful Startups
                        </span>
                      </h2>
                      <div className="space-y-3 sm:space-y-4">
                        {similar.map((s, i) => (
                          <div
                            key={i}
                            className="group flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 rounded-lg bg-slate-900/30 hover:bg-slate-800/50 transition-all border border-slate-700/30 hover:border-cyan-500/30"
                            style={{ animationDelay: `${i * 50}ms` }}
                          >
                            <span className="font-semibold text-white text-sm sm:text-base">
                              {s.name}
                            </span>
                            <span className="text-cyan-400 font-mono text-sm mt-2 sm:mt-0">
                              Score: {s.score.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SHAP Top Features */}
                  {topShap.length > 0 && (
                    <div className="glass-effect p-6 sm:p-8 rounded-xl card-hover">
                      <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
                        <span className="gradient-text">
                          📊 Model Feature Impact (SHAP)
                        </span>
                      </h2>
                      <div className="overflow-x-auto">
                        <Plot
                          data={[
                            {
                              type: "bar",
                              x: topShap.map((f) => f.value),
                              y: topShap.map((f) => f.feature),
                              orientation: "h",
                              marker: {
                                color: topShap.map(
                                  (_, i) =>
                                    `rgba(34, 211, 238, ${0.4 + i * 0.2})`,
                                ),
                              },
                            },
                          ]}
                          layout={{
                            paper_bgcolor: "rgba(0,0,0,0)",
                            plot_bgcolor: "rgba(0,0,0,0)",
                            font: {
                              color: "white",
                              family: "'Sora', sans-serif",
                            },
                            margin: { t: 20, b: 20, l: 150, r: 40 },
                            width: Math.min(600, window.innerWidth - 48),
                            height: 300,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Structured Feature Impact */}
                  {shap && (
                    <div className="glass-effect p-6 sm:p-8 rounded-xl card-hover">
                      <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
                        <span className="gradient-text">
                          📊 Structured Feature Impact
                        </span>
                      </h2>
                      <div className="overflow-x-auto">
                        <Plot
                          data={[
                            {
                              type: "bar",
                              x: ["Budget", "Team Size", "Timeline"],
                              y: [shap.budget, shap.team_size, shap.timeline],
                              marker: {
                                color: ["#06b6d4", "#a78bfa", "#f59e0b"],
                              },
                            },
                          ]}
                          layout={{
                            paper_bgcolor: "rgba(0,0,0,0)",
                            plot_bgcolor: "rgba(0,0,0,0)",
                            font: {
                              color: "white",
                              family: "'Sora', sans-serif",
                            },
                            margin: { t: 20, b: 40, l: 60, r: 40 },
                            width: Math.min(600, window.innerWidth - 48),
                            height: 300,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* AI Report */}
                  {report && (
                    <div className="glass-effect p-6 sm:p-8 rounded-xl card-hover border-l-4 border-amber-500">
                      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                        <span className="gradient-text">
                          🧠 AI Strategic Report
                        </span>
                      </h2>
                      <div
                        className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                          __html: report
                            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                            .replace(/\n/g, "<br/>"),
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Compare Mode */}
          {mode === "compare" && (
            <div className="animate-slide-up space-y-6 sm:space-y-8">
              {/* Startup A */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600"></div>
                  <h2 className="text-xl sm:text-2xl font-bold gradient-text">
                    Startup A
                  </h2>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <textarea
                    placeholder="Describe Startup A..."
                    value={ideaA}
                    onChange={(e) => setIdeaA(e.target.value)}
                    className="relative w-full p-4 sm:p-6 rounded-lg glass-effect text-white text-sm sm:text-base placeholder-slate-500 resize-none h-24 sm:h-28 input-field"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { label: "Budget", value: budgetA, setter: setBudgetA },
                    { label: "Team Size", value: teamA, setter: setTeamA },
                    {
                      label: "Timeline",
                      value: timelineA,
                      setter: setTimelineA,
                    },
                  ].map((field, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-10 group-hover:opacity-25 transition duration-300"></div>
                      <div className="relative">
                        <label className="text-xs sm:text-sm font-semibold text-cyan-400 mb-2 block">
                          {field.label}
                        </label>
                        <input
                          type="number"
                          value={field.value}
                          onChange={(e) => field.setter(e.target.value)}
                          className="w-full px-4 sm:px-5 py-3 rounded-lg glass-effect text-white text-sm sm:text-base input-field"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Startup B */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-600"></div>
                  <h2 className="text-xl sm:text-2xl font-bold gradient-text">
                    Startup B
                  </h2>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <textarea
                    placeholder="Describe Startup B..."
                    value={ideaB}
                    onChange={(e) => setIdeaB(e.target.value)}
                    className="relative w-full p-4 sm:p-6 rounded-lg glass-effect text-white text-sm sm:text-base placeholder-slate-500 resize-none h-24 sm:h-28 input-field"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { label: "Budget", value: budgetB, setter: setBudgetB },
                    { label: "Team Size", value: teamB, setter: setTeamB },
                    {
                      label: "Timeline",
                      value: timelineB,
                      setter: setTimelineB,
                    },
                  ].map((field, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg blur opacity-10 group-hover:opacity-25 transition duration-300"></div>
                      <div className="relative">
                        <label className="text-xs sm:text-sm font-semibold text-amber-400 mb-2 block">
                          {field.label}
                        </label>
                        <input
                          type="number"
                          value={field.value}
                          onChange={(e) => field.setter(e.target.value)}
                          className="w-full px-4 sm:px-5 py-3 rounded-lg glass-effect text-white text-sm sm:text-base input-field"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compare Button */}
              <button
                onClick={compareStartups}
                className="w-full button-primary py-3 sm:py-4 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/30 font-bold text-base sm:text-lg transition-all duration-300 relative"
              >
                <span className="relative z-10">⚡ Compare Startups</span>
              </button>

              {/* Comparison Results */}
              {probA !== null && probB !== null && (
                <div className="space-y-6 sm:space-y-8 animate-slide-up">
                  <div className="glass-effect p-6 sm:p-8 rounded-xl card-hover">
                    <h2 className="text-lg sm:text-2xl font-bold mb-8 gradient-text">
                      Comparison Results
                    </h2>

                    {/* Success Probability Bars */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <p className="text-cyan-400 font-semibold text-sm">
                          Startup A
                        </p>
                        <div className="relative h-12 bg-slate-800 rounded-lg overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg transition-all duration-500"
                            style={{ width: `${probA}%` }}
                          ></div>
                          <span className="relative z-10 flex items-center justify-center h-full font-bold text-white">
                            {probA}%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-amber-400 font-semibold text-sm">
                          Startup B
                        </p>
                        <div className="relative h-12 bg-slate-800 rounded-lg overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg transition-all duration-500"
                            style={{ width: `${probB}%` }}
                          ></div>
                          <span className="relative z-10 flex items-center justify-center h-full font-bold text-white">
                            {probB}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Comparison Chart */}
                    <div className="mb-8 overflow-x-auto">
                      <Plot
                        data={[
                          {
                            type: "bar",
                            x: ["Startup A", "Startup B"],
                            y: [probA, probB],
                            marker: {
                              color: ["#06b6d4", "#f59e0b"],
                            },
                          },
                        ]}
                        layout={{
                          paper_bgcolor: "rgba(0,0,0,0)",
                          plot_bgcolor: "rgba(0,0,0,0)",
                          font: {
                            color: "white",
                            family: "'Sora', sans-serif",
                          },
                          margin: { t: 20, b: 40, l: 60, r: 40 },
                          width: Math.min(600, window.innerWidth - 48),
                          height: 300,
                        }}
                      />
                    </div>

                    {/* Feature Comparison */}
                    {shapA && shapB && (
                      <div className="mt-8 overflow-x-auto">
                        <h3 className="text-base sm:text-lg font-bold mb-6 gradient-text">
                          📊 Feature Impact Comparison
                        </h3>
                        <Plot
                          data={[
                            {
                              type: "bar",
                              x: ["Budget", "Team Size", "Timeline"],
                              y: [
                                shapA.budget,
                                shapA.team_size,
                                shapA.timeline,
                              ],
                              name: "Startup A",
                              marker: { color: "#06b6d4" },
                            },
                            {
                              type: "bar",
                              x: ["Budget", "Team Size", "Timeline"],
                              y: [
                                shapB.budget,
                                shapB.team_size,
                                shapB.timeline,
                              ],
                              name: "Startup B",
                              marker: { color: "#f59e0b" },
                            },
                          ]}
                          layout={{
                            barmode: "group",
                            paper_bgcolor: "rgba(0,0,0,0)",
                            plot_bgcolor: "rgba(0,0,0,0)",
                            font: {
                              color: "white",
                              family: "'Sora', sans-serif",
                            },
                            margin: { t: 20, b: 40, l: 60, r: 40 },
                            width: Math.min(700, window.innerWidth - 48),
                            height: 350,
                            legend: { x: 0.7, y: 1 },
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Comparison Report */}
                  {compareReport && (
                    <div className="glass-effect p-6 sm:p-8 rounded-xl card-hover border-l-4 border-indigo-500">
                      <h2 className="text-lg sm:text-xl font-bold mb-6 gradient-text">
                        📋 Detailed Comparison Report
                      </h2>
                      <div className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap monospace">
                        {compareReport}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 sm:mt-20 pt-8 border-t border-slate-700/30 text-center text-slate-500 text-xs sm:text-sm">
          <p>
            Powered by Advanced AI Analytics • Real-time Startup Intelligence
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
