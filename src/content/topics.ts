export type Topic = {
  id: string
  title: string
  summary: string
  definition: string
  context: string
  externalUrl: string
  code?: string
  /**
   * 1-based line number -> explanation.
   * Lines without entries will show a generic "readability" note.
   */
  lineNotes?: Record<number, string>
  assignment?: {
    title: string
    prompt: string
    starterCode: string
    expectedStdout?: string
  }
  docs?: { title: string; url: string }[]
}

import { GOBYEXAMPLE_CATALOG } from './gobyexample_catalog'

function makeExternalUrl(slug: string) {
  return `https://gobyexample.com/${slug}`
}

function makeGenericDefinition(title: string) {
  return `${title} is a Go concept you’ll use frequently. This topic explains what it is and how to apply it in real programs.`
}

function makeGenericContext(title: string) {
  return `Context: learn ${title} so you can read and write idiomatic Go, and recognize common patterns in production code.`
}

export const TOPICS: Topic[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    summary: 'Your first runnable Go program: package, imports, and main().',
    definition: 'A minimal Go program that prints a line and demonstrates the required structure for an executable.',
    context: 'You’ll see this structure everywhere: package main, imports, and a main() function.',
    externalUrl: makeExternalUrl('hello-world'),
    code: `package main

import "fmt"

func main() {
  fmt.Println("Hello, Go")
}
`,
    lineNotes: {
      1: 'Every runnable program starts with package main.',
      3: 'Import packages you use. Here we import fmt for printing.',
      5: 'main() is the entry point. It runs when you execute the program.',
      6: 'fmt.Println prints values separated by spaces and ends with a newline.',
    },
    assignment: {
      title: 'Assignment: print your name',
      prompt: 'Change the program to print: Hello, <your-name>',
      starterCode: `package main

import "fmt"

func main() {
  // TODO: print hello with your name
  fmt.Println("Hello, ???")
}
`,
      expectedStdout: 'Hello, Pranav\n',
    },
    docs: [
      { title: 'A Tour of Go: Packages', url: 'https://go.dev/tour/basics/1' },
      { title: 'Package fmt', url: 'https://pkg.go.dev/fmt' },
    ],
  },
  {
    id: 'variables',
    title: 'Variables',
    summary: 'Declare and use variables, including short declaration (:=) inside functions.',
    definition: 'Variables store values; Go is statically typed and infers types in many cases.',
    context: 'You’ll use variables constantly to name intermediate results and make code readable.',
    externalUrl: makeExternalUrl('variables'),
    code: `package main

import "fmt"

func main() {
  name := "Go"
  fmt.Println("Hello", name)
}
`,
    lineNotes: {
      6: '`name := "Go"` declares a new variable and assigns it in one step.',
      7: 'Passing multiple values to Println prints them separated by spaces.',
    },
    assignment: {
      title: 'Assignment: two variables',
      prompt:
        'Create two variables: name and year. Print: Hello <name> <year> (use fmt.Println with multiple args).',
      starterCode: `package main

import "fmt"

func main() {
  // TODO: create name and year, then print them
  name := "Go"
  year := 2026
  fmt.Println("Hello", name, year)
}
`,
      expectedStdout: 'Hello Go 2026\n',
    },
    docs: [{ title: 'A Tour of Go: Variables', url: 'https://go.dev/tour/basics/10' }],
  },
  {
    id: 'for',
    title: 'For',
    summary: 'Go has one looping keyword: for.',
    definition: 'The for statement repeats a block of code. It covers classic loops, while-loops, and infinite loops.',
    context: 'Loops are foundational for iteration, processing collections, and building state machines.',
    externalUrl: makeExternalUrl('for'),
    code: `package main

import "fmt"

func main() {
  for i := 0; i < 3; i++ {
    fmt.Println(i)
  }
}
`,
    lineNotes: {
      6: 'Classic for-loop: init; condition; post.',
      7: 'This line runs once per iteration while the condition is true.',
      8: 'End of the loop block.',
    },
    assignment: {
      title: 'Assignment: print 1..5',
      prompt: 'Write a loop that prints the numbers 1 to 5 (each on a new line).',
      starterCode: `package main

import "fmt"

func main() {
  // TODO: print 1..5
}
`,
      expectedStdout: '1\n2\n3\n4\n5\n',
    },
    docs: [{ title: 'A Tour of Go: for', url: 'https://go.dev/tour/flowcontrol/1' }],
  },
  {
    id: 'values',
    title: 'Values',
    summary: 'Print and work with basic values: strings, ints, floats, booleans.',
    definition: 'A value is a piece of data (like a number or string). Go has typed values, and operators behave predictably.',
    context: 'Understanding literals and operators makes it easier to read code and debug quickly.',
    externalUrl: makeExternalUrl('values'),
    code: `package main

import "fmt"

func main() {
  fmt.Println("go" + "lang")
  fmt.Println(1 + 2)
  fmt.Println(7.0 / 2.0)
  fmt.Println(true && false)
  fmt.Println(true || false)
  fmt.Println(!true)
}
`,
    lineNotes: {
      1: 'We’re building an executable: package main.',
      3: 'fmt is the standard formatting/printing package.',
      5: 'String concatenation with +.',
      6: 'Integer arithmetic uses +, -, *, /.',
      7: 'Floating-point division keeps decimals.',
      8: 'Logical AND: both sides must be true.',
      9: 'Logical OR: either side can be true.',
      10: 'Logical NOT flips a boolean.',
    },
    assignment: {
      title: 'Assignment: compute and print',
      prompt: 'Print the result of (10-3)*2 as an integer.',
      starterCode: `package main

import "fmt"

func main() {
  // TODO: print (10-3)*2
  fmt.Println((10 - 3) * 2)
}
`,
      expectedStdout: '14\n',
    },
    docs: [{ title: 'Go by Example: Values', url: makeExternalUrl('values') }],
  },
  {
    id: 'constants',
    title: 'Constants',
    summary: 'Use const for values that never change.',
    definition: 'Constants are immutable values known at compile time (numbers, strings, booleans).',
    context: 'Use constants for configuration-like values (limits, names) to avoid “magic numbers” and accidental changes.',
    externalUrl: makeExternalUrl('constants'),
    code: `package main

import "fmt"

const Pi = 3.14159

func main() {
  const name = "gopher"
  const n = 500000000
  fmt.Println(name)
  fmt.Println(Pi)
  fmt.Println(n)
}
`,
    lineNotes: {
      3: 'A package-level constant is visible in this file.',
      5: 'Constants can also be declared inside functions.',
      6: 'This is an untyped numeric constant (it can adapt to context).',
      7: 'We print a string constant.',
      8: 'We print a float constant.',
      9: 'We print an integer constant.',
    },
    assignment: {
      title: 'Assignment: const greeting',
      prompt: 'Define a const called Greeting with value "Hi" and print it.',
      starterCode: `package main

import "fmt"

func main() {
  // TODO: define Greeting and print it
  const Greeting = "Hi"
  fmt.Println(Greeting)
}
`,
      expectedStdout: 'Hi\n',
    },
    docs: [{ title: 'Go by Example: Constants', url: makeExternalUrl('constants') }],
  },
  {
    id: 'if-else',
    title: 'If/Else',
    summary: 'Branch execution based on conditions.',
    definition: 'if/else chooses which block runs based on a boolean condition.',
    context: 'Conditionals are used everywhere: validation, branching logic, and choosing behavior based on state.',
    externalUrl: makeExternalUrl('if-else'),
    code: `package main

import "fmt"

func main() {
  x := 7
  if x%2 == 0 {
    fmt.Println("even")
  } else {
    fmt.Println("odd")
  }
}
`,
    lineNotes: {
      5: 'x is declared with short declaration := inside main().',
      6: 'Modulo (%) checks remainder; even numbers have remainder 0 when divided by 2.',
      7: 'This runs when the condition is true.',
      8: 'else runs when the condition is false.',
    },
    assignment: {
      title: 'Assignment: classify number',
      prompt: 'Set x := 10 and print "even" or "odd".',
      starterCode: `package main

import "fmt"

func main() {
  x := 10
  // TODO: print even/odd
  if x%2 == 0 {
    fmt.Println("even")
  } else {
    fmt.Println("odd")
  }
}
`,
      expectedStdout: 'even\n',
    },
    docs: [{ title: 'Go by Example: If/Else', url: makeExternalUrl('if-else') }],
  },
  {
    id: 'switch',
    title: 'Switch',
    summary: 'Select between multiple branches more cleanly than long if/else chains.',
    definition: 'switch compares a value against cases (or uses conditions) and runs the first matching case.',
    context: 'switch is great for enumerations, command routing, and state machines.',
    externalUrl: makeExternalUrl('switch'),
    code: `package main

import "fmt"

func main() {
  day := 3
  switch day {
  case 1:
    fmt.Println("Mon")
  case 2:
    fmt.Println("Tue")
  case 3:
    fmt.Println("Wed")
  default:
    fmt.Println("Other")
  }
}
`,
    lineNotes: {
      5: 'We choose a day number to switch on.',
      6: 'switch day compares day to each case.',
      7: 'case blocks do not need break (Go breaks automatically).',
      13: 'default runs when no case matches.',
    },
    assignment: {
      title: 'Assignment: switch to Fri',
      prompt: 'Set day := 5 and make the switch print "Fri" for 5, otherwise "Other".',
      starterCode: `package main

import "fmt"

func main() {
  day := 5
  switch day {
  case 5:
    fmt.Println("Fri")
  default:
    fmt.Println("Other")
  }
}
`,
      expectedStdout: 'Fri\n',
    },
    docs: [{ title: 'Go by Example: Switch', url: makeExternalUrl('switch') }],
  },
  {
    id: 'arrays',
    title: 'Arrays',
    summary: 'Fixed-length sequences.',
    definition: 'An array has a fixed length that is part of its type: [N]T.',
    context: 'Arrays are less common than slices in Go, but they matter for memory layout and interop.',
    externalUrl: makeExternalUrl('arrays'),
    code: `package main

import "fmt"

func main() {
  var a [3]int
  a[0] = 10
  a[1] = 20
  a[2] = 30
  fmt.Println(a[0], a[2], len(a))
}
`,
    lineNotes: {
      5: 'Declare an array of 3 ints; elements start at zero values (0).',
      6: 'Index into the array with a[i].',
      9: 'len(a) returns the fixed length.',
    },
    assignment: {
      title: 'Assignment: array sum',
      prompt: 'Create an array [2]int with values 1 and 4, then print their sum.',
      starterCode: `package main

import "fmt"

func main() {
  a := [2]int{1, 4}
  fmt.Println(a[0] + a[1])
}
`,
      expectedStdout: '5\n',
    },
    docs: [{ title: 'Go by Example: Arrays', url: makeExternalUrl('arrays') }],
  },
  {
    id: 'slices',
    title: 'Slices',
    summary: 'Dynamic sequences built on top of arrays.',
    definition: 'A slice is a descriptor (pointer+len+cap) pointing into an underlying array; it can grow with append.',
    context: 'Slices are the default way to work with lists in Go.',
    externalUrl: makeExternalUrl('slices'),
    code: `package main

import "fmt"

func main() {
  xs := []int{1, 2}
  xs = append(xs, 3)
  fmt.Println(xs, len(xs))
}
`,
    lineNotes: {
      5: '[]int is a slice type; this is a slice literal.',
      6: 'append returns a new slice (assign it back).',
      7: 'Printing a slice prints its elements in brackets.',
    },
    assignment: {
      title: 'Assignment: append two values',
      prompt: 'Start with []int{5}. Append 6 and 7, then print the slice.',
      starterCode: `package main

import "fmt"

func main() {
  xs := []int{5}
  xs = append(xs, 6)
  xs = append(xs, 7)
  fmt.Println(xs)
}
`,
      expectedStdout: '[5 6 7]\n',
    },
    docs: [{ title: 'Go by Example: Slices', url: makeExternalUrl('slices') }],
  },
  {
    id: 'maps',
    title: 'Maps',
    summary: 'Key/value hash maps.',
    definition: 'A map associates keys to values: map[K]V. Lookups can also return a boolean “ok” flag.',
    context: 'Maps are used for fast lookups, counting, grouping, and configuration tables.',
    externalUrl: makeExternalUrl('maps'),
    code: `package main

import "fmt"

func main() {
  m := map[string]int{"a": 1}
  m["b"] = 2
  v, ok := m["a"]
  fmt.Println(v, ok)
  _, ok2 := m["z"]
  fmt.Println(ok2)
}
`,
    lineNotes: {
      5: 'Map literal initializes a map with entries.',
      6: 'Assigning to m[key] inserts/updates.',
      7: 'Two-value lookup returns value + whether the key existed.',
      9: 'You can ignore the value with _.',
    },
    assignment: {
      title: 'Assignment: count keys',
      prompt: 'Create a map with two entries and print its length using len(m).',
      starterCode: `package main

import "fmt"

func main() {
  m := map[string]int{"x": 1, "y": 2}
  fmt.Println(len(m))
}
`,
      expectedStdout: '2\n',
    },
    docs: [{ title: 'Go by Example: Maps', url: makeExternalUrl('maps') }],
  },
  {
    id: 'functions',
    title: 'Functions',
    summary: 'Define and call reusable blocks of code.',
    definition: 'Functions take parameters and return results. Go supports multiple return values and named returns.',
    context: 'Functions are the unit of reuse and readability; small functions are easier to test and reason about.',
    externalUrl: makeExternalUrl('functions'),
    code: `package main

import "fmt"

func add(a int, b int) int {
  return a + b
}

func main() {
  fmt.Println(add(2, 3))
}
`,
    lineNotes: {
      5: 'Function signature: params + return type.',
      6: 'return returns the computed value.',
      10: 'Call the function like add(2, 3).',
    },
    assignment: {
      title: 'Assignment: write sub()',
      prompt: 'Write sub(a, b int) int that returns a-b, then print sub(10, 4).',
      starterCode: `package main

import "fmt"

func sub(a int, b int) int {
  return a - b
}

func main() {
  fmt.Println(sub(10, 4))
}
`,
      expectedStdout: '6\n',
    },
    docs: [{ title: 'Go by Example: Functions', url: makeExternalUrl('functions') }],
  },
  {
    id: 'multiple-return-values',
    title: 'Multiple Return Values',
    summary: 'Return more than one value from a function.',
    definition: 'Go functions can return multiple values, commonly used for (value, error) or (value, ok).',
    context: 'This is a core Go idiom—especially for error handling and safe lookups.',
    externalUrl: makeExternalUrl('multiple-return-values'),
    code: `package main

import "fmt"

func pair() (int, int) {
  return 7, 9
}

func main() {
  a, b := pair()
  fmt.Println(a, b)
}
`,
    lineNotes: {
      5: 'Return types are listed in parentheses for multiple returns.',
      6: 'Return two values separated by commas.',
      10: 'Assign with a, b := ...',
    },
    assignment: {
      title: 'Assignment: return (x, x*x)',
      prompt: 'Write a function sq(x int) (int, int) that returns x and x*x. Print sq(5).',
      starterCode: `package main

import "fmt"

func sq(x int) (int, int) {
  return x, x * x
}

func main() {
  a, b := sq(5)
  fmt.Println(a, b)
}
`,
      expectedStdout: '5 25\n',
    },
    docs: [{ title: 'Go by Example: Multiple Return Values', url: makeExternalUrl('multiple-return-values') }],
  },
  {
    id: 'variadic-functions',
    title: 'Variadic Functions',
    summary: 'Functions that accept a variable number of arguments.',
    definition: 'A variadic parameter uses ...T and can accept zero or more values of type T.',
    context: 'Variadic functions are useful for helpers like sum(), logging, and formatting wrappers.',
    externalUrl: makeExternalUrl('variadic-functions'),
    code: `package main

import "fmt"

func sum(nums ...int) int {
  total := 0
  for _, n := range nums {
    total += n
  }
  return total
}

func main() {
  fmt.Println(sum(1, 2, 3))
  xs := []int{4, 5}
  fmt.Println(sum(xs...))
}
`,
    lineNotes: {
      5: '...int means “zero or more ints”. Inside, nums is a slice.',
      7: 'range iterates over a slice; _ ignores the index.',
      8: 'Accumulate into total.',
      14: 'Use xs... to “spread” a slice into variadic args.',
    },
    assignment: {
      title: 'Assignment: variadic max of two',
      prompt: 'Write max(nums ...int) int that returns the maximum for at least 2 args. Print max(3, 9, 4).',
      starterCode: `package main

import "fmt"

func max(nums ...int) int {
  m := nums[0]
  for _, n := range nums {
    if n > m {
      m = n
    }
  }
  return m
}

func main() {
  fmt.Println(max(3, 9, 4))
}
`,
      expectedStdout: '9\n',
    },
    docs: [{ title: 'Go by Example: Variadic Functions', url: makeExternalUrl('variadic-functions') }],
  },
  {
    id: 'closures',
    title: 'Closures',
    summary: 'Functions that capture variables from their surrounding scope.',
    definition: 'A closure is a function value that “remembers” variables from the scope where it was created.',
    context: 'Closures are useful for building small stateful helpers (counters, accumulators) without defining new types.',
    externalUrl: makeExternalUrl('closures'),
    code: `package main

import "fmt"

func adder(start int) func(int) int {
  sum := start
  return func(x int) int {
    sum += x
    return sum
  }
}

func main() {
  a := adder(10)
  fmt.Println(a(1))
  fmt.Println(a(2))
}
`,
    lineNotes: {
      5: 'adder returns a function. That returned function is the closure.',
      6: 'sum is captured by the returned function.',
      7: 'The inner function can read and modify sum.',
      14: 'Calling a(1) changes the captured sum from 10 to 11.',
      15: 'Calling a(2) continues from the previous state (11 → 13).',
    },
    assignment: {
      title: 'Assignment: make a counter',
      prompt: 'Write makeCounter() that returns a func() int which counts up starting from 0. Print three calls.',
      starterCode: `package main

import "fmt"

func makeCounter() func() int {
  // TODO: capture a variable and increment it
  n := 0
  return func() int {
    n++
    return n
  }
}

func main() {
  c := makeCounter()
  fmt.Println(c())
  fmt.Println(c())
  fmt.Println(c())
}
`,
      expectedStdout: '1\n2\n3\n',
    },
    docs: [{ title: 'Go by Example: Closures', url: makeExternalUrl('closures') }],
  },
  {
    id: 'recursion',
    title: 'Recursion',
    summary: 'A function calling itself to solve a problem.',
    definition: 'Recursion is a technique where a function calls itself with a smaller input until it reaches a base case.',
    context: 'Recursion is common in tree traversal, divide-and-conquer algorithms, and certain math problems.',
    externalUrl: makeExternalUrl('recursion'),
    code: `package main

import "fmt"

func fact(n int) int {
  if n <= 1 {
    return 1
  }
  return n * fact(n-1)
}

func main() {
  fmt.Println(fact(5))
}
`,
    lineNotes: {
      5: 'fact calls itself with a smaller value (n-1).',
      6: 'Base case: stop recursing when n is small enough.',
      8: 'Recursive case: combine n with the result of fact(n-1).',
    },
    assignment: {
      title: 'Assignment: sum to n',
      prompt: 'Write sumTo(n int) int recursively so sumTo(4) prints 10 (1+2+3+4).',
      starterCode: `package main

import "fmt"

func sumTo(n int) int {
  if n <= 0 {
    return 0
  }
  return n + sumTo(n-1)
}

func main() {
  fmt.Println(sumTo(4))
}
`,
      expectedStdout: '10\n',
    },
    docs: [{ title: 'Go by Example: Recursion', url: makeExternalUrl('recursion') }],
  },
  {
    id: 'range-over-built-in-types',
    title: 'Range over Built-in Types',
    summary: 'Use range to iterate over slices, arrays, strings, maps, and more.',
    definition: 'range is a Go keyword used in for-loops to iterate over elements of a collection.',
    context: 'You’ll use range constantly for iteration; it’s concise and avoids index mistakes.',
    externalUrl: makeExternalUrl('range-over-built-in-types'),
    code: `package main

import "fmt"

func main() {
  xs := []int{10, 20, 30}
  for i, v := range xs {
    fmt.Println(i, v)
  }

  s := "go"
  for i, r := range s {
    fmt.Println(i, r)
  }
}
`,
    lineNotes: {
      6: 'range over a slice gives (index, value).',
      7: 'fmt.Println prints them with a space.',
      11: 'range over a string yields (byte index, rune).',
      12: 'r is an int32 rune value; printing it prints the numeric code point.',
    },
    assignment: {
      title: 'Assignment: sum a slice',
      prompt: 'Use range to sum []int{1,2,3,4} and print 10.',
      starterCode: `package main

import "fmt"

func main() {
  xs := []int{1, 2, 3, 4}
  sum := 0
  for _, v := range xs {
    sum += v
  }
  fmt.Println(sum)
}
`,
      expectedStdout: '10\n',
    },
    docs: [{ title: 'Go by Example: Range over Built-in Types', url: makeExternalUrl('range-over-built-in-types') }],
  },
  {
    id: 'pointers',
    title: 'Pointers',
    summary: 'Pass references to values and modify them in place.',
    definition: 'A pointer holds the address of a value. Use & to take an address and * to dereference.',
    context: 'Pointers let functions modify values, avoid copies, and work efficiently with large structs.',
    externalUrl: makeExternalUrl('pointers'),
    code: `package main

import "fmt"

func inc(n *int) {
  *n = *n + 1
}

func main() {
  x := 5
  inc(&x)
  fmt.Println(x)
}
`,
    lineNotes: {
      5: 'n is a pointer to an int.',
      6: '*n dereferences the pointer to access the int value.',
      11: '&x takes the address of x.',
    },
    assignment: {
      title: 'Assignment: set to zero',
      prompt: 'Write a function zero(n *int) that sets the pointed-to value to 0. Print the value after calling it.',
      starterCode: `package main

import "fmt"

func zero(n *int) {
  *n = 0
}

func main() {
  x := 7
  zero(&x)
  fmt.Println(x)
}
`,
      expectedStdout: '0\n',
    },
    docs: [{ title: 'Go by Example: Pointers', url: makeExternalUrl('pointers') }],
  },
  {
    id: 'strings-and-runes',
    title: 'Strings and Runes',
    summary: 'Strings are bytes; runes represent Unicode code points.',
    definition: 'A Go string is a read-only slice of bytes. Iterating with range decodes UTF-8 into runes.',
    context: 'Understanding bytes vs runes prevents bugs when working with Unicode text.',
    externalUrl: makeExternalUrl('strings-and-runes'),
    code: `package main

import "fmt"

func main() {
  s := "café"
  fmt.Println(len(s)) // bytes
  fmt.Println(len([]rune(s))) // runes
}
`,
    lineNotes: {
      5: 'café contains a non-ASCII character (é).',
      6: 'len(s) returns number of bytes in UTF-8 encoding.',
      7: 'Converting to []rune counts Unicode code points.',
    },
    assignment: {
      title: 'Assignment: rune count',
      prompt: 'Set s := "go" and print len([]rune(s)).',
      starterCode: `package main

import "fmt"

func main() {
  s := "go"
  fmt.Println(len([]rune(s)))
}
`,
      expectedStdout: '2\n',
    },
    docs: [{ title: 'Go by Example: Strings and Runes', url: makeExternalUrl('strings-and-runes') }],
  },
  {
    id: 'structs',
    title: 'Structs',
    summary: 'Group related fields into a single type.',
    definition: 'A struct is a collection of named fields. It’s Go’s primary way to model records/objects.',
    context: 'Structs model domain data (User, Order, Config) and are the basis for methods and interfaces.',
    externalUrl: makeExternalUrl('structs'),
    code: `package main

import "fmt"

type Person struct {
  Name string
  Age  int
}

func main() {
  p := Person{Name: "Ada", Age: 36}
  fmt.Println(p.Name, p.Age)
}
`,
    lineNotes: {
      5: 'Define a struct type with fields.',
      11: 'Struct literal sets fields by name.',
      12: 'Access fields with dot notation.',
    },
    assignment: {
      title: 'Assignment: create a struct',
      prompt: 'Define a Point struct {X int; Y int}. Create Point{X:2, Y:3} and print "2 3".',
      starterCode: `package main

import "fmt"

type Point struct {
  X int
  Y int
}

func main() {
  p := Point{X: 2, Y: 3}
  fmt.Println(p.X, p.Y)
}
`,
      expectedStdout: '2 3\n',
    },
    docs: [{ title: 'Go by Example: Structs', url: makeExternalUrl('structs') }],
  },
  {
    id: 'methods',
    title: 'Methods',
    summary: 'Attach functions to types (usually structs).',
    definition: 'A method is a function with a receiver, like (r Rect) Area().',
    context: 'Methods make code readable and enable interface-based design.',
    externalUrl: makeExternalUrl('methods'),
    code: `package main

import "fmt"

type Rect struct {
  W int
  H int
}

func (r Rect) Area() int {
  return r.W * r.H
}

func main() {
  r := Rect{W: 3, H: 4}
  fmt.Println(r.Area())
}
`,
    lineNotes: {
      9: 'Receiver (r Rect) means Area is a method on Rect.',
      10: 'The method can access receiver fields.',
      15: 'Call a method with r.Area().',
    },
    assignment: {
      title: 'Assignment: method Perim()',
      prompt: 'Add a Perim() method for Rect that returns 2*(W+H). Print it for W=3, H=4.',
      starterCode: `package main

import "fmt"

type Rect struct {
  W int
  H int
}

func (r Rect) Perim() int {
  return 2 * (r.W + r.H)
}

func main() {
  r := Rect{W: 3, H: 4}
  fmt.Println(r.Perim())
}
`,
      expectedStdout: '14\n',
    },
    docs: [{ title: 'Go by Example: Methods', url: makeExternalUrl('methods') }],
  },
  {
    id: 'interfaces',
    title: 'Interfaces',
    summary: 'Describe behavior with method sets.',
    definition: 'An interface is a set of method signatures. A type satisfies an interface implicitly by implementing its methods.',
    context: 'Interfaces enable polymorphism and decouple code from concrete implementations.',
    externalUrl: makeExternalUrl('interfaces'),
    code: `package main

import (
  "fmt"
  "math"
)

type Shape interface {
  Area() float64
}

type Rect struct{ W, H float64 }
func (r Rect) Area() float64 { return r.W * r.H }

type Circle struct{ R float64 }
func (c Circle) Area() float64 { return math.Pi * c.R * c.R }

func main() {
  var s Shape = Rect{W: 3, H: 4}
  fmt.Printf("%.2f\n", s.Area())
  s = Circle{R: 2}
  fmt.Printf("%.2f\n", s.Area())
}
`,
    lineNotes: {
      8: 'Shape requires an Area() method.',
      12: 'Rect implements Area, so it satisfies Shape.',
      15: 'Circle also implements Area, so it also satisfies Shape.',
      18: 'We can store different concrete types in a Shape variable.',
    },
    assignment: {
      title: 'Assignment: interface with String()',
      prompt: 'Create a type User with a method String() string and print it via fmt.Println(u).',
      starterCode: `package main

import "fmt"

type User struct{ Name string }

func (u User) String() string {
  return "User:" + u.Name
}

func main() {
  u := User{Name: "Go"}
  fmt.Println(u)
}
`,
      expectedStdout: 'User:Go\n',
    },
    docs: [{ title: 'Go by Example: Interfaces', url: makeExternalUrl('interfaces') }],
  },
  {
    id: 'enums',
    title: 'Enums',
    summary: 'Model a fixed set of named values (commonly using iota).',
    definition: 'Go doesn’t have a dedicated enum keyword, but you can model enums with typed constants (often using iota).',
    context: 'Enums make code clearer when values come from a small set of options (states, modes, kinds).',
    externalUrl: makeExternalUrl('enums'),
    code: `package main

import "fmt"

type Day int

const (
  Mon Day = iota
  Tue
  Wed
)

func (d Day) String() string {
  switch d {
  case Mon:
    return "Mon"
  case Tue:
    return "Tue"
  case Wed:
    return "Wed"
  default:
    return "?"
  }
}

func main() {
  fmt.Println(Tue)
}
`,
    lineNotes: {
      5: 'Define a named integer type Day.',
      7: 'iota increments automatically: Mon=0, Tue=1, Wed=2.',
      13: 'String() controls how the value prints with fmt.',
      28: 'Printing Tue uses the String() method.',
    },
    assignment: {
      title: 'Assignment: add Thu',
      prompt: 'Add Thu to the const block and update String() so printing Thu prints "Thu".',
      starterCode: `package main

import "fmt"

type Day int

const (
  Mon Day = iota
  Tue
  Wed
  Thu
)

func (d Day) String() string {
  switch d {
  case Mon:
    return "Mon"
  case Tue:
    return "Tue"
  case Wed:
    return "Wed"
  case Thu:
    return "Thu"
  default:
    return "?"
  }
}

func main() {
  fmt.Println(Thu)
}
`,
      expectedStdout: 'Thu\n',
    },
    docs: [{ title: 'Go by Example: Enums', url: makeExternalUrl('enums') }],
  },
  {
    id: 'struct-embedding',
    title: 'Struct Embedding',
    summary: 'Compose structs by embedding other structs.',
    definition: 'Embedding puts one type inside another without a field name, promoting its fields/methods.',
    context: 'Embedding is a lightweight way to reuse fields and behavior (composition over inheritance).',
    externalUrl: makeExternalUrl('struct-embedding'),
    code: `package main

import "fmt"

type Base struct {
  Name string
}

type User struct {
  Base
  Admin bool
}

func main() {
  u := User{Base: Base{Name: "Go"}, Admin: true}
  fmt.Println(u.Name, u.Admin)
}
`,
    lineNotes: {
      9: 'Base is embedded in User (no field name).',
      15: 'We can access u.Name directly because Name is promoted.',
    },
    assignment: {
      title: 'Assignment: embed + method',
      prompt: 'Add a method (b Base) Hello() string that returns "hi "+b.Name and print u.Hello().',
      starterCode: `package main

import "fmt"

type Base struct{ Name string }

func (b Base) Hello() string {
  return "hi " + b.Name
}

type User struct {
  Base
}

func main() {
  u := User{Base: Base{Name: "Ada"}}
  fmt.Println(u.Hello())
}
`,
      expectedStdout: 'hi Ada\n',
    },
    docs: [{ title: 'Go by Example: Struct Embedding', url: makeExternalUrl('struct-embedding') }],
  },
  {
    id: 'generics',
    title: 'Generics',
    summary: 'Write reusable functions that work over many types.',
    definition: 'Generics let you write code with type parameters (like [T any]) so one function works for many types safely.',
    context: 'Generics are great for utilities like Map/Filter, sets, and reusable data structures without interface{} casting.',
    externalUrl: makeExternalUrl('generics'),
    code: `package main

import "fmt"

func Map[T any](xs []T, f func(T) T) []T {
  out := make([]T, len(xs))
  for i, v := range xs {
    out[i] = f(v)
  }
  return out
}

func main() {
  xs := []int{1, 2, 3}
  ys := Map(xs, func(n int) int { return n * 2 })
  fmt.Println(ys)
}
`,
    lineNotes: {
      5: '[T any] declares a type parameter T.',
      6: 'The function works on []T and returns []T.',
      7: 'We allocate an output slice of the same length.',
      14: 'We call Map with ints; the compiler infers T = int.',
    },
    assignment: {
      title: 'Assignment: generic Repeat',
      prompt: 'Write Repeat[T any](x T, n int) []T that returns a slice with x repeated n times. Print Repeat("go", 3).',
      starterCode: `package main

import "fmt"

func Repeat[T any](x T, n int) []T {
  out := make([]T, 0, n)
  for i := 0; i < n; i++ {
    out = append(out, x)
  }
  return out
}

func main() {
  fmt.Println(Repeat("go", 3))
}
`,
      expectedStdout: '[go go go]\n',
    },
    docs: [{ title: 'Go by Example: Generics', url: makeExternalUrl('generics') }],
  },
  {
    id: 'range-over-iterators',
    title: 'Range over Iterators',
    summary: 'Iterate values produced by an iterator-like abstraction.',
    definition:
      'Modern Go (1.22+) supports ranging over iterator functions. In this playground we demonstrate the iterator pattern without relying on that syntax.',
    context: 'Iterators are useful for streaming values without allocating full slices, and for building composable pipelines.',
    externalUrl: makeExternalUrl('range-over-iterators'),
    code: `package main

import "fmt"

// An iterator that calls yield(v) for each produced value.
type Iter func(yield func(int) bool)

func main() {
  it := Iter(func(yield func(int) bool) {
    for i := 0; i < 3; i++ {
      if !yield(i) {
        return
      }
    }
  })

  it(func(v int) bool {
    fmt.Println(v)
    return true
  })
}
`,
    lineNotes: {
      6: 'Iter is a function type that accepts a yield callback.',
      9: 'The iterator produces values by calling yield(i).',
      16: 'Consume the iterator by providing a yield function.',
    },
    assignment: {
      title: 'Assignment: stop early',
      prompt: 'Modify the consumer so it stops after printing 1 (return false when v==1).',
      starterCode: `package main

import "fmt"

type Iter func(yield func(int) bool)

func main() {
  it := Iter(func(yield func(int) bool) {
    for i := 0; i < 5; i++ {
      if !yield(i) {
        return
      }
    }
  })

  it(func(v int) bool {
    fmt.Println(v)
    if v == 1 {
      return false
    }
    return true
  })
}
`,
      expectedStdout: '0\n1\n',
    },
    docs: [{ title: 'Go by Example: Range over Iterators', url: makeExternalUrl('range-over-iterators') }],
  },
  {
    id: 'errors',
    title: 'Errors',
    summary: 'Handle failures explicitly with the error type.',
    definition: 'In Go, errors are values. Functions commonly return (value, error), and callers check error != nil.',
    context: 'This style keeps control flow explicit and avoids hidden exceptions.',
    externalUrl: makeExternalUrl('errors'),
    code: `package main

import (
  "errors"
  "fmt"
)

func div(a, b int) (int, error) {
  if b == 0 {
    return 0, errors.New("divide by zero")
  }
  return a / b, nil
}

func main() {
  v, err := div(10, 0)
  fmt.Println(v, err)
}
`,
    lineNotes: {
      8: 'Return both a value and an error.',
      9: 'When something fails, return a non-nil error.',
      15: 'Callers should handle err explicitly.',
    },
    assignment: {
      title: 'Assignment: successful division',
      prompt: 'Call div(10, 2) and print only the value (ignore the error after checking it).',
      starterCode: `package main

import (
  "errors"
  "fmt"
)

func div(a, b int) (int, error) {
  if b == 0 {
    return 0, errors.New("divide by zero")
  }
  return a / b, nil
}

func main() {
  v, err := div(10, 2)
  if err != nil {
    fmt.Println("error:", err)
    return
  }
  fmt.Println(v)
}
`,
      expectedStdout: '5\n',
    },
    docs: [{ title: 'Go by Example: Errors', url: makeExternalUrl('errors') }],
  },
  {
    id: 'custom-errors',
    title: 'Custom Errors',
    summary: 'Create your own error types with extra context.',
    definition: 'Any type that implements Error() string satisfies the built-in error interface.',
    context: 'Custom errors can carry structured context (fields) and improve debuggability.',
    externalUrl: makeExternalUrl('custom-errors'),
    code: `package main

import "fmt"

type ArgError struct {
  Arg     int
  Problem string
}

func (e ArgError) Error() string {
  return fmt.Sprintf("bad arg %d: %s", e.Arg, e.Problem)
}

func main() {
  err := ArgError{Arg: 42, Problem: "too large"}
  fmt.Println(err)
}
`,
    lineNotes: {
      5: 'Define a struct to hold extra error context.',
      10: 'Implement Error() to satisfy error.',
      14: 'Printing the error calls Error().',
    },
    assignment: {
      title: 'Assignment: different error message',
      prompt: 'Create ArgError{Arg: 1, Problem: "too small"} and print it.',
      starterCode: `package main

import "fmt"

type ArgError struct {
  Arg     int
  Problem string
}

func (e ArgError) Error() string {
  return fmt.Sprintf("bad arg %d: %s", e.Arg, e.Problem)
}

func main() {
  err := ArgError{Arg: 1, Problem: "too small"}
  fmt.Println(err)
}
`,
      expectedStdout: 'bad arg 1: too small\n',
    },
    docs: [{ title: 'Go by Example: Custom Errors', url: makeExternalUrl('custom-errors') }],
  },
  {
    id: 'goroutines',
    title: 'Goroutines',
    summary: 'Run functions concurrently with go.',
    definition: 'A goroutine is a lightweight concurrent execution unit managed by the Go runtime.',
    context: 'Goroutines are central to Go concurrency—use them for parallel work and background tasks.',
    externalUrl: makeExternalUrl('goroutines'),
    code: `package main

import "fmt"

func main() {
  ch := make(chan int)

  go func() {
    for i := 1; i <= 3; i++ {
      ch <- i
    }
    close(ch)
  }()

  for v := range ch {
    fmt.Println(v)
  }
}
`,
    lineNotes: {
      6: 'An unbuffered channel synchronizes sender/receiver.',
      8: 'go starts a new goroutine.',
      12: 'close signals no more values will be sent.',
      15: 'range over a channel receives until it is closed.',
    },
    assignment: {
      title: 'Assignment: send 2 values',
      prompt: 'Send 10 and 20 from a goroutine and print them in main (two lines).',
      starterCode: `package main

import "fmt"

func main() {
  ch := make(chan int)

  go func() {
    ch <- 10
    ch <- 20
    close(ch)
  }()

  for v := range ch {
    fmt.Println(v)
  }
}
`,
      expectedStdout: '10\n20\n',
    },
    docs: [{ title: 'Go by Example: Goroutines', url: makeExternalUrl('goroutines') }],
  },
  {
    id: 'channels',
    title: 'Channels',
    summary: 'Typed conduits for sending values between goroutines.',
    definition: 'Channels let goroutines communicate by sending and receiving typed values.',
    context: 'Channels help coordinate concurrency safely without manual locking in many cases.',
    externalUrl: makeExternalUrl('channels'),
    code: `package main

import "fmt"

func main() {
  ch := make(chan string, 1)
  ch <- "ping"
  msg := <-ch
  fmt.Println(msg)
}
`,
    lineNotes: {
      5: 'Create a buffered channel (capacity 1) so send won’t block.',
      6: 'Send a value into the channel.',
      7: 'Receive a value from the channel.',
    },
    assignment: {
      title: 'Assignment: two messages',
      prompt: 'Send "a" and "b" into a buffered channel and print them (two lines).',
      starterCode: `package main

import "fmt"

func main() {
  ch := make(chan string, 2)
  ch <- "a"
  ch <- "b"
  fmt.Println(<-ch)
  fmt.Println(<-ch)
}
`,
      expectedStdout: 'a\nb\n',
    },
    docs: [{ title: 'Go by Example: Channels', url: makeExternalUrl('channels') }],
  },
  {
    id: 'channel-buffering',
    title: 'Channel Buffering',
    summary: 'Buffered channels can hold values without a receiver immediately ready.',
    definition: 'A buffered channel has capacity > 0; sends only block when the buffer is full.',
    context: 'Buffering smooths bursts of work and can reduce synchronization overhead.',
    externalUrl: makeExternalUrl('channel-buffering'),
    code: `package main

import "fmt"

func main() {
  ch := make(chan int, 2)
  ch <- 1
  ch <- 2
  fmt.Println(<-ch)
  fmt.Println(<-ch)
}
`,
    lineNotes: {
      5: 'Capacity 2 means two sends can happen without a receiver.',
      6: 'First send.',
      7: 'Second send.',
      8: 'Receive in FIFO order.',
    },
    assignment: {
      title: 'Assignment: buffer size 1',
      prompt: 'Make a channel with buffer 1, send 99, then receive and print it.',
      starterCode: `package main

import "fmt"

func main() {
  ch := make(chan int, 1)
  ch <- 99
  fmt.Println(<-ch)
}
`,
      expectedStdout: '99\n',
    },
    docs: [{ title: 'Go by Example: Channel Buffering', url: makeExternalUrl('channel-buffering') }],
  },
  {
    id: 'channel-synchronization',
    title: 'Channel Synchronization',
    summary: 'Use channels to wait for work to complete.',
    definition: 'A common pattern is to signal completion by closing a channel or sending a value.',
    context: 'This is a lightweight alternative to locks for simple “done” signaling.',
    externalUrl: makeExternalUrl('channel-synchronization'),
    code: `package main

import "fmt"

func main() {
  done := make(chan struct{})

  go func() {
    fmt.Println("working")
    close(done)
  }()

  <-done
  fmt.Println("done")
}
`,
    lineNotes: {
      6: 'done is a signal channel (no data).',
      8: 'Do work in a goroutine.',
      10: 'close(done) broadcasts completion.',
      13: 'Receiving from done blocks until closed.',
    },
    assignment: {
      title: 'Assignment: signal with bool',
      prompt: 'Use a chan bool. Send true from a goroutine and print "ok" after receiving.',
      starterCode: `package main

import "fmt"

func main() {
  done := make(chan bool, 1)
  go func() {
    done <- true
  }()
  <-done
  fmt.Println("ok")
}
`,
      expectedStdout: 'ok\n',
    },
    docs: [{ title: 'Go by Example: Channel Synchronization', url: makeExternalUrl('channel-synchronization') }],
  },
  {
    id: 'channel-directions',
    title: 'Channel Directions',
    summary: 'Restrict channel parameters to send-only or receive-only.',
    definition: 'A chan<- T is send-only; a <-chan T is receive-only. This makes APIs clearer and safer.',
    context: 'Directional channels document intent and prevent accidental misuse in concurrent code.',
    externalUrl: makeExternalUrl('channel-directions'),
    code: `package main

import "fmt"

func send(ch chan<- int, v int) {
  ch <- v
}

func recv(ch <-chan int) int {
  return <-ch
}

func main() {
  ch := make(chan int, 1)
  send(ch, 7)
  fmt.Println(recv(ch))
}
`,
    lineNotes: {
      5: 'send only allows sending into ch.',
      9: 'recv only allows receiving from ch.',
      14: 'We can pass a bidirectional channel where a directional one is expected.',
    },
    assignment: {
      title: 'Assignment: directional string channel',
      prompt: 'Write sendS(ch chan<- string) and recvS(ch <-chan string). Send "hi" and print it.',
      starterCode: `package main

import "fmt"

func sendS(ch chan<- string, v string) {
  ch <- v
}

func recvS(ch <-chan string) string {
  return <-ch
}

func main() {
  ch := make(chan string, 1)
  sendS(ch, "hi")
  fmt.Println(recvS(ch))
}
`,
      expectedStdout: 'hi\n',
    },
    docs: [{ title: 'Go by Example: Channel Directions', url: makeExternalUrl('channel-directions') }],
  },
  {
    id: 'select',
    title: 'Select',
    summary: 'Wait on multiple channel operations.',
    definition: 'select chooses one ready send/receive operation among cases. It blocks until one can proceed (unless default).',
    context: 'select is essential for coordinating multiple channels and building responsive concurrent programs.',
    externalUrl: makeExternalUrl('select'),
    code: `package main

import "fmt"

func main() {
  c1 := make(chan string, 1)
  c2 := make(chan string, 1)
  c2 <- "b"

  select {
  case msg1 := <-c1:
    fmt.Println(msg1)
  case msg2 := <-c2:
    fmt.Println(msg2)
  default:
    fmt.Println("none")
  }
}
`,
    lineNotes: {
      7: 'Only c2 has a value ready.',
      9: 'select picks the first case that can proceed.',
      14: 'default runs if no case is ready (non-blocking select).',
    },
    assignment: {
      title: 'Assignment: default case',
      prompt: 'Remove the send to c2 and make the program print "none" via the default case.',
      starterCode: `package main

import "fmt"

func main() {
  c1 := make(chan string, 1)
  c2 := make(chan string, 1)

  select {
  case msg1 := <-c1:
    fmt.Println(msg1)
  case msg2 := <-c2:
    fmt.Println(msg2)
  default:
    fmt.Println("none")
  }
}
`,
      expectedStdout: 'none\n',
    },
    docs: [{ title: 'Go by Example: Select', url: makeExternalUrl('select') }],
  },
  {
    id: 'timeouts',
    title: 'Timeouts',
    summary: 'Stop waiting after a duration using select + time.After.',
    definition: 'A timeout is a time limit for an operation. In Go, you often use select with time.After to implement timeouts.',
    context: 'Timeouts keep systems responsive and prevent goroutines from waiting forever.',
    externalUrl: makeExternalUrl('timeouts'),
    code: `package main

import (
  "fmt"
  "time"
)

func main() {
  ch := make(chan int)

  select {
  case v := <-ch:
    fmt.Println("value:", v)
  case <-time.After(0 * time.Millisecond):
    fmt.Println("timeout")
  }
}
`,
    lineNotes: {
      9: 'ch never receives, so the receive case can’t proceed.',
      11: 'time.After returns a channel that delivers after the duration.',
      12: 'With 0ms, the timeout triggers immediately (deterministic for this playground).',
    },
    assignment: {
      title: 'Assignment: always timeout',
      prompt: 'Keep ch empty and print "timeout" using time.After.',
      starterCode: `package main

import (
  "fmt"
  "time"
)

func main() {
  ch := make(chan int)
  select {
  case <-ch:
    fmt.Println("got value")
  case <-time.After(0 * time.Millisecond):
    fmt.Println("timeout")
  }
}
`,
      expectedStdout: 'timeout\n',
    },
    docs: [{ title: 'Go by Example: Timeouts', url: makeExternalUrl('timeouts') }],
  },
  {
    id: 'non-blocking-channel-operations',
    title: 'Non-Blocking Channel Operations',
    summary: 'Use select + default to avoid blocking.',
    definition: 'A non-blocking channel operation uses select with a default case to proceed when no send/receive is ready.',
    context: 'Useful for polling, trying work opportunistically, and building responsive event loops.',
    externalUrl: makeExternalUrl('non-blocking-channel-operations'),
    code: `package main

import "fmt"

func main() {
  ch := make(chan int, 1)

  select {
  case ch <- 7:
    fmt.Println("sent")
  default:
    fmt.Println("not sent")
  }

  select {
  case v := <-ch:
    fmt.Println("recv", v)
  default:
    fmt.Println("no value")
  }
}
`,
    lineNotes: {
      7: 'Send will succeed because the channel buffer has room.',
      13: 'Receive will succeed because we just sent a value.',
      14: 'v is the received value.',
    },
    assignment: {
      title: 'Assignment: non-blocking receive',
      prompt: 'Create an empty buffered channel and use select+default to print "no value".',
      starterCode: `package main

import "fmt"

func main() {
  ch := make(chan int, 1)
  select {
  case v := <-ch:
    fmt.Println("recv", v)
  default:
    fmt.Println("no value")
  }
}
`,
      expectedStdout: 'no value\n',
    },
    docs: [{ title: 'Go by Example: Non-Blocking Channel Operations', url: makeExternalUrl('non-blocking-channel-operations') }],
  },
  {
    id: 'closing-channels',
    title: 'Closing Channels',
    summary: 'Close a channel to signal no more values.',
    definition: 'Closing a channel indicates that no more values will be sent. Receivers can detect closure via the ok result.',
    context: 'Closing is a clean way to signal completion to receivers.',
    externalUrl: makeExternalUrl('closing-channels'),
    code: `package main

import "fmt"

func main() {
  ch := make(chan int, 2)
  ch <- 1
  ch <- 2
  close(ch)

  v1, ok1 := <-ch
  v2, ok2 := <-ch
  v3, ok3 := <-ch

  fmt.Println(v1, ok1)
  fmt.Println(v2, ok2)
  fmt.Println(v3, ok3)
}
`,
    lineNotes: {
      8: 'close(ch) signals no more sends will happen.',
      10: 'Receive returns (value, ok). ok is false when channel is closed and empty.',
      16: 'After buffer is drained, reads return the zero value and ok=false.',
    },
    assignment: {
      title: 'Assignment: detect close',
      prompt: 'Close a channel and show that ok becomes false when reading after it’s empty.',
      starterCode: `package main

import "fmt"

func main() {
  ch := make(chan int, 1)
  ch <- 5
  close(ch)
  v, ok := <-ch
  fmt.Println(v, ok)
  v2, ok2 := <-ch
  fmt.Println(v2, ok2)
}
`,
      expectedStdout: '5 true\n0 false\n',
    },
    docs: [{ title: 'Go by Example: Closing Channels', url: makeExternalUrl('closing-channels') }],
  },
  {
    id: 'range-over-channels',
    title: 'Range over Channels',
    summary: 'Iterate channel values until it is closed.',
    definition: 'Ranging over a channel receives values until the channel is closed and drained.',
    context: 'This is a common consumer pattern for fan-in pipelines.',
    externalUrl: makeExternalUrl('range-over-channels'),
    code: `package main

import "fmt"

func main() {
  ch := make(chan int, 3)
  ch <- 1
  ch <- 2
  ch <- 3
  close(ch)

  for v := range ch {
    fmt.Println(v)
  }
}
`,
    lineNotes: {
      9: 'After close, range will finish once buffered values are received.',
      11: 'Loop ends automatically when channel closes and drains.',
    },
    assignment: {
      title: 'Assignment: range prints 2 lines',
      prompt: 'Send 10 and 20, close the channel, and range-print the values.',
      starterCode: `package main

import "fmt"

func main() {
  ch := make(chan int, 2)
  ch <- 10
  ch <- 20
  close(ch)
  for v := range ch {
    fmt.Println(v)
  }
}
`,
      expectedStdout: '10\n20\n',
    },
    docs: [{ title: 'Go by Example: Range over Channels', url: makeExternalUrl('range-over-channels') }],
  },
  {
    id: 'timers',
    title: 'Timers',
    summary: 'Do something once after a delay (or immediately with 0).',
    definition: 'A timer sends the current time on its channel after a duration.',
    context: 'Timers are used for delays, timeouts, and scheduling one-off work.',
    externalUrl: makeExternalUrl('timers'),
    code: `package main

import (
  "fmt"
  "time"
)

func main() {
  t := time.NewTimer(0 * time.Millisecond)
  <-t.C
  fmt.Println("fired")
}
`,
    lineNotes: {
      9: 'NewTimer returns a Timer with a channel C.',
      10: 'Receiving from t.C blocks until the timer fires (0ms = immediate here).',
    },
    assignment: {
      title: 'Assignment: timer fires',
      prompt: 'Create a 0ms timer and print "ok" after it fires.',
      starterCode: `package main

import (
  "fmt"
  "time"
)

func main() {
  t := time.NewTimer(0 * time.Millisecond)
  <-t.C
  fmt.Println("ok")
}
`,
      expectedStdout: 'ok\n',
    },
    docs: [{ title: 'Go by Example: Timers', url: makeExternalUrl('timers') }],
  },
  {
    id: 'tickers',
    title: 'Tickers',
    summary: 'Do something repeatedly at intervals.',
    definition: 'A ticker sends a time value on its channel at a regular interval until stopped.',
    context: 'Tickers power polling loops and periodic maintenance tasks.',
    externalUrl: makeExternalUrl('tickers'),
    code: `package main

import (
  "fmt"
  "time"
)

func main() {
  ticker := time.NewTicker(1 * time.Millisecond)
  defer ticker.Stop()

  for i := 0; i < 3; i++ {
    <-ticker.C
    fmt.Println("tick")
  }
}
`,
    lineNotes: {
      9: 'Create a ticker; it keeps firing until stopped.',
      10: 'Always stop tickers to release resources.',
      12: 'We consume exactly 3 ticks to keep output deterministic.',
    },
    assignment: {
      title: 'Assignment: print 2 ticks',
      prompt: 'Print "tick" exactly two times using a ticker.',
      starterCode: `package main

import (
  "fmt"
  "time"
)

func main() {
  t := time.NewTicker(1 * time.Millisecond)
  defer t.Stop()
  for i := 0; i < 2; i++ {
    <-t.C
    fmt.Println("tick")
  }
}
`,
      expectedStdout: 'tick\ntick\n',
    },
    docs: [{ title: 'Go by Example: Tickers', url: makeExternalUrl('tickers') }],
  },
  {
    id: 'worker-pools',
    title: 'Worker Pools',
    summary: 'Distribute work over a set of workers.',
    definition: 'A worker pool is a pattern where multiple worker goroutines pull jobs from a channel and push results to another.',
    context: 'Worker pools improve throughput and control concurrency limits.',
    externalUrl: makeExternalUrl('worker-pools'),
    code: `package main

import "fmt"

func worker(jobs <-chan int, results chan<- int) {
  for j := range jobs {
    results <- j * 2
  }
}

func main() {
  jobs := make(chan int, 3)
  results := make(chan int, 3)

  go worker(jobs, results)
  close(jobs)

  // send jobs after starting worker
  jobs2 := []int{1, 2, 3}
  for _, j := range jobs2 {
    jobs <- j
  }
  close(jobs)

  for i := 0; i < 3; i++ {
    fmt.Println(<-results)
  }
}
`,
    lineNotes: {
      5: 'Worker reads jobs and writes results.',
      14: 'Start a single worker to keep ordering deterministic in this playground.',
    },
    assignment: {
      title: 'Assignment: double two jobs',
      prompt: 'Send 4 and 5 to a worker and print 8 and 10.',
      starterCode: `package main

import "fmt"

func worker(jobs <-chan int, results chan<- int) {
  for j := range jobs {
    results <- j * 2
  }
}

func main() {
  jobs := make(chan int, 2)
  results := make(chan int, 2)
  go worker(jobs, results)
  jobs <- 4
  jobs <- 5
  close(jobs)
  fmt.Println(<-results)
  fmt.Println(<-results)
}
`,
      expectedStdout: '8\n10\n',
    },
    docs: [{ title: 'Go by Example: Worker Pools', url: makeExternalUrl('worker-pools') }],
  },
  {
    id: 'waitgroups',
    title: 'WaitGroups',
    summary: 'Wait for a set of goroutines to finish.',
    definition: 'sync.WaitGroup tracks how many goroutines are running; Wait blocks until they’re done.',
    context: 'WaitGroups are the simplest way to wait for multiple goroutines to complete.',
    externalUrl: makeExternalUrl('waitgroups'),
    code: `package main

import (
  "fmt"
  "sync"
)

func main() {
  var wg sync.WaitGroup
  wg.Add(2)

  go func() {
    defer wg.Done()
    fmt.Println("A")
  }()

  go func() {
    defer wg.Done()
    fmt.Println("B")
  }()

  wg.Wait()
  fmt.Println("done")
}
`,
    lineNotes: {
      9: 'Add(2) means we’re waiting for 2 goroutines.',
      12: 'Done decrements the counter (defer ensures it runs).',
      22: 'Wait blocks until counter reaches 0.',
    },
    assignment: {
      title: 'Assignment: wait for one goroutine',
      prompt: 'Start one goroutine that prints "hi", wait, then print "done".',
      starterCode: `package main

import (
  "fmt"
  "sync"
)

func main() {
  var wg sync.WaitGroup
  wg.Add(1)
  go func() {
    defer wg.Done()
    fmt.Println("hi")
  }()
  wg.Wait()
  fmt.Println("done")
}
`,
      expectedStdout: 'hi\ndone\n',
    },
    docs: [{ title: 'Go by Example: WaitGroups', url: makeExternalUrl('waitgroups') }],
  },
  {
    id: 'rate-limiting',
    title: 'Rate Limiting',
    summary: 'Control how frequently an operation happens.',
    definition: 'Rate limiting ensures actions occur at a controlled rate. A simple approach uses a ticker as a token source.',
    context: 'Useful for APIs, background jobs, and preventing bursts from overwhelming systems.',
    externalUrl: makeExternalUrl('rate-limiting'),
    code: `package main

import (
  "fmt"
  "time"
)

func main() {
  limiter := time.NewTicker(1 * time.Millisecond)
  defer limiter.Stop()

  for i := 1; i <= 3; i++ {
    <-limiter.C
    fmt.Println("req", i)
  }
}
`,
    lineNotes: {
      9: 'Each tick acts like a token to allow one request.',
      12: 'We block until the next token arrives.',
    },
    assignment: {
      title: 'Assignment: 2 requests',
      prompt: 'Print req 1 and req 2 using a ticker limiter.',
      starterCode: `package main

import (
  "fmt"
  "time"
)

func main() {
  limiter := time.NewTicker(1 * time.Millisecond)
  defer limiter.Stop()
  for i := 1; i <= 2; i++ {
    <-limiter.C
    fmt.Println("req", i)
  }
}
`,
      expectedStdout: 'req 1\nreq 2\n',
    },
    docs: [{ title: 'Go by Example: Rate Limiting', url: makeExternalUrl('rate-limiting') }],
  },
  {
    id: 'atomic-counters',
    title: 'Atomic Counters',
    summary: 'Update shared counters safely without a mutex.',
    definition: 'Atomic operations perform a read-modify-write as a single, indivisible operation.',
    context: 'Atomics are fast for simple counters and flags, but are more limited than mutexes.',
    externalUrl: makeExternalUrl('atomic-counters'),
    code: `package main

import (
  "fmt"
  "sync"
  "sync/atomic"
)

func main() {
  var n int32
  var wg sync.WaitGroup

  for i := 0; i < 100; i++ {
    wg.Add(1)
    go func() {
      defer wg.Done()
      atomic.AddInt32(&n, 1)
    }()
  }

  wg.Wait()
  fmt.Println(n)
}
`,
    lineNotes: {
      16: 'atomic.AddInt32 safely increments n even across goroutines.',
      20: 'We print the final count (deterministic).',
    },
    assignment: {
      title: 'Assignment: atomic add 3',
      prompt: 'Start 3 goroutines each adding 1 atomically. Print 3.',
      starterCode: `package main

import (
  "fmt"
  "sync"
  "sync/atomic"
)

func main() {
  var n int32
  var wg sync.WaitGroup
  for i := 0; i < 3; i++ {
    wg.Add(1)
    go func() {
      defer wg.Done()
      atomic.AddInt32(&n, 1)
    }()
  }
  wg.Wait()
  fmt.Println(n)
}
`,
      expectedStdout: '3\n',
    },
    docs: [{ title: 'Go by Example: Atomic Counters', url: makeExternalUrl('atomic-counters') }],
  },
  {
    id: 'mutexes',
    title: 'Mutexes',
    summary: 'Protect shared state with mutual exclusion.',
    definition: 'A mutex ensures only one goroutine accesses a critical section at a time.',
    context: 'Use mutexes for protecting complex shared state that can’t be updated atomically.',
    externalUrl: makeExternalUrl('mutexes'),
    code: `package main

import (
  "fmt"
  "sync"
)

func main() {
  var mu sync.Mutex
  n := 0
  var wg sync.WaitGroup

  for i := 0; i < 100; i++ {
    wg.Add(1)
    go func() {
      defer wg.Done()
      mu.Lock()
      n++
      mu.Unlock()
    }()
  }

  wg.Wait()
  fmt.Println(n)
}
`,
    lineNotes: {
      16: 'Lock protects the increment.',
      18: 'Unlock releases the mutex.',
      23: 'Final value is deterministic.',
    },
    assignment: {
      title: 'Assignment: mutex increment',
      prompt: 'Increment a shared counter in 5 goroutines using a mutex. Print 5.',
      starterCode: `package main

import (
  "fmt"
  "sync"
)

func main() {
  var mu sync.Mutex
  n := 0
  var wg sync.WaitGroup
  for i := 0; i < 5; i++ {
    wg.Add(1)
    go func() {
      defer wg.Done()
      mu.Lock()
      n++
      mu.Unlock()
    }()
  }
  wg.Wait()
  fmt.Println(n)
}
`,
      expectedStdout: '5\n',
    },
    docs: [{ title: 'Go by Example: Mutexes', url: makeExternalUrl('mutexes') }],
  },
  {
    id: 'stateful-goroutines',
    title: 'Stateful Goroutines',
    summary: 'Own state in a single goroutine and interact via channels.',
    definition: 'A stateful goroutine pattern centralizes state changes in one goroutine, reducing locking needs.',
    context: 'This can simplify concurrency by making state updates serialized via message passing.',
    externalUrl: makeExternalUrl('stateful-goroutines'),
    code: `package main

import "fmt"

type incReq struct{ resp chan int }

func main() {
  inc := make(chan incReq)

  // state owner
  go func() {
    n := 0
    for req := range inc {
      n++
      req.resp <- n
    }
  }()

  r1 := make(chan int, 1)
  inc <- incReq{resp: r1}
  fmt.Println(<-r1)
}
`,
    lineNotes: {
      9: 'One goroutine owns the state n.',
      11: 'Requests come in via a channel.',
      13: 'State update is serialized by the single goroutine.',
    },
    assignment: {
      title: 'Assignment: two increments',
      prompt: 'Send two increment requests and print the returned values (1 then 2).',
      starterCode: `package main

import "fmt"

type incReq struct{ resp chan int }

func main() {
  inc := make(chan incReq)
  go func() {
    n := 0
    for req := range inc {
      n++
      req.resp <- n
    }
  }()

  r := make(chan int, 1)
  inc <- incReq{resp: r}
  fmt.Println(<-r)
  inc <- incReq{resp: r}
  fmt.Println(<-r)
}
`,
      expectedStdout: '1\n2\n',
    },
    docs: [{ title: 'Go by Example: Stateful Goroutines', url: makeExternalUrl('stateful-goroutines') }],
  },
  {
    id: 'sorting',
    title: 'Sorting',
    summary: 'Sort slices of built-in types.',
    definition: 'The sort package provides helpers like sort.Ints and sort.Strings for common cases.',
    context: 'Sorting is a building block for searching, grouping, and presenting data.',
    externalUrl: makeExternalUrl('sorting'),
    code: `package main

import (
  "fmt"
  "sort"
)

func main() {
  xs := []int{3, 1, 2}
  sort.Ints(xs)
  fmt.Println(xs)
}
`,
    lineNotes: {
      10: 'sort.Ints sorts in ascending order.',
      11: 'Printing a slice shows elements in brackets.',
    },
    assignment: {
      title: 'Assignment: sort strings',
      prompt: 'Sort []string{"b","a","c"} and print it.',
      starterCode: `package main

import (
  "fmt"
  "sort"
)

func main() {
  s := []string{"b", "a", "c"}
  sort.Strings(s)
  fmt.Println(s)
}
`,
      expectedStdout: '[a b c]\n',
    },
    docs: [{ title: 'Go by Example: Sorting', url: makeExternalUrl('sorting') }],
  },
  {
    id: 'sorting-by-functions',
    title: 'Sorting by Functions',
    summary: 'Sort with custom logic using sort.Slice.',
    definition: 'sort.Slice lets you define a less(i,j) function to sort arbitrary slices.',
    context: 'Useful for sorting structs by a field or computed key.',
    externalUrl: makeExternalUrl('sorting-by-functions'),
    code: `package main

import (
  "fmt"
  "sort"
)

type Person struct {
  Name string
  Age  int
}

func main() {
  xs := []Person{{"Ada", 36}, {"Bob", 20}, {"Cat", 30}}
  sort.Slice(xs, func(i, j int) bool { return xs[i].Age < xs[j].Age })
  fmt.Println(xs[0].Name, xs[2].Name)
}
`,
    lineNotes: {
      16: 'sort.Slice uses the provided less function.',
      17: 'We print first and last names after sorting by Age.',
    },
    assignment: {
      title: 'Assignment: sort descending',
      prompt: 'Sort ints []int{1,3,2} descending using sort.Slice and print [3 2 1].',
      starterCode: `package main

import (
  "fmt"
  "sort"
)

func main() {
  xs := []int{1, 3, 2}
  sort.Slice(xs, func(i, j int) bool { return xs[i] > xs[j] })
  fmt.Println(xs)
}
`,
      expectedStdout: '[3 2 1]\n',
    },
    docs: [{ title: 'Go by Example: Sorting by Functions', url: makeExternalUrl('sorting-by-functions') }],
  },
  {
    id: 'panic',
    title: 'Panic',
    summary: 'Abort execution with panic (and why to avoid it for normal errors).',
    definition: 'panic stops normal control flow and begins unwinding the stack, running deferred calls.',
    context: 'Use panic for unrecoverable programmer errors; use error returns for expected failures.',
    externalUrl: makeExternalUrl('panic'),
    code: `package main

import "fmt"

func main() {
  fmt.Println("before")
  panic("boom")
}
`,
    lineNotes: {
      6: 'panic stops the program and prints a stack trace (in this runner, stderr will show details).',
    },
    assignment: {
      title: 'Assignment: show panic message',
      prompt: 'Panic with the message "stop". (You should see it in stderr.)',
      starterCode: `package main

func main() {
  panic("stop")
}
`,
    },
    docs: [{ title: 'Go by Example: Panic', url: makeExternalUrl('panic') }],
  },
  {
    id: 'defer',
    title: 'Defer',
    summary: 'Run a statement when the surrounding function returns.',
    definition: 'defer schedules a function call to run after the surrounding function finishes (even if it panics).',
    context: 'Use defer for cleanup: closing files, unlocking mutexes, stopping timers.',
    externalUrl: makeExternalUrl('defer'),
    code: `package main

import "fmt"

func main() {
  defer fmt.Println("cleanup")
  fmt.Println("work")
}
`,
    lineNotes: {
      6: 'Deferred call runs after main returns.',
      7: 'This prints first.',
    },
    assignment: {
      title: 'Assignment: two defers',
      prompt: 'Add two defers printing A then B. Observe LIFO order (B then A).',
      starterCode: `package main

import "fmt"

func main() {
  defer fmt.Println("A")
  defer fmt.Println("B")
  fmt.Println("work")
}
`,
      expectedStdout: 'work\nB\nA\n',
    },
    docs: [{ title: 'Go by Example: Defer', url: makeExternalUrl('defer') }],
  },
  {
    id: 'recover',
    title: 'Recover',
    summary: 'Catch a panic inside a deferred function.',
    definition: 'recover stops a panic and returns the panic value, but only when called from a deferred function.',
    context: 'Recover is used sparingly—usually at program boundaries (goroutine entrypoints, servers) to prevent crashes.',
    externalUrl: makeExternalUrl('recover'),
    code: `package main

import "fmt"

func main() {
  defer func() {
    if r := recover(); r != nil {
      fmt.Println("recovered:", r)
    }
  }()

  panic("boom")
}
`,
    lineNotes: {
      6: 'Deferred function runs during stack unwinding.',
      7: 'recover returns the panic value if there was a panic.',
      12: 'This panic will be recovered and won’t crash the program.',
    },
    assignment: {
      title: 'Assignment: recover message',
      prompt: 'Panic with "oops" and print recovered: oops.',
      starterCode: `package main

import "fmt"

func main() {
  defer func() {
    if r := recover(); r != nil {
      fmt.Println("recovered:", r)
    }
  }()
  panic("oops")
}
`,
      expectedStdout: 'recovered: oops\n',
    },
    docs: [{ title: 'Go by Example: Recover', url: makeExternalUrl('recover') }],
  },
  {
    id: 'string-functions',
    title: 'String Functions',
    summary: 'Common helpers from the strings package.',
    definition: 'The strings package provides utilities for searching, splitting, trimming, and transforming strings.',
    context: 'You’ll use these constantly for parsing input and building output.',
    externalUrl: makeExternalUrl('string-functions'),
    code: `package main

import (
  "fmt"
  "strings"
)

func main() {
  fmt.Println(strings.Contains("gopher", "go"))
  fmt.Println(strings.ToUpper("go"))
  fmt.Println(strings.Split("a,b,c", ","))
}
`,
    lineNotes: {
      9: 'Contains checks substring presence.',
      10: 'ToUpper transforms to uppercase.',
      11: 'Split returns a slice of parts.',
    },
    assignment: {
      title: 'Assignment: trim spaces',
      prompt: 'Use strings.TrimSpace to turn "  go  " into "go" and print it.',
      starterCode: `package main

import (
  "fmt"
  "strings"
)

func main() {
  fmt.Println(strings.TrimSpace("  go  "))
}
`,
      expectedStdout: 'go\n',
    },
    docs: [{ title: 'Go by Example: String Functions', url: makeExternalUrl('string-functions') }],
  },
  {
    id: 'string-formatting',
    title: 'String Formatting',
    summary: 'Format strings with fmt.Sprintf / Printf.',
    definition: 'Formatting inserts values into templates using verbs like %d, %s, %.2f.',
    context: 'Formatting is key for logs, CLIs, debugging, and user-facing messages.',
    externalUrl: makeExternalUrl('string-formatting'),
    code: `package main

import "fmt"

func main() {
  fmt.Printf("%s %d\n", "go", 2)
  fmt.Printf("%.2f\n", 3.14159)
}
`,
    lineNotes: {
      6: 'Printf uses format verbs; it does not add a newline unless you include \\n.',
      7: '%.2f formats a float with 2 decimal places.',
    },
    assignment: {
      title: 'Assignment: sprintf',
      prompt: 'Use fmt.Sprintf to build "x=7" and print it.',
      starterCode: `package main

import "fmt"

func main() {
  s := fmt.Sprintf("x=%d", 7)
  fmt.Println(s)
}
`,
      expectedStdout: 'x=7\n',
    },
    docs: [{ title: 'Go by Example: String Formatting', url: makeExternalUrl('string-formatting') }],
  },
  {
    id: 'text-templates',
    title: 'Text Templates',
    summary: 'Generate text using templates.',
    definition: 'text/template lets you create templates with placeholders and execute them with data.',
    context: 'Used for generating config files, messages, and structured text.',
    externalUrl: makeExternalUrl('text-templates'),
    code: `package main

import (
  "bytes"
  "fmt"
  "text/template"
)

func main() {
  t := template.Must(template.New("x").Parse("Hi {{.Name}}"))
  var b bytes.Buffer
  _ = t.Execute(&b, map[string]any{"Name": "Go"})
  fmt.Println(b.String())
}
`,
    lineNotes: {
      10: 'Parse template text with {{.Field}} placeholders.',
      12: 'Execute writes output to a writer (bytes.Buffer here).',
    },
    assignment: {
      title: 'Assignment: template number',
      prompt: 'Render "n=5" using a template and print it.',
      starterCode: `package main

import (
  "bytes"
  "fmt"
  "text/template"
)

func main() {
  t := template.Must(template.New("n").Parse("n={{.N}}"))
  var b bytes.Buffer
  _ = t.Execute(&b, map[string]any{"N": 5})
  fmt.Println(b.String())
}
`,
      expectedStdout: 'n=5\n',
    },
    docs: [{ title: 'Go by Example: Text Templates', url: makeExternalUrl('text-templates') }],
  },
  {
    id: 'regular-expressions',
    title: 'Regular Expressions',
    summary: 'Match and extract patterns with regexp.',
    definition: 'Regular expressions describe patterns in strings and can be used to match, find, or replace substrings.',
    context: 'Useful for validation, parsing, and searching when string functions aren’t enough.',
    externalUrl: makeExternalUrl('regular-expressions'),
    code: `package main

import (
  "fmt"
  "regexp"
)

func main() {
  r := regexp.MustCompile("a.*b")
  fmt.Println(r.MatchString("acb"))
  fmt.Println(r.MatchString("ab"))
}
`,
    lineNotes: {
      9: 'MustCompile panics if the regex is invalid.',
      10: 'MatchString returns true if the pattern matches.',
    },
    assignment: {
      title: 'Assignment: find digits',
      prompt: 'Use a regex to find the first number in "id=123". Print 123.',
      starterCode: `package main

import (
  "fmt"
  "regexp"
)

func main() {
  r := regexp.MustCompile("[0-9]+")
  fmt.Println(r.FindString("id=123"))
}
`,
      expectedStdout: '123\n',
    },
    docs: [{ title: 'Go by Example: Regular Expressions', url: makeExternalUrl('regular-expressions') }],
  },
  {
    id: 'json',
    title: 'JSON',
    summary: 'Encode/decode JSON with encoding/json.',
    definition: 'encoding/json converts Go values to JSON (marshal) and JSON to Go values (unmarshal).',
    context: 'JSON is everywhere: APIs, configs, logs.',
    externalUrl: makeExternalUrl('json'),
    code: `package main

import (
  "encoding/json"
  "fmt"
)

type User struct {
  Name string ` + "`json:\"name\"`" + `
  Age  int    ` + "`json:\"age\"`" + `
}

func main() {
  u := User{Name: "Go", Age: 1}
  b, _ := json.Marshal(u)
  fmt.Println(string(b))
}
`,
    lineNotes: {
      9: 'Struct tags control JSON field names.',
      15: 'json.Marshal returns bytes of JSON.',
    },
    assignment: {
      title: 'Assignment: marshal map',
      prompt: 'Marshal map[string]int{"x":1} and print {"x":1}.',
      starterCode: `package main

import (
  "encoding/json"
  "fmt"
)

func main() {
  b, _ := json.Marshal(map[string]int{"x": 1})
  fmt.Println(string(b))
}
`,
      expectedStdout: '{"x":1}\n',
    },
    docs: [{ title: 'Go by Example: JSON', url: makeExternalUrl('json') }],
  },
  {
    id: 'xml',
    title: 'XML',
    summary: 'Encode/decode XML with encoding/xml.',
    definition: 'encoding/xml marshals structs to XML and unmarshals XML into structs using tags.',
    context: 'XML appears in legacy APIs, configuration, and document formats.',
    externalUrl: makeExternalUrl('xml'),
    code: `package main

import (
  "encoding/xml"
  "fmt"
)

type Note struct {
  XMLName xml.Name ` + "`xml:\"note\"`" + `
  To      string   ` + "`xml:\"to\"`" + `
}

func main() {
  n := Note{To: "Go"}
  b, _ := xml.Marshal(n)
  fmt.Println(string(b))
}
`,
    lineNotes: {
      9: 'XML tags define element names.',
      14: 'xml.Marshal produces XML bytes.',
    },
    assignment: {
      title: 'Assignment: xml marshal',
      prompt: 'Marshal a Note{To:"You"} and print it.',
      starterCode: `package main

import (
  "encoding/xml"
  "fmt"
)

type Note struct {
  XMLName xml.Name ` + "`xml:\"note\"`" + `
  To      string   ` + "`xml:\"to\"`" + `
}

func main() {
  n := Note{To: "You"}
  b, _ := xml.Marshal(n)
  fmt.Println(string(b))
}
`,
      expectedStdout: '<note><to>You</to></note>\n',
    },
    docs: [{ title: 'Go by Example: XML', url: makeExternalUrl('xml') }],
  },
  {
    id: 'time',
    title: 'Time',
    summary: 'Work with time values deterministically.',
    definition: 'time.Time represents an instant in time, with methods for formatting and arithmetic.',
    context: 'Time is used for scheduling, timestamps, durations, and deadlines.',
    externalUrl: makeExternalUrl('time'),
    code: `package main

import (
  "fmt"
  "time"
)

func main() {
  t := time.Date(2020, 1, 2, 3, 4, 5, 0, time.UTC)
  fmt.Println(t.Year(), t.Month(), t.Day())
}
`,
    lineNotes: {
      9: 'Use time.Date for deterministic examples (no dependence on current clock).',
      10: 'Access parts of the time value.',
    },
    assignment: {
      title: 'Assignment: add duration',
      prompt: 'Create t := time.Date(...), add 2 hours, and print the hour (should be 5).',
      starterCode: `package main

import (
  "fmt"
  "time"
)

func main() {
  t := time.Date(2020, 1, 2, 3, 0, 0, 0, time.UTC)
  t2 := t.Add(2 * time.Hour)
  fmt.Println(t2.Hour())
}
`,
      expectedStdout: '5\n',
    },
    docs: [{ title: 'Go by Example: Time', url: makeExternalUrl('time') }],
  },
  {
    id: 'epoch',
    title: 'Epoch',
    summary: 'Convert to/from Unix seconds and milliseconds.',
    definition: 'Unix epoch time counts seconds since 1970-01-01T00:00:00Z.',
    context: 'Epoch timestamps are common in logs, APIs, and cross-language systems.',
    externalUrl: makeExternalUrl('epoch'),
    code: `package main

import (
  "fmt"
  "time"
)

func main() {
  t := time.Unix(10, 0).UTC()
  fmt.Println(t.Unix())
}
`,
    lineNotes: {
      9: 'Unix(seconds, nanos) creates a time.Time.',
      10: 'Unix() returns seconds since epoch.',
    },
    assignment: {
      title: 'Assignment: unix to time',
      prompt: 'Create time.Unix(0,0) and print its Unix seconds (0).',
      starterCode: `package main

import (
  "fmt"
  "time"
)

func main() {
  t := time.Unix(0, 0).UTC()
  fmt.Println(t.Unix())
}
`,
      expectedStdout: '0\n',
    },
    docs: [{ title: 'Go by Example: Epoch', url: makeExternalUrl('epoch') }],
  },
  {
    id: 'time-formatting-parsing',
    title: 'Time Formatting / Parsing',
    summary: 'Format and parse time using Go’s reference layout.',
    definition: 'Go uses a reference time layout (Mon Jan 2 15:04:05 MST 2006) to define formats.',
    context: 'Used for logs, APIs, and parsing timestamps from input.',
    externalUrl: makeExternalUrl('time-formatting-parsing'),
    code: `package main

import (
  "fmt"
  "time"
)

func main() {
  t := time.Date(2020, 1, 2, 3, 4, 5, 0, time.UTC)
  fmt.Println(t.Format("2006-01-02"))
}
`,
    lineNotes: {
      10: 'Format uses the special reference layout values to define output.',
    },
    assignment: {
      title: 'Assignment: parse date',
      prompt: 'Parse "2020-01-02" with layout "2006-01-02" and print the year (2020).',
      starterCode: `package main

import (
  "fmt"
  "time"
)

func main() {
  t, _ := time.Parse("2006-01-02", "2020-01-02")
  fmt.Println(t.Year())
}
`,
      expectedStdout: '2020\n',
    },
    docs: [{ title: 'Go by Example: Time Formatting / Parsing', url: makeExternalUrl('time-formatting-parsing') }],
  },
  {
    id: 'random-numbers',
    title: 'Random Numbers',
    summary: 'Generate pseudo-random numbers deterministically with a fixed seed.',
    definition: 'math/rand produces pseudo-random numbers. With a fixed seed, results are deterministic.',
    context: 'Use fixed seeds in tests; use crypto/rand for security-sensitive randomness.',
    externalUrl: makeExternalUrl('random-numbers'),
    code: `package main

import (
  "fmt"
  "math/rand"
)

func main() {
  r := rand.New(rand.NewSource(1))
  fmt.Println(r.Intn(10))
}
`,
    lineNotes: {
      9: 'NewSource(1) makes results deterministic for this example.',
    },
    assignment: {
      title: 'Assignment: deterministic Intn',
      prompt: 'Use rand.NewSource(1) and print r.Intn(10) (should be 1).',
      starterCode: `package main

import (
  "fmt"
  "math/rand"
)

func main() {
  r := rand.New(rand.NewSource(1))
  fmt.Println(r.Intn(10))
}
`,
      expectedStdout: '1\n',
    },
    docs: [{ title: 'Go by Example: Random Numbers', url: makeExternalUrl('random-numbers') }],
  },
  {
    id: 'number-parsing',
    title: 'Number Parsing',
    summary: 'Convert strings to numbers with strconv.',
    definition: 'strconv provides parsing functions like Atoi and ParseFloat to convert strings into numeric values.',
    context: 'Parsing is needed for CLI args, env vars, and text input.',
    externalUrl: makeExternalUrl('number-parsing'),
    code: `package main

import (
  "fmt"
  "strconv"
)

func main() {
  n, _ := strconv.Atoi("42")
  fmt.Println(n)
}
`,
    lineNotes: {
      9: 'Atoi converts decimal string to int.',
    },
    assignment: {
      title: 'Assignment: parse float',
      prompt: 'Parse "3.5" as float64 and print 3.5.',
      starterCode: `package main

import (
  "fmt"
  "strconv"
)

func main() {
  f, _ := strconv.ParseFloat("3.5", 64)
  fmt.Println(f)
}
`,
      expectedStdout: '3.5\n',
    },
    docs: [{ title: 'Go by Example: Number Parsing', url: makeExternalUrl('number-parsing') }],
  },
  {
    id: 'url-parsing',
    title: 'URL Parsing',
    summary: 'Parse URLs with net/url.',
    definition: 'net/url parses URLs into structured components: scheme, host, path, query, etc.',
    context: 'Useful for HTTP clients/servers and any code handling URLs safely.',
    externalUrl: makeExternalUrl('url-parsing'),
    code: `package main

import (
  "fmt"
  "net/url"
)

func main() {
  u, _ := url.Parse("https://example.com/a?x=1")
  fmt.Println(u.Scheme, u.Host, u.Path, u.Query().Get("x"))
}
`,
    lineNotes: {
      10: 'Parse returns a URL struct.',
      11: 'Query() parses query parameters; Get reads a key.',
    },
    assignment: {
      title: 'Assignment: parse host',
      prompt: 'Parse "https://go.dev/" and print the host (go.dev).',
      starterCode: `package main

import (
  "fmt"
  "net/url"
)

func main() {
  u, _ := url.Parse("https://go.dev/")
  fmt.Println(u.Host)
}
`,
      expectedStdout: 'go.dev\n',
    },
    docs: [{ title: 'Go by Example: URL Parsing', url: makeExternalUrl('url-parsing') }],
  },
  {
    id: 'sha256-hashes',
    title: 'SHA256 Hashes',
    summary: 'Compute SHA256 digests.',
    definition: 'SHA-256 is a cryptographic hash function producing a 32-byte digest.',
    context: 'Use hashes for integrity checks and content addressing (not for passwords).',
    externalUrl: makeExternalUrl('sha256-hashes'),
    code: `package main

import (
  "crypto/sha256"
  "fmt"
)

func main() {
  sum := sha256.Sum256([]byte("go"))
  fmt.Printf("%x\n", sum)
}
`,
    lineNotes: {
      9: 'Sum256 returns a [32]byte digest.',
      10: '%x prints bytes as lowercase hex.',
    },
    assignment: {
      title: 'Assignment: sha256 of "a"',
      prompt: 'Compute sha256.Sum256([]byte("a")) and print it as hex.',
      starterCode: `package main

import (
  "crypto/sha256"
  "fmt"
)

func main() {
  sum := sha256.Sum256([]byte("a"))
  fmt.Printf("%x\n", sum)
}
`,
    },
    docs: [{ title: 'Go by Example: SHA256 Hashes', url: makeExternalUrl('sha256-hashes') }],
  },
  {
    id: 'base64-encoding',
    title: 'Base64 Encoding',
    summary: 'Encode/decode data using base64.',
    definition: 'Base64 encodes binary data into ASCII text, commonly used in tokens and transport formats.',
    context: 'Useful for embedding bytes in JSON, URLs, headers, etc.',
    externalUrl: makeExternalUrl('base64-encoding'),
    code: `package main

import (
  "encoding/base64"
  "fmt"
)

func main() {
  enc := base64.StdEncoding.EncodeToString([]byte("go"))
  fmt.Println(enc)
}
`,
    lineNotes: {
      9: 'EncodeToString returns base64 text.',
    },
    assignment: {
      title: 'Assignment: encode "hi"',
      prompt: 'Base64-encode "hi" and print aGk=.',
      starterCode: `package main

import (
  "encoding/base64"
  "fmt"
)

func main() {
  fmt.Println(base64.StdEncoding.EncodeToString([]byte("hi")))
}
`,
      expectedStdout: 'aGk=\n',
    },
    docs: [{ title: 'Go by Example: Base64 Encoding', url: makeExternalUrl('base64-encoding') }],
  },
  {
    id: 'reading-files',
    title: 'Reading Files',
    summary: 'Read data (in this browser runner, we demonstrate reading from an in-memory reader).',
    definition: 'Reading files typically uses os.ReadFile or bufio.Reader. In a browser WASM runner, direct filesystem access is limited.',
    context: 'The key idea is reading bytes from an io.Reader; real file APIs are similar but use os.File.',
    externalUrl: makeExternalUrl('reading-files'),
    code: `package main

import (
  "fmt"
  "io"
  "strings"
)

func main() {
  r := strings.NewReader("hello")
  b, _ := io.ReadAll(r)
  fmt.Println(string(b))
}
`,
    lineNotes: {
      9: 'We use strings.NewReader to simulate a file-like reader in this environment.',
      10: 'io.ReadAll reads all bytes from the reader.',
    },
    assignment: {
      title: 'Assignment: read and print',
      prompt: 'Read "go" from a strings.NewReader and print it.',
      starterCode: `package main

import (
  "fmt"
  "io"
  "strings"
)

func main() {
  r := strings.NewReader("go")
  b, _ := io.ReadAll(r)
  fmt.Println(string(b))
}
`,
      expectedStdout: 'go\n',
    },
    docs: [{ title: 'Go by Example: Reading Files', url: makeExternalUrl('reading-files') }],
  },
  {
    id: 'writing-files',
    title: 'Writing Files',
    summary: 'Write data (in this browser runner, we demonstrate writing to an in-memory buffer).',
    definition: 'Writing files usually uses os.WriteFile or an io.Writer. In this runner we use bytes.Buffer as the writer.',
    context: 'The core idea is writing bytes to an io.Writer; real files also implement io.Writer.',
    externalUrl: makeExternalUrl('writing-files'),
    code: `package main

import (
  "bytes"
  "fmt"
)

func main() {
  var b bytes.Buffer
  b.WriteString("hi")
  fmt.Println(b.String())
}
`,
    lineNotes: {
      9: 'bytes.Buffer is an in-memory writer.',
      10: 'WriteString appends to the buffer.',
    },
    assignment: {
      title: 'Assignment: write "go"',
      prompt: 'Write "go" into a bytes.Buffer and print it.',
      starterCode: `package main

import (
  "bytes"
  "fmt"
)

func main() {
  var b bytes.Buffer
  b.WriteString("go")
  fmt.Println(b.String())
}
`,
      expectedStdout: 'go\n',
    },
    docs: [{ title: 'Go by Example: Writing Files', url: makeExternalUrl('writing-files') }],
  },
  {
    id: 'line-filters',
    title: 'Line Filters',
    summary: 'Process input line by line and filter.',
    definition: 'Line filtering reads input line-by-line, transforms or filters lines, and writes output.',
    context: 'Common in CLIs, ETL, log processing, and streaming parsers.',
    externalUrl: makeExternalUrl('line-filters'),
    code: `package main

import (
  "bufio"
  "fmt"
  "strings"
)

func main() {
  input := "a\nskip\nb\n"
  s := bufio.NewScanner(strings.NewReader(input))
  for s.Scan() {
    line := s.Text()
    if line == "skip" {
      continue
    }
    fmt.Println(line)
  }
}
`,
    lineNotes: {
      11: 'Scanner reads input line by line.',
      14: 'continue skips the current line.',
    },
    assignment: {
      title: 'Assignment: filter empty lines',
      prompt: 'Given input "a\\n\\n b\\n", print only non-empty trimmed lines (a and b).',
      starterCode: `package main

import (
  "bufio"
  "fmt"
  "strings"
)

func main() {
  input := "a\\n\\n b\\n"
  s := bufio.NewScanner(strings.NewReader(input))
  for s.Scan() {
    line := strings.TrimSpace(s.Text())
    if line == "" {
      continue
    }
    fmt.Println(line)
  }
}
`,
      expectedStdout: 'a\nb\n',
    },
    docs: [{ title: 'Go by Example: Line Filters', url: makeExternalUrl('line-filters') }],
  },
  {
    id: 'file-paths',
    title: 'File Paths',
    summary: 'Build, split, and clean file paths with filepath.',
    definition: 'File paths are strings that represent locations. filepath helps you join, clean, and split paths portably.',
    context: 'In the browser runner we can’t access a real filesystem, but path manipulation is still fully runnable.',
    externalUrl: makeExternalUrl('file-paths'),
    code: `package main

import (
  "fmt"
  "path/filepath"
)

func main() {
  p := filepath.Join("a", "b", "c.txt")
  fmt.Println(p)
  fmt.Println(filepath.Base(p))
  fmt.Println(filepath.Dir(p))
  fmt.Println(filepath.Clean("a/../b/./c"))
}
`,
    lineNotes: {
      9: 'Join builds a path using the OS separator.',
      10: 'Base returns the last element.',
      11: 'Dir returns everything except the last element.',
      12: 'Clean simplifies . and .. segments.',
    },
    assignment: {
      title: 'Assignment: join and base',
      prompt: 'Join "x" and "y.txt", then print Base() (y.txt).',
      starterCode: `package main

import (
  "fmt"
  "path/filepath"
)

func main() {
  p := filepath.Join("x", "y.txt")
  fmt.Println(filepath.Base(p))
}
`,
      expectedStdout: 'y.txt\n',
    },
    docs: [{ title: 'Go by Example: File Paths', url: makeExternalUrl('file-paths') }],
  },
  {
    id: 'directories',
    title: 'Directories',
    summary: 'Walk a directory tree (simulated) using io/fs.',
    definition: 'Directory traversal lists files and folders and visits nested paths.',
    context:
      'In this browser runner we simulate a filesystem using testing/fstest.MapFS and walk it with fs.WalkDir (same APIs you’d use with real files).',
    externalUrl: makeExternalUrl('directories'),
    code: `package main

import (
  "fmt"
  "io/fs"
  "testing/fstest"
)

func main() {
  m := fstest.MapFS{
    "dir/a.txt": {Data: []byte("a")},
    "dir/b.txt": {Data: []byte("b")},
    "dir/sub/c.txt": {Data: []byte("c")},
  }

  fs.WalkDir(m, ".", func(path string, d fs.DirEntry, err error) error {
    if err != nil {
      return err
    }
    fmt.Println(path)
    return nil
  })
}
`,
    lineNotes: {
      10: 'MapFS is an in-memory filesystem for tests and examples.',
      16: 'WalkDir visits every path in a tree.',
      22: 'Printing each path shows the traversal order.',
    },
    assignment: {
      title: 'Assignment: walk and count',
      prompt: 'Walk an in-memory tree and print how many paths were visited.',
      starterCode: `package main

import (
  "fmt"
  "io/fs"
  "testing/fstest"
)

func main() {
  m := fstest.MapFS{
    "a.txt": {Data: []byte("a")},
    "b.txt": {Data: []byte("b")},
  }
  n := 0
  fs.WalkDir(m, ".", func(path string, d fs.DirEntry, err error) error {
    if err != nil { return err }
    n++
    return nil
  })
  fmt.Println(n)
}
`,
      expectedStdout: '3\n',
    },
    docs: [{ title: 'Go by Example: Directories', url: makeExternalUrl('directories') }],
  },
  {
    id: 'temporary-files-and-directories',
    title: 'Temporary Files and Directories',
    summary: 'Create temporary locations (simulated) for scratch work.',
    definition: 'Temp files/dirs are safe, unique scratch locations typically created with os.CreateTemp / os.MkdirTemp.',
    context:
      'The browser runner has no real OS temp dir; we demonstrate the concept by generating unique names and writing into an in-memory MapFS.',
    externalUrl: makeExternalUrl('temporary-files-and-directories'),
    code: `package main

import (
  "fmt"
  "testing/fstest"
)

func main() {
  // Simulate temp naming and writing.
  tmpDir := "tmp-123"
  tmpFile := tmpDir + "/note.txt"
  m := fstest.MapFS{
    tmpFile: {Data: []byte("hello")},
  }
  fmt.Println(tmpDir)
  fmt.Println(tmpFile)
  fmt.Println(string(m[tmpFile].Data))
}
`,
    lineNotes: {
      9: 'We simulate temp paths with unique-looking names.',
      11: 'MapFS stores file data in-memory.',
      15: 'Print what we “wrote” to the temp file.',
    },
    assignment: {
      title: 'Assignment: temp file name',
      prompt: 'Create a tempDir string and tempFile path string and print tempFile.',
      starterCode: `package main

import "fmt"

func main() {
  tempDir := "tmp-999"
  tempFile := tempDir + "/x.txt"
  fmt.Println(tempFile)
}
`,
      expectedStdout: 'tmp-999/x.txt\n',
    },
    docs: [{ title: 'Go by Example: Temporary Files and Directories', url: makeExternalUrl('temporary-files-and-directories') }],
  },
  {
    id: 'embed-directive',
    title: 'Embed Directive',
    summary: 'Bundle files into your program at build time.',
    definition: 'The //go:embed directive lets you include file contents in the compiled binary.',
    context:
      'Embed is a compile-time feature and is not supported by this interpreter-based runner. We simulate embedding by using a const string as “embedded content.”',
    externalUrl: makeExternalUrl('embed-directive'),
    code: `package main

import "fmt"

func main() {
  // Simulated embedded content.
  const embedded = "hello-from-embed"
  fmt.Println(embedded)
}
`,
    lineNotes: {
      6: 'In a real Go program you would use //go:embed to load file contents into a variable.',
      7: 'Here we simulate embedded content with a constant.',
    },
    assignment: {
      title: 'Assignment: simulate embed',
      prompt: 'Set const embedded = "data" and print it.',
      starterCode: `package main

import "fmt"

func main() {
  const embedded = "data"
  fmt.Println(embedded)
}
`,
      expectedStdout: 'data\n',
    },
    docs: [{ title: 'Go by Example: Embed Directive', url: makeExternalUrl('embed-directive') }],
  },
  {
    id: 'testing-and-benchmarking',
    title: 'Testing and Benchmarking',
    summary: 'Write tests and benchmarks (simulated).',
    definition: 'Go tests normally live in *_test.go files and run via `go test`. Benchmarks measure performance.',
    context:
      'This browser runner can’t run `go test`, so we demonstrate the testing mindset: write a function, check expected vs actual, and print PASS/FAIL.',
    externalUrl: makeExternalUrl('testing-and-benchmarking'),
    code: `package main

import "fmt"

func add(a, b int) int { return a + b }

func assertEq(name string, got, want int) {
  if got == want {
    fmt.Println("PASS", name)
  } else {
    fmt.Println("FAIL", name, "got", got, "want", want)
  }
}

func main() {
  assertEq("add", add(2, 3), 5)
}
`,
    lineNotes: {
      5: 'This is the function under test.',
      7: 'A tiny assertion helper prints PASS/FAIL.',
      16: 'Run the assertion in main for a runnable demo.',
    },
    assignment: {
      title: 'Assignment: add test',
      prompt: 'Add an assertion that add(1,1) == 2 and print PASS.',
      starterCode: `package main

import "fmt"

func add(a, b int) int { return a + b }

func assertEq(name string, got, want int) {
  if got == want {
    fmt.Println("PASS", name)
  } else {
    fmt.Println("FAIL", name, "got", got, "want", want)
  }
}

func main() {
  assertEq("one", add(1, 1), 2)
}
`,
      expectedStdout: 'PASS one\n',
    },
    docs: [{ title: 'Go by Example: Testing and Benchmarking', url: makeExternalUrl('testing-and-benchmarking') }],
  },
  {
    id: 'command-line-arguments',
    title: 'Command-Line Arguments',
    summary: 'Read os.Args (simulated).',
    definition: 'os.Args contains the program name and command-line arguments.',
    context: 'CLIs use os.Args directly or via flag parsing. In this runner we simulate args by assigning to os.Args.',
    externalUrl: makeExternalUrl('command-line-arguments'),
    code: `package main

import (
  "fmt"
  "os"
)

func main() {
  os.Args = []string{"app", "a", "b"}
  fmt.Println(os.Args[1], os.Args[2])
}
`,
    lineNotes: {
      9: 'We set os.Args for a deterministic demo.',
      10: 'Index 0 is program name; args start at 1.',
    },
    assignment: {
      title: 'Assignment: print first arg',
      prompt: 'Set os.Args = []string{"app","x"} and print the first arg (x).',
      starterCode: `package main

import (
  "fmt"
  "os"
)

func main() {
  os.Args = []string{"app", "x"}
  fmt.Println(os.Args[1])
}
`,
      expectedStdout: 'x\n',
    },
    docs: [{ title: 'Go by Example: Command-Line Arguments', url: makeExternalUrl('command-line-arguments') }],
  },
  {
    id: 'command-line-flags',
    title: 'Command-Line Flags',
    summary: 'Parse flags with the flag package (simulated).',
    definition: 'Flags are named options like -n=10. The flag package parses args into typed variables.',
    context: 'Most Go CLIs use flag or a higher-level library. Here we parse a simulated argv slice.',
    externalUrl: makeExternalUrl('command-line-flags'),
    code: `package main

import (
  "flag"
  "fmt"
)

func main() {
  fs := flag.NewFlagSet("app", flag.ContinueOnError)
  n := fs.Int("n", 0, "number")
  _ = fs.Parse([]string{"-n=7"})
  fmt.Println(*n)
}
`,
    lineNotes: {
      9: 'A FlagSet lets us parse custom args (without touching real os.Args).',
      10: 'Int flag binds to an *int.',
      11: 'Parse reads the provided args.',
    },
    assignment: {
      title: 'Assignment: parse -name',
      prompt: 'Parse -name=go and print go.',
      starterCode: `package main

import (
  "flag"
  "fmt"
)

func main() {
  fs := flag.NewFlagSet("app", flag.ContinueOnError)
  name := fs.String("name", "", "name")
  _ = fs.Parse([]string{"-name=go"})
  fmt.Println(*name)
}
`,
      expectedStdout: 'go\n',
    },
    docs: [{ title: 'Go by Example: Command-Line Flags', url: makeExternalUrl('command-line-flags') }],
  },
  {
    id: 'command-line-subcommands',
    title: 'Command-Line Subcommands',
    summary: 'Implement subcommands by selecting a FlagSet.',
    definition: 'Subcommands are verbs like `git commit`. In Go, you often parse the first arg and dispatch to a FlagSet per command.',
    context: 'This pattern scales a CLI while keeping each command’s flags isolated.',
    externalUrl: makeExternalUrl('command-line-subcommands'),
    code: `package main

import (
  "flag"
  "fmt"
)

func main() {
  args := []string{"serve", "-port=8080"}
  cmd := args[0]

  switch cmd {
  case "serve":
    fs := flag.NewFlagSet("serve", flag.ContinueOnError)
    port := fs.Int("port", 0, "port")
    _ = fs.Parse(args[1:])
    fmt.Println("serve", *port)
  default:
    fmt.Println("unknown")
  }
}
`,
    lineNotes: {
      8: 'args simulates argv.',
      12: 'Dispatch based on the subcommand name.',
      15: 'Each subcommand has its own FlagSet.',
    },
    assignment: {
      title: 'Assignment: echo subcommand',
      prompt: 'Implement cmd="echo" with flag -msg and print: echo <msg>.',
      starterCode: `package main

import (
  "flag"
  "fmt"
)

func main() {
  args := []string{\"echo\", \"-msg=hi\"}
  cmd := args[0]
  switch cmd {
  case \"echo\":
    fs := flag.NewFlagSet(\"echo\", flag.ContinueOnError)
    msg := fs.String(\"msg\", \"\", \"msg\")
    _ = fs.Parse(args[1:])
    fmt.Println(\"echo\", *msg)
  default:
    fmt.Println(\"unknown\")\n  }\n}\n`,
      expectedStdout: 'echo hi\n',
    },
    docs: [{ title: 'Go by Example: Command-Line Subcommands', url: makeExternalUrl('command-line-subcommands') }],
  },
  {
    id: 'environment-variables',
    title: 'Environment Variables',
    summary: 'Read and set env vars (simulated).',
    definition: 'Environment variables are key/value strings passed to processes for configuration.',
    context:
      'In the browser runner, OS env access may be limited; we demonstrate the pattern using a map (same lookup logic as os.Getenv).',
    externalUrl: makeExternalUrl('environment-variables'),
    code: `package main

import "fmt"

func getenv(env map[string]string, key string) string {
  if v, ok := env[key]; ok {
    return v
  }
  return ""
}

func main() {
  env := map[string]string{"MODE": "dev"}
  fmt.Println(getenv(env, "MODE"))
}
`,
    lineNotes: {
      5: 'getenv mimics os.Getenv behavior.',
      12: 'Look up config from a map for a deterministic demo.',
    },
    assignment: {
      title: 'Assignment: default env',
      prompt: 'If MODE is missing, print "prod".',
      starterCode: `package main

import "fmt"

func main() {
  env := map[string]string{}
  mode, ok := env["MODE"]
  if !ok || mode == "" {
    mode = "prod"
  }
  fmt.Println(mode)
}
`,
      expectedStdout: 'prod\n',
    },
    docs: [{ title: 'Go by Example: Environment Variables', url: makeExternalUrl('environment-variables') }],
  },
  {
    id: 'logging',
    title: 'Logging',
    summary: 'Write logs with the log package (deterministic).',
    definition: 'The log package prints timestamped messages by default; you can configure flags and output.',
    context: 'Logging is used for observability and debugging. Deterministic logs are helpful in tests.',
    externalUrl: makeExternalUrl('logging'),
    code: `package main

import (
  "log"
)

func main() {
  log.SetFlags(0)
  log.Println("hello")
}
`,
    lineNotes: {
      8: 'Disable timestamps for deterministic output.',
      9: 'Print a log line (goes to stderr).',
    },
    assignment: {
      title: 'Assignment: log prefix',
      prompt: 'Set a prefix "APP " and print one log line "ok". Output should start with APP.',
      starterCode: `package main

import "log"

func main() {
  log.SetFlags(0)
  log.SetPrefix("APP ")
  log.Println("ok")
}
`,
    },
    docs: [{ title: 'Go by Example: Logging', url: makeExternalUrl('logging') }],
  },
  {
    id: 'http-client',
    title: 'HTTP Client',
    summary: 'Build an HTTP request (simulated; no real network).',
    definition: 'An HTTP client builds requests and reads responses. In real Go, http.Client.Do sends the request over the network.',
    context:
      'Browsers can’t open raw sockets from this runner. We demonstrate client basics: building a request and inspecting method/URL/headers.',
    externalUrl: makeExternalUrl('http-client'),
    code: `package main

import (
  "fmt"
  "net/http"
)

func main() {
  req, _ := http.NewRequest("GET", "https://example.com/path?x=1", nil)
  req.Header.Set("User-Agent", "gamecode")
  fmt.Println(req.Method)
  fmt.Println(req.URL.Host)
  fmt.Println(req.URL.Path)
  fmt.Println(req.URL.Query().Get("x"))
  fmt.Println(req.Header.Get("User-Agent"))
}
`,
    lineNotes: {
      9: 'NewRequest builds a structured request object.',
      10: 'Headers are key/value pairs (can have multiple values).',
      11: 'Method, URL parts, and query parsing are deterministic.',
    },
    assignment: {
      title: 'Assignment: POST request',
      prompt: 'Create a POST request to https://go.dev/ and print method and host.',
      starterCode: `package main

import (
  "fmt"
  "net/http"
)

func main() {
  req, _ := http.NewRequest("POST", "https://go.dev/", nil)
  fmt.Println(req.Method)
  fmt.Println(req.URL.Host)
}
`,
      expectedStdout: 'POST\ngo.dev\n',
    },
    docs: [{ title: 'Go by Example: HTTP Client', url: makeExternalUrl('http-client') }],
  },
  {
    id: 'http-server',
    title: 'HTTP Server',
    summary: 'Handle HTTP requests (simulated in-memory with httptest).',
    definition: 'An HTTP server routes requests to handlers that write status, headers, and a body.',
    context:
      'We simulate a server by calling a handler with an in-memory request/response (httptest), which is runnable without opening network ports.',
    externalUrl: makeExternalUrl('http-server'),
    code: `package main

import (
  "fmt"
  "net/http"
  "net/http/httptest"
)

func main() {
  h := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "hi")
  })

  rr := httptest.NewRecorder()
  req := httptest.NewRequest("GET", "http://example/", nil)
  h.ServeHTTP(rr, req)
  fmt.Println(rr.Body.String())
}
`,
    lineNotes: {
      10: 'A handler writes the response using w.',
      14: 'Recorder captures the response in memory.',
      15: 'NewRequest builds an in-memory request object.',
      17: 'Print the captured response body.',
    },
    assignment: {
      title: 'Assignment: return JSON',
      prompt: 'Make the handler respond with {"ok":true} and print the body.',
      starterCode: `package main

import (
  "fmt"
  "net/http"
  "net/http/httptest"
)

func main() {
  h := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    fmt.Fprint(w, \"{\\\"ok\\\":true}\")
  })

  rr := httptest.NewRecorder()
  req := httptest.NewRequest(\"GET\", \"http://example/\", nil)
  h.ServeHTTP(rr, req)
  fmt.Println(rr.Body.String())
}
`,
      expectedStdout: '{"ok":true}\n',
    },
    docs: [{ title: 'Go by Example: HTTP Server', url: makeExternalUrl('http-server') }],
  },
  {
    id: 'tcp-server',
    title: 'TCP Server',
    summary: 'Read/write bytes over a connection (simulated with net.Pipe).',
    definition: 'TCP is a byte-stream protocol. Servers accept connections and read/write bytes.',
    context: 'In-browser we simulate a TCP connection using net.Pipe (an in-memory connection).',
    externalUrl: makeExternalUrl('tcp-server'),
    code: `package main

import (
  "bufio"
  "fmt"
  "net"
)

func main() {
  server, client := net.Pipe()

  go func() {
    r := bufio.NewReader(server)
    line, _ := r.ReadString('\\n')
    fmt.Fprint(server, "echo:"+line)
    server.Close()
  }()

  fmt.Fprint(client, "hi\\n")
  out, _ := bufio.NewReader(client).ReadString('\\n')
  fmt.Print(out)
  client.Close()
}
`,
    lineNotes: {
      11: 'net.Pipe returns two ends of an in-memory connection.',
      14: 'Server reads a line, then writes a response.',
      20: 'Client writes, then reads the response.',
    },
    assignment: {
      title: 'Assignment: send ping',
      prompt: 'Send "ping\\n" and print the echoed response "echo:ping".',
      starterCode: `package main

import (
  "bufio"
  "fmt"
  "net"
)

func main() {
  server, client := net.Pipe()
  go func() {
    r := bufio.NewReader(server)
    line, _ := r.ReadString('\\n')
    fmt.Fprint(server, \"echo:\"+line)
    server.Close()
  }()
  fmt.Fprint(client, \"ping\\n\")
  out, _ := bufio.NewReader(client).ReadString('\\n')
  fmt.Print(out)
  client.Close()
}
`,
      expectedStdout: 'echo:ping\n',
    },
    docs: [{ title: 'Go by Example: TCP Server', url: makeExternalUrl('tcp-server') }],
  },
  {
    id: 'context',
    title: 'Context',
    summary: 'Carry deadlines/cancellation signals through call chains.',
    definition: 'context.Context is passed to functions to signal cancellation, deadlines, and request-scoped values.',
    context: 'Contexts are standard in servers and concurrent pipelines.',
    externalUrl: makeExternalUrl('context'),
    code: `package main

import (
  "context"
  "fmt"
)

func main() {
  ctx, cancel := context.WithCancel(context.Background())
  cancel()
  <-ctx.Done()
  fmt.Println("canceled")
}
`,
    lineNotes: {
      9: 'WithCancel returns a derived context and a cancel function.',
      10: 'Calling cancel closes Done.',
      11: 'Done is a channel that closes when canceled.',
    },
    assignment: {
      title: 'Assignment: value in context',
      prompt: 'Store a value in context.WithValue and print it.',
      starterCode: `package main

import (
  "context"
  "fmt"
)

func main() {
  ctx := context.WithValue(context.Background(), \"k\", \"v\")
  fmt.Println(ctx.Value(\"k\"))
}
`,
      expectedStdout: 'v\n',
    },
    docs: [{ title: 'Go by Example: Context', url: makeExternalUrl('context') }],
  },
  {
    id: 'spawning-processes',
    title: 'Spawning Processes',
    summary: 'Build an exec.Cmd (simulated; no real OS processes here).',
    definition: 'os/exec runs external programs by spawning processes and capturing output.',
    context:
      'The browser runner can’t spawn OS processes. We demonstrate the API shape by constructing an exec.Cmd and printing its fields.',
    externalUrl: makeExternalUrl('spawning-processes'),
    code: `package main

import (
  "fmt"
  "os/exec"
)

func main() {
  cmd := exec.Command("echo", "hi")
  fmt.Println(cmd.Path)
  fmt.Println(cmd.Args[0], cmd.Args[1])
}
`,
    lineNotes: {
      9: 'Command builds a command configuration.',
      10: 'Path and Args show what would be executed.',
    },
    assignment: {
      title: 'Assignment: build cmd',
      prompt: 'Construct exec.Command("ls","-la") and print cmd.Args length (2).',
      starterCode: `package main

import (
  "fmt"
  "os/exec"
)

func main() {
  cmd := exec.Command(\"ls\", \"-la\")
  fmt.Println(len(cmd.Args))
}
`,
      expectedStdout: '2\n',
    },
    docs: [{ title: 'Go by Example: Spawning Processes', url: makeExternalUrl('spawning-processes') }],
  },
  {
    id: 'execing-processes',
    title: "Exec'ing Processes",
    summary: 'Replace the current process image with another program (simulated).',
    definition:
      "Exec'ing a process means replacing the currently running program with another program (unlike spawning, which starts a child process).",
    context:
      "In normal Go on an OS, you can use syscall.Exec to replace the current process. In this browser/WASM runner we simulate the idea by showing the command/args that would be exec'd.",
    externalUrl: makeExternalUrl('execing-processes'),
    code: `package main

import (
  "fmt"
  "os/exec"
)

func main() {
  // Build a command configuration (like spawning).
  cmd := exec.Command("echo", "hi")

  // Exec'ing would replace the current process with cmd.Path/cmd.Args.
  // We do NOT call syscall.Exec here because it would terminate the runner.
  fmt.Println("would exec:", cmd.Args[0], cmd.Args[1])
}
`,
    lineNotes: {
      9: 'exec.Command builds the program name + args.',
      11: 'syscall.Exec (on a real OS) would replace the current program with this new program.',
      13: 'We print what would be executed to keep this demo runnable.',
    },
    assignment: {
      title: "Assignment: build an exec plan",
      prompt: 'Create exec.Command("ls","-la") and print: would exec: ls -la',
      starterCode: `package main

import (
  "fmt"
  "os/exec"
)

func main() {
  cmd := exec.Command("ls", "-la")
  fmt.Println("would exec:", cmd.Args[0], cmd.Args[1])
}
`,
      expectedStdout: 'would exec: ls -la\n',
    },
    docs: [{ title: "Go by Example: Exec'ing Processes", url: makeExternalUrl('execing-processes') }],
  },
  {
    id: 'signals',
    title: 'Signals',
    summary: 'Handle signals (simulated).',
    definition: 'Signals are OS-level notifications like SIGINT. Go programs can listen and react to signals.',
    context:
      'Browsers don’t deliver OS signals. We simulate signal handling by sending a value into a channel and reacting to it.',
    externalUrl: makeExternalUrl('signals'),
    code: `package main

import (
  "fmt"
  "os"
)

func main() {
  sigs := make(chan os.Signal, 1)
  sigs <- os.Interrupt
  s := <-sigs
  fmt.Println(s)
}
`,
    lineNotes: {
      10: 'We push a simulated signal value into the channel.',
      12: 'Print the signal (usually "interrupt").',
    },
    assignment: {
      title: 'Assignment: simulate signal',
      prompt: 'Send os.Kill into a channel and print it.',
      starterCode: `package main

import (
  "fmt"
  "os"
)

func main() {
  sigs := make(chan os.Signal, 1)
  sigs <- os.Kill
  fmt.Println(<-sigs)
}
`,
      expectedStdout: 'killed\n',
    },
    docs: [{ title: 'Go by Example: Signals', url: makeExternalUrl('signals') }],
  },
  {
    id: 'exit',
    title: 'Exit',
    summary: 'Exit with a status code (simulated).',
    definition: 'os.Exit(code) terminates the program immediately with an exit status.',
    context:
      'Calling os.Exit would kill the in-browser runner. We simulate exit codes by setting a variable and printing it.',
    externalUrl: makeExternalUrl('exit'),
    code: `package main

import "fmt"

func main() {
  exitCode := 2
  fmt.Println(exitCode)
}
`,
    lineNotes: {
      6: 'In a real CLI you would call os.Exit(2). Here we just print the code to keep the runner alive.',
    },
    assignment: {
      title: 'Assignment: exit 0',
      prompt: 'Set exitCode := 0 and print it.',
      starterCode: `package main

import "fmt"

func main() {
  exitCode := 0
  fmt.Println(exitCode)
}
`,
      expectedStdout: '0\n',
    },
    docs: [{ title: 'Go by Example: Exit', url: makeExternalUrl('exit') }],
  },
]

// Add the rest of Go by Example topics as navigable items with original (non-copied) definitions/context.
// We intentionally do NOT copy Go by Example text/code verbatim. Each topic links out for reference.
for (const item of GOBYEXAMPLE_CATALOG) {
  const id = item.slug
  if (TOPICS.some((t) => t.id === id)) continue
  TOPICS.push({
    id,
    title: item.title,
    summary: 'Interactive walkthrough coming soon. Use the external reference link for now.',
    definition: makeGenericDefinition(item.title),
    context: makeGenericContext(item.title),
    externalUrl: makeExternalUrl(item.slug),
  })
}


