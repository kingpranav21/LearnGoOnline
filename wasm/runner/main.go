package main

import (
	"bytes"
	"fmt"
	"strings"
	"syscall/js"

	"github.com/traefik/yaegi/interp"
	"github.com/traefik/yaegi/stdlib"
)

func run(code string) (stdout string, stderr string) {
	var outBuf bytes.Buffer
	var errBuf bytes.Buffer

	i := interp.New(interp.Options{
		Stdout: &outBuf,
		Stderr: &errBuf,
	})

	// Standard library symbols so snippets can import fmt, etc.
	if err := i.Use(stdlib.Symbols); err != nil {
		return "", fmt.Sprintf("init error: %v", err)
	}

	// Yaegi expects a full Go file when using package/import/main.
	// We keep it strict: user code must be a compilable snippet.
	if _, err := i.Eval(code); err != nil {
		errBuf.WriteString(err.Error())
		if !strings.HasSuffix(errBuf.String(), "\n") {
			errBuf.WriteString("\n")
		}
	}

	return outBuf.String(), errBuf.String()
}

func main() {
	js.Global().Set("goRun", js.FuncOf(func(this js.Value, args []js.Value) any {
		if len(args) < 1 {
			return map[string]any{"stdout": "", "stderr": "missing code argument\n"}
		}
		code := args[0].String()
		stdout, stderr := run(code)
		return map[string]any{"stdout": stdout, "stderr": stderr}
	}))

	// Keep the WASM module alive.
	select {}
}


