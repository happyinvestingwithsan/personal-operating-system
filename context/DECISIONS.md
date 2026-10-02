# Durable Architecture & Design Decisions: Personal Operating System

Record durable decisions that future implementation work requires.

---

### DEC-0001: Integration with AI Build Orchestrator
- **Date:** 2026-10-02
- **Context:** Need repeatable, cost-free, automated coordination between ChatGPT, human, AGY, and Git.
- **Decision:** Use local-first AI Build Orchestrator with Git as durable source of truth.
- **Reason:** Enforces ₹0 cost, zero token dependencies for orchestration, and strict human review gating.
- **Impact:** Feature work is executed on dedicated branches with standardized AGY handoffs and ChatGPT review packages.
