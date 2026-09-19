# LicenseAudit 🛡️

**LicenseAudit** is an automated Software Asset Management (SAM) and compliance tracking platform. It collects software inventories from Linux and Windows endpoints, cross-references them against an organizational license rulebook, and flags unauthorized software or license shortfalls in real time.

---

## 🚀 Key Features

- **Cross-Platform Endpoint Agents**:
  - **Linux Agent**: Scans system `.desktop` application entries, automatically filtering out hidden utilities and background services.
  - **Windows Agent**: Queries classic 32-bit and 64-bit Uninstall Registry keys alongside AppX store applications while stripping core system components and internal frameworks.
- **Smart Noise Gatekeeping**: Automatically discards OS-level patches, redistributables, and non-licensable system packages via an `ignored_software` pre-filter.
- **Automated License Reconciliation**: Real-time license math engine comparing actual network installations against purchased entitlement quotas.
- **RESTful API**: Built on FastAPI with automated OpenAPI/Swagger documentation.
- **Relational Storage**: Relational schema powered by PostgreSQL for high-speed lookups and inventory indexing.

---

## 🏗️ Architecture Overview