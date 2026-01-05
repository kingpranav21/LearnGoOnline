type CatalogItem = {
  title: string
  slug: string
}

function titleToSlug(title: string) {
  // Best-effort: match Go by Example URL naming (lowercase, hyphen-separated).
  // Examples: "If/Else" -> "if-else", "Exec'ing Processes" -> "exec-ing-processes"
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const TITLES = [
  'Hello World',
  'Values',
  'Variables',
  'Constants',
  'For',
  'If/Else',
  'Switch',
  'Arrays',
  'Slices',
  'Maps',
  'Functions',
  'Multiple Return Values',
  'Variadic Functions',
  'Closures',
  'Recursion',
  'Range over Built-in Types',
  'Pointers',
  'Strings and Runes',
  'Structs',
  'Methods',
  'Interfaces',
  'Enums',
  'Struct Embedding',
  'Generics',
  'Range over Iterators',
  'Errors',
  'Custom Errors',
  'Goroutines',
  'Channels',
  'Channel Buffering',
  'Channel Synchronization',
  'Channel Directions',
  'Select',
  'Timeouts',
  'Non-Blocking Channel Operations',
  'Closing Channels',
  'Range over Channels',
  'Timers',
  'Tickers',
  'Worker Pools',
  'WaitGroups',
  'Rate Limiting',
  'Atomic Counters',
  'Mutexes',
  'Stateful Goroutines',
  'Sorting',
  'Sorting by Functions',
  'Panic',
  'Defer',
  'Recover',
  'String Functions',
  'String Formatting',
  'Text Templates',
  'Regular Expressions',
  'JSON',
  'XML',
  'Time',
  'Epoch',
  'Time Formatting / Parsing',
  'Random Numbers',
  'Number Parsing',
  'URL Parsing',
  'SHA256 Hashes',
  'Base64 Encoding',
  'Reading Files',
  'Writing Files',
  'Line Filters',
  'File Paths',
  'Directories',
  'Temporary Files and Directories',
  'Embed Directive',
  'Testing and Benchmarking',
  'Command-Line Arguments',
  'Command-Line Flags',
  'Command-Line Subcommands',
  'Environment Variables',
  'Logging',
  'HTTP Client',
  'HTTP Server',
  'TCP Server',
  'Context',
  'Spawning Processes',
  "Exec'ing Processes",
  'Signals',
  'Exit',
]

export const GOBYEXAMPLE_CATALOG: CatalogItem[] = TITLES.map((title) => ({
  title,
  slug: titleToSlug(title),
}))


