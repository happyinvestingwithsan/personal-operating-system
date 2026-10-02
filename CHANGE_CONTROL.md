# CHANGE CONTROL

## Purpose
The Personal Operating System exists to protect the user's attention, reduce cognitive burden, and maintain life balance. Feature bloat, speculative tooling, and architectural tinkering directly undermine that purpose.

Before any new feature, architecture change, external dependency, or configuration addition is admitted into the backlog or codebase, it must pass through this mandatory decision gate.

---

## The Decision Gate

Every proposed change must explicitly answer these five questions:

### 1. Problem
*What actual problem are we solving?*
- Describe the concrete friction, failure mode, or gap experienced in real life.
- Theoretical or hypothetical problems are immediately disqualified.

### 2. Evidence
*How often does this problem occur?*
- Has this problem occurred repeatedly across multiple operating weeks?
- Can you cite specific fortnightly review instances where this gap caused measurable drift?

### 3. Benefit
*What measurable benefit will this change create?*
- How does this change directly protect time, enhance calm, clarify decisions, or ensure accountability?
- Is the benefit tangible and verifiable within the six-month cycle (Oct 2026 – Mar 2027)?

### 4. Cost
*What implementation and cognitive complexity does it add?*
- What code, dependencies, or maintenance overhead does it introduce?
- Will this change increase the daily (2–5 min), weekly (15–20 min), or fortnightly (~30 min) interaction budget?
- Does it introduce risk of technical failure or distraction?

### 5. Decision
*BUILD / DEFER / REJECT*
- **BUILD:** Problem is urgent, recurrent, and high-impact; benefit clearly outweighs implementation and cognitive cost.
- **DEFER:** Problem exists but is non-critical, or system needs more operating cycles to assess true impact.
- **REJECT:** Violates anti-rabbit-hole principles, adds vanity/clutter, or introduces unwarranted complexity.

---

## Default Stance

> **DEFAULT POSITION: DEFER**  
> Unless the measurable benefit is overwhelmingly clear and the cognitive cost is near zero, every proposed addition is deferred.

Software changes cannot fix behavioral or discipline gaps. When in doubt, simplify the expectation rather than expanding the code.
