# Slices + `append`

## What you learned
- A slice is a dynamic view over an array.
- `append` returns a **new** slice (so assign it back).
- Index with `xs[i]`, and use `len(xs)` for length.

## Example

```go
xs := []int{1, 2}
xs = append(xs, 3)
fmt.Println(xs[0], xs[len(xs)-1])
```

## Try this
- Append 4 and 5.
- Print the whole slice with `fmt.Println(xs)`.


