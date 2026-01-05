import type { Topic } from '../content/topics'

type TopicSidebarProps = {
  topics: Topic[]
  activeTopicId: string
  readTopicIds: string[]
  completedTopicIds: string[]
  onSelectTopic: (topicId: string) => void
}

export function TopicSidebar(props: TopicSidebarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {props.topics.map((t, idx) => {
          const isActive = t.id === props.activeTopicId
          const isRead = props.readTopicIds.includes(t.id)
          const isDone = props.completedTopicIds.includes(t.id)
          return (
            <button
              key={t.id}
              className={isActive ? 'btn btnPrimary topicBtn' : 'btn topicBtn'}
              onClick={() => props.onSelectTopic(t.id)}
              style={{
                textAlign: 'left',
                opacity: isActive ? 1 : 0.8,
              }}
              title={t.summary}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ fontWeight: 800 }}>
                  {idx + 1}. {t.title}
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', opacity: 0.85 }}>
                  {isDone ? (
                    <span className="badge badge--done">done</span>
                  ) : isRead ? (
                    <span className="badge badge--read">read</span>
                  ) : (
                    <span className="badge badge--locked">new</span>
                  )}
                </div>
              </div>
              <div style={{ marginTop: 4, fontSize: 12, opacity: 0.7 }}>{t.summary}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}


