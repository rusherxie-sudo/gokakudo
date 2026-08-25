# Official Question Coverage

This file is the inventory control plane for official-question acquisition. Update it after every discovery, import, validation, publication, or source-status change.

## Coverage Targets

- A qualification is not considered complete after its first official session.
- Backfill runs newest to oldest until at least 90% of reasonably obtainable official sessions are published, or all known sources are exhausted.
- Newly released official sessions have a 72-hour acquisition and validation target when accessible; index rollout remains evidence-driven.
- Unresolved answer conflicts are counted separately and do not count as covered.
- Archive coverage and search-index coverage are separate metrics. A question can count toward the usable archive while its single-question page remains `noindex`.

## Current Inventory

| Qualification | Discoverable sessions | Imported sessions | Usable official questions | Index-eligible single pages | Archive coverage | Backlog | Status |
|---|---:|---:|---:|---:|---:|---:|---|
| 第一種衛生管理者 | 24 | 1 | 44 | 0 | 4.2% | 23 sessions / 1,012 questions | Active backfill; index rollout paused pending unique explanations and GSC evidence |
| 危険物取扱者 乙種4類 | Discovery pending | 0 | 0 | 0 | Pending | Determine competitor and official archives | Discovery required |

## Update Log

### 2026-08-25

- Established the coverage inventory.
- Confirmed one imported 第一種衛生管理者 session (`令和8年4月公表`, 44 questions).
- Registered 23 known historical 第一種衛生管理者 sessions as the initial backfill queue.
- 危険物乙4 currently has 15 original prediction questions but no imported official session; official archive discovery is required.
- Separated archive completeness from index eligibility. The 44 imported 第一種衛生管理者 official single-question pages remain `noindex,follow` and outside the sitemap.
