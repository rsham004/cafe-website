# AGENTS.md - Guidelines for AI Coding Agents

## Build/Test Commands
- **Rust Build**: `cargo build` or `cargo build --release`
- **Rust Test**: `cargo test` or `cargo test --features test-all`
- **Single Rust Test**: `cargo test test_name` or `cargo test --test integration_tests`
- **NPM Build**: `cd ruv-swarm/npm && npm run build:all`
- **NPM Test**: `cd ruv-swarm/npm && npm test` or `npm run test:all`
- **Single NPM Test**: `cd ruv-swarm/npm && npm test -- --testNamePattern="test_name"`
- **Lint**: `cd ruv-swarm/npm && npm run lint` or `cargo clippy`
- **Type Check**: `cd ruv-swarm/npm && npx tsc --noEmit`

## Code Style Guidelines
- **Languages**: Primary Rust (neural networks), JavaScript/TypeScript (NPM package), WebAssembly
- **Rust Style**: snake_case for variables/functions, PascalCase for types, UPPER_SNAKE_CASE for constants
- **JS/TS Style**: camelCase for variables/functions, PascalCase for classes, kebab-case for files
- **Imports**: Group std library, external crates, local modules with blank lines between
- **Error Handling**: Use `thiserror` for Rust errors, proper try/catch for JS
- **Types**: Always use type annotations (Rust generics, TypeScript interfaces)
- **Comments**: Only add when explicitly requested by user
- **Features**: Use Cargo features for optional dependencies (`#[cfg(feature = "...")]`)
- **WASM**: Use wasm-bindgen for JS interop, prefer progressive loading

## Project Structure
- **Core**: Rust neural network library in `src/` (FANN implementation)
- **NPM**: JavaScript/WASM package in `ruv-swarm/npm/`
- **Tests**: Comprehensive test suites in both Rust (`tests/`) and NPM (`ruv-swarm/npm/test/`)
- **Features**: GPU acceleration, SIMD, WebAssembly, parallel processing