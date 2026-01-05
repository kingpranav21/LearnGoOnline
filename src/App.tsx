import './App.css'
import { useEffect, useMemo, useState } from 'react'
import { AssignmentPanel } from './components/AssignmentPanel'
import { CodeExplainer } from './components/CodeExplainer'
import { TopicSidebar } from './components/TopicSidebar'
import { TOPICS } from './content/topics'
import { loadProgress, markTopicCompleted, markTopicRead, resetProgress, saveProgress, type Progress } from './state/progress'

function App() {
  // TODO: replace these with your real links (or wire from env vars)
  const GITHUB_URL = 'https://github.com/kingpranav21'
  const BUY_ME_A_COFFEE_URL = 'https://buymeacoffee.com/pranavvahuc'

  const [progress, setProgress] = useState<Progress>(() => loadProgress())
  const [activeTopicId, setActiveTopicId] = useState<string>(() => progress.lastTopicId || TOPICS[0]?.id)

  const completedCount = progress.completedTopicIds.length
  const totalCount = TOPICS.length
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const activeTopicIndex = useMemo(() => {
    const idx = TOPICS.findIndex((t) => t.id === activeTopicId)
    return idx >= 0 ? idx : 0
  }, [activeTopicId])

  const activeTopic = TOPICS[activeTopicIndex] ?? TOPICS[0]

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  return (
    <div className="app">
      <header className="topBar">
        <div className="brand">
          <div className="brandTitle">Learn Go Online — by pcodes</div>
          <div className="brandSubtitle">Pick a topic, read line-by-line explanations, then complete the assignment.</div>
        </div>
        <div className="topRight">
          <div className="progressPill" title="Overall progress">
            <span className="kbd">{completedCount}/{totalCount} done</span>
            <div className="progressBar" style={{ ['--progressPct' as never]: `${progressPct}%` }}>
              <div className="progressFill" />
            </div>
          </div>
          <a className="btn" href={GITHUB_URL} target="_blank" rel="noreferrer" title="View the source on GitHub">
            GitHub
          </a>
          <a
            className="btn btnPrimary"
            href={BUY_ME_A_COFFEE_URL}
            target="_blank"
            rel="noreferrer"
            title="Support the project"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M12 21s-7-4.7-9.6-8.6C.4 9.4 2.2 6 5.8 6c2 0 3.3 1.2 4.2 2.4C10.9 7.2 12.2 6 14.2 6c3.6 0 5.4 3.4 3.4 6.4C19 16.3 12 21 12 21z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            Buy me a coffee
          </a>
          <button
            className="btn"
            onClick={() => {
              resetProgress()
              const next = loadProgress()
              setProgress(next)
              setActiveTopicId(TOPICS[0]?.id)
            }}
          >
            Reset Progress
          </button>
        </div>
      </header>

      <main className="main">
        <section className="panel">
          <div className="panelInner">
            <div className="panelHeader">
              <div className="panelTitle">Topics</div>
            </div>
            <div className="panelBody">
              <TopicSidebar
                topics={TOPICS}
                activeTopicId={activeTopic.id}
                readTopicIds={progress.readTopicIds}
                completedTopicIds={progress.completedTopicIds}
                onSelectTopic={(topicId) => {
                  setActiveTopicId(topicId)
                  setProgress((p) => ({ ...p, lastTopicId: topicId }))
                }}
              />
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panelInner">
            <div className="panelHeader">
              <div className="panelTitle">Code walkthrough</div>
            </div>
            <div className="panelBody">
              <CodeExplainer
                key={activeTopic.id}
                topic={activeTopic}
                isRead={progress.readTopicIds.includes(activeTopic.id)}
                onFinishedReading={() => {
                  setProgress((p) => markTopicRead(p, activeTopic.id))
                }}
              />
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panelInner">
            <div className="panelHeader">
              <div className="panelTitle">Assignment</div>
            </div>
            <div className="panelBody">
              <AssignmentPanel
                topic={activeTopic}
                isUnlocked={progress.readTopicIds.includes(activeTopic.id)}
                isCompleted={progress.completedTopicIds.includes(activeTopic.id)}
                onMarkCompleted={() => setProgress((p) => markTopicCompleted(p, activeTopic.id))}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
