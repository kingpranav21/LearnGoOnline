const STORAGE_KEY = 'gamecode.progress.v2'

export type Progress = {
  lastTopicId: string
  readTopicIds: string[]
  completedTopicIds: string[]
}

export function getDefaultProgress(): Progress {
  return {
    lastTopicId: '',
    readTopicIds: [],
    completedTopicIds: [],
  }
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultProgress()
    const parsed = JSON.parse(raw) as Progress
    if (!parsed || typeof parsed !== 'object') return getDefaultProgress()
    return {
      lastTopicId: typeof parsed.lastTopicId === 'string' ? parsed.lastTopicId : '',
      readTopicIds: Array.isArray(parsed.readTopicIds) ? parsed.readTopicIds : [],
      completedTopicIds: Array.isArray(parsed.completedTopicIds) ? parsed.completedTopicIds : [],
    }
  } catch {
    return getDefaultProgress()
  }
}

export function saveProgress(progress: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function markTopicRead(progress: Progress, topicId: string): Progress {
  if (progress.readTopicIds.includes(topicId)) return progress
  return { ...progress, readTopicIds: [...progress.readTopicIds, topicId] }
}

export function markTopicCompleted(progress: Progress, topicId: string): Progress {
  if (progress.completedTopicIds.includes(topicId)) return progress
  return { ...progress, completedTopicIds: [...progress.completedTopicIds, topicId] }
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
}
