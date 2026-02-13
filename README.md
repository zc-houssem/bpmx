# Business Process Model & Xtra

BPMX is a experimental, next-generation business process modeling environment. Rejecting traditional BPMN constraints, it is built from the ground up to explore new paradigms in workflow orchestration and dynamic interface generation.

## 🚀 The Vision

The core mission of BPMX is to create a sovereign standard for modeling logic. Instead of conforming to legacy specifications, BPMX focuses on:

- **Radical Independence**: Zero support for existing legacy solutions.
- **Unified Engine**: Deep integration between workflow logic and UI presentation.
- **Native Performance**: A high-performance desktop experience built on Tauri and Rust.

## 🛠 Features

### 📐 Workflow Canvas

A fluid, interactive diagramming experience based on the `ng-diagram` engine. Design processes that aren't just boxes and lines, but living data structures.

- Custom node types (Genesis, Explorer, Quantum).
- Real-time metadata binding.
- Reactive edge routing.

### 📝 Dynamic Form Builder

A powerful schema-driven engine that generates complex Angular interfaces on the fly.

- **Grid-based Layouts**: Multi-column, multi-row flexibility.
- **Variant Support**: Native support for text, email, switches, and custom components.
- **Observability**: Built-in RxJS integration for reactive field states (hidden, disabled, error).

### ⚡ Native Core

Leveraging the power of **Tauri**, BPMX bridges the gap between web flexibility (Angular) and system-level performance (Rust).

## 🧪 Tech Stack

- **Frontend**: [Angular 19+](https://angular.dev)
- **Runtime**: [Tauri v2](https://tauri.app)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [Spartan/Helm UI](https://www.spartan.ng)
- **Diagramming**: [ng-diagram](https://github.com/ng-diagram/ng-diagram)
- **Backend/Logic**: [Rust](https://www.rust-lang.org)

## 🏗 Getting Started

1. **Install Dependencies**:

   ```bash
   yarn
   ```

2. **Run Development Server**:
   ```bash
   yarn tauri dev
   ```

---

_BPMX is an experimental project. Expect the unexpected._
