// ProblemDetails.jsx — full coding workspace with Monaco Editor
import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { ChevronLeft, RotateCcw, Play, Send, ChevronDown, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { PROBLEMS } from '../data/problems';
import DifficultyBadge from '../components/common/DifficultyBadge';
import NotFoundState from '../components/common/NotFoundState';
import toast from 'react-hot-toast';

const LANGUAGES = ['cpp', 'java', 'python'];
const LANG_LABELS = { cpp: 'C++', java: 'Java', python: 'Python' };

const DEMO_RESULTS = {
  run: [
    { status: 'Passed', input: 'nums = [2,7,11,15], target = 9', expected: '[0,1]', output: '[0,1]', time: '48ms' },
    { status: 'Passed', input: 'nums = [3,2,4], target = 6', expected: '[1,2]', output: '[1,2]', time: '32ms' },
  ],
  submit_ac: {
    verdict: 'Accepted',
    runtime: '48 ms',
    memory: '16.4 MB',
    passed: 32,
    total: 32,
  },
  submit_wa: {
    verdict: 'Wrong Answer',
    failedCase: 'nums = [0,4,3,0], target = 0',
    expected: '[0,3]',
    got: 'null',
  },
};

export default function ProblemDetails() {
  const { id } = useParams();
  const problem = PROBLEMS.find(p => p.id === Number(id));
  if (!problem) {
    return <NotFoundState message="This problem may have been removed or the link may be incorrect." backTo="/problems" backLabel="Back to Problems" />;
  }

  return <ProblemWorkspace problem={problem} />;
}

function ProblemWorkspace({ problem }) {
  const [lang, setLang] = useState('python');
  const [code, setCode] = useState(problem.starterCode[lang]);
  const [activeLeftTab, setActiveLeftTab] = useState('description'); // description | examples
  const [activeBottomTab, setActiveBottomTab] = useState('testcases'); // testcases | console | result
  const [customInput, setCustomInput] = useState(problem.testCases[0]?.input || '');
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const handleLangChange = (l) => {
    setLang(l);
    setCode(problem.starterCode[l]);
    setLangOpen(false);
  };

  const handleReset = () => {
    setCode(problem.starterCode[lang]);
    toast('Code reset to starter template.', { icon: '↩️' });
  };

  const handleRun = async () => {
    setRunning(true);
    setActiveBottomTab('console');
    setRunResult(null);
    await new Promise(r => setTimeout(r, 1200));
    setRunResult({ type: 'run', data: DEMO_RESULTS.run });
    setActiveBottomTab('console');
    setRunning(false);
    toast.success('[Demo] Code executed on sample test cases.');
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setRunResult(null);
    setSubmitResult(null);
    await new Promise(r => setTimeout(r, 1800));
    // Randomly show AC or WA for demo variety
    const isAC = Math.random() > 0.4;
    setSubmitResult(isAC ? { type: 'ac', data: DEMO_RESULTS.submit_ac } : { type: 'wa', data: DEMO_RESULTS.submit_wa });
    setActiveBottomTab('result');
    setSubmitting(false);
    if (isAC) toast.success('[Demo] Submission Accepted! 🎉');
    else toast.error('[Demo] Wrong Answer on test case.');
  };

  const renderMarkdown = (text) => text?.replace(/`([^`]+)`/g, '<code style="background:#1a2535;padding:1px 5px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.8125rem;">$1</code>') || '';

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0B0F14', overflow: 'hidden' }}>
      {/* Top bar */}
      <div className="problem-header" style={{ height: '48px', background: '#101720', borderBottom: '1px solid #263241', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 1rem', flexShrink: 0 }}>
        <Link to="/problems" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94A3B8', textDecoration: 'none', fontSize: '0.8125rem' }}>
          <ChevronLeft size={15} /> Problems
        </Link>
        <div className="divider" style={{ width: '1px', height: '20px' }} />
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F1F5F9', flex: 1 }}>
          {problem.id}. {problem.title}
        </span>
        <DifficultyBadge difficulty={problem.difficulty} />
        <span className="problem-acceptance" style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{problem.acceptance}% acceptance</span>
      </div>

      {/* Main 3-panel layout */}
      <div className="problem-workspace" style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* LEFT: Problem description */}
        <div className="problem-description-panel" style={{ width: '420px', flexShrink: 0, borderRight: '1px solid #263241', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #263241', padding: '0 1rem', background: '#101720', flexShrink: 0 }}>
            {[['description', 'Description'], ['solutions', 'Solutions'], ['discuss', 'Discuss']].map(([tab, label]) => (
              <button key={tab} onClick={() => setActiveLeftTab(tab)} className={`tab-btn ${activeLeftTab === tab ? 'active' : ''}`}>{label}</button>
            ))}
          </div>
          <div style={{ flex: 1, overflow: 'y-auto', padding: '1.25rem', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#F1F5F9', marginBottom: '0.5rem' }}>
              {problem.id}. {problem.title}
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <DifficultyBadge difficulty={problem.difficulty} />
              {problem.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '1.25rem' }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(problem.description) }} />

            {/* Examples */}
            <div style={{ marginBottom: '1.25rem' }}>
              {problem.examples.map((ex, i) => (
                <div key={i} style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F1F5F9', marginBottom: '0.5rem' }}>Example {i + 1}:</p>
                  <div className="code-block" style={{ fontSize: '0.8125rem' }}>
                    <div><span style={{ color: '#94A3B8' }}>Input: </span><span style={{ color: '#F1F5F9' }}>{ex.input}</span></div>
                    <div><span style={{ color: '#94A3B8' }}>Output: </span><span style={{ color: '#22C55E' }}>{ex.output}</span></div>
                    {ex.explanation && <div style={{ marginTop: '0.25rem' }}><span style={{ color: '#94A3B8' }}>Explanation: </span><span style={{ color: '#F1F5F9' }}>{ex.explanation}</span></div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F1F5F9', marginBottom: '0.5rem' }}>Constraints:</p>
              <ul style={{ paddingLeft: '1.25rem' }}>
                {problem.constraints.map((c, i) => (
                  <li key={i} style={{ fontSize: '0.8125rem', color: '#94A3B8', marginBottom: '0.25rem', fontFamily: 'JetBrains Mono, monospace' }}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Input/Output format */}
            <div style={{ marginBottom: '0.75rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F1F5F9', marginBottom: '0.3rem' }}>Input Format:</p>
              <p style={{ fontSize: '0.8125rem', color: '#94A3B8', lineHeight: 1.7 }}>{problem.inputFormat}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F1F5F9', marginBottom: '0.3rem' }}>Output Format:</p>
              <p style={{ fontSize: '0.8125rem', color: '#94A3B8', lineHeight: 1.7 }}>{problem.outputFormat}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Editor + console */}
        <div className="problem-editor-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Editor toolbar */}
          <div className="problem-editor-toolbar" style={{ height: '44px', background: '#101720', borderBottom: '1px solid #263241', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1rem', flexShrink: 0 }}>
            {/* Language selector */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setLangOpen(!langOpen)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.75rem', background: '#151E29', border: '1px solid #263241', borderRadius: '5px', color: '#F1F5F9', cursor: 'pointer', fontSize: '0.8125rem' }}>
                {LANG_LABELS[lang]} <ChevronDown size={12} color="#94A3B8" />
              </button>
              {langOpen && (
                <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '4px', background: '#151E29', border: '1px solid #263241', borderRadius: '6px', zIndex: 50, overflow: 'hidden', minWidth: '110px' }}>
                  {LANGUAGES.map(l => (
                    <button key={l} onClick={() => handleLangChange(l)}
                      style={{ display: 'block', width: '100%', padding: '0.5rem 0.75rem', textAlign: 'left', background: l === lang ? 'rgba(56,189,248,0.1)' : 'none', color: l === lang ? '#38BDF8' : '#94A3B8', fontSize: '0.8125rem', cursor: 'pointer', border: 'none' }}>
                      {LANG_LABELS[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div style={{ flex: 1 }} />
            <button onClick={handleReset} className="btn-secondary btn-sm" title="Reset code">
              <RotateCcw size={13} /> Reset
            </button>
            <button onClick={handleRun} disabled={running} className="btn-secondary btn-sm" style={{ borderColor: '#38BDF8', color: '#38BDF8' }}>
              <Play size={13} /> {running ? 'Running…' : 'Run'}
            </button>
            <button onClick={handleSubmit} disabled={submitting} className="btn-success btn-sm">
              <Send size={13} /> {submitting ? 'Submitting…' : 'Submit'}
            </button>
          </div>

          {/* Monaco Editor */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Editor
              height="100%"
              language={lang === 'cpp' ? 'cpp' : lang}
              value={code}
              onChange={val => setCode(val || '')}
              theme="vs-dark"
              options={{
                fontSize: 13,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: false },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                tabSize: 4,
                automaticLayout: true,
                padding: { top: 12, bottom: 12 },
                renderLineHighlight: 'line',
                smoothScrolling: true,
              }}
            />
          </div>

          {/* Bottom panel */}
          <div className="problem-bottom-panel" style={{ height: '240px', borderTop: '1px solid #263241', display: 'flex', flexDirection: 'column', flexShrink: 0, background: '#101720' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #263241', padding: '0 1rem', flexShrink: 0 }}>
              {[['testcases', 'Test Cases'], ['console', 'Console'], ['result', 'Result']].map(([tab, label]) => (
                <button key={tab} onClick={() => setActiveBottomTab(tab)} className={`tab-btn ${activeBottomTab === tab ? 'active' : ''}`}>{label}</button>
              ))}
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '0.75rem 1rem' }}>
              {activeBottomTab === 'testcases' && (
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.5rem' }}>Custom Input</p>
                  <textarea value={customInput} onChange={e => setCustomInput(e.target.value)}
                    className="input-field font-mono" style={{ height: '120px', resize: 'vertical', fontSize: '0.8125rem' }}
                    placeholder="Enter test input here…" />
                </div>
              )}
              {activeBottomTab === 'console' && (
                <div>
                  {running && <div style={{ color: '#94A3B8', fontSize: '0.8125rem' }} className="pulse-soft">Running code…</div>}
                  {runResult ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <p style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                        ⚠️ This is a frontend demo — no real code execution occurs.
                      </p>
                      {runResult.data.map((r, i) => (
                        <div key={i} style={{ padding: '0.6rem', background: '#0B0F14', border: `1px solid ${r.status === 'Passed' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                            {r.status === 'Passed' ? <CheckCircle2 size={12} color="#22C55E" /> : <XCircle size={12} color="#EF4444" />}
                            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: r.status === 'Passed' ? '#22C55E' : '#EF4444' }}>{r.status}</span>
                            <Clock size={10} color="#94A3B8" style={{ marginLeft: 'auto' }} />
                            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{r.time}</span>
                          </div>
                          <div className="code-block" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>
                            Input: {r.input}{'\n'}Expected: {r.expected}{'\n'}Output: {r.output}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : !running && <div style={{ color: '#4a5568', fontSize: '0.8125rem' }}>Click "Run" to execute your code on sample test cases.</div>}
                </div>
              )}
              {activeBottomTab === 'result' && (
                <div>
                  {submitting && <div style={{ color: '#94A3B8', fontSize: '0.8125rem' }} className="pulse-soft">Evaluating submission…</div>}
                  {submitResult ? (
                    <div>
                      <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.6rem' }}>
                        ⚠️ Frontend demo — submission is simulated, not sent to a real judge.
                      </p>
                      {submitResult.type === 'ac' ? (
                        <div style={{ padding: '1rem', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <CheckCircle2 size={18} color="#22C55E" />
                            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#22C55E' }}>Accepted</span>
                          </div>
                          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8125rem', color: '#94A3B8' }}>
                            <span>Test cases: <strong style={{ color: '#22C55E' }}>{submitResult.data.passed}/{submitResult.data.total}</strong></span>
                            <span>Runtime: <strong style={{ color: '#F1F5F9' }}>{submitResult.data.runtime}</strong></span>
                            <span>Memory: <strong style={{ color: '#F1F5F9' }}>{submitResult.data.memory}</strong></span>
                          </div>
                        </div>
                      ) : (
                        <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <XCircle size={18} color="#EF4444" />
                            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#EF4444' }}>Wrong Answer</span>
                          </div>
                          <div className="code-block" style={{ fontSize: '0.75rem', padding: '0.6rem' }}>
                            Failed case: {submitResult.data.failedCase}{'\n'}Expected: {submitResult.data.expected}{'\n'}Got: {submitResult.data.got}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : !submitting && <div style={{ color: '#4a5568', fontSize: '0.8125rem' }}>Click "Submit" to evaluate your solution.</div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
