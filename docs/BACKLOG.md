# BPMX Project Backlog

This document outlines the planned features and technical improvements for the **Business Process Model & Xtra (BPMX)** project.

---

## 🎯 1. Workflow Engine & Execution
*Transitioning from a diagramming tool to a functional logic orchestrator.*

- [ ] **Workflow Simulator (Play Mode)**
  - Implement a visual "execution" mode to step through nodes.
  - Highlight the active node and path.
  - Evaluate transitions in real-time.
- [ ] **Metadata Expression Evaluator**
  - Create a logic engine (Rust-side) to parse and evaluate validation strings (e.g., `amount > 5000`).
  - Support for `ng-diagram` edge metadata.
- [ ] **Quantum Node Logic**
  - Implement complex node types: **Genesis** (Start), **Explorer** (Process), and **Quantum** (Parallel/Conditional Branching).
- [ ] **Execution Persistence**
  - Database schema for `workflow_runs` and `audit_logs` in [src-tauri/src/db.rs](src-tauri/src/db.rs).
  - Ability to pause and resume long-running workflows.

## 📝 2. Dynamic Interface Builders
*Enhancing the schema-driven UI generation.*

- [ ] **Advanced Validation Rules**
  - Support for cross-field dependencies (e.g., Field B is required only if Field A is "Yes").
  - Async validators for server-side checks.
- [ ] **Form State Observability**
  - Deepen RxJS integration for reactive side-effects during data entry.
- [ ] **Datatable Bulk Operations**
  - Add checkbox selection to [DatatableBuilder](src/app/components/datatable-builder/datatable-builder.component.ts).
  - Implement batch actions (Delete, Export, Status Update).
- [ ] **Layout Customizer**
  - UI for drag-and-drop grid resizing within the form builder.

## 🐎 3. Domesticator (Data Harmonization)
*The system's integration and schema mapping layer.*

- [ ] **External Schema Ingestion**
  - Import JSON/YAML/SQL definitions to seed new workflows.
- [ ] **Field Mapping UI**
  - Visually map external API fields to BPMX internal models.
- [ ] **Schema Versioning**
  - Handle "schema drift" when external source structures change.

## ⚡ 4. Native Core & Infrastructure
*Leveraging Tauri and Rust for performance.*

- [ ] **Robust Database Migrations**
  - Move from raw SQL queries in [init_db](src-tauri/src/db.rs) to structured `sqlx-model` or `refinery` migrations.
- [ ] **Global Search (Command Palette)**
  - `Ctrl+K` interface to jump between workflows, settings, or search documentation.
- [ ] **Local Asset Management**
  - System for handling file uploads (attachments, avatars) directly on the local filesystem.

## 🎨 5. User Experience (UX)
- [ ] **Workflow Templating**
  - Library of pre-built business processes (Onboarding, Approval, etc.).
- [ ] **Enhanced Theming**
  - Dynamic switching between Light/Dark modes using Tailwind and Spartan/Helm.
- [ ] **BPMX File Format**
  - Implementation of `.bpmx` file export/import for workflow portability.

---

## 📈 Prioritization Map
- **High Priority**: Workflow Simulator, Expression Evaluator, Database Migrations.
- **Medium Priority**: Advanced Form Validation, Bulk Actions, Domesticator Core.
- **Low Priority**: Command Palette, Asset Management, Templating.
