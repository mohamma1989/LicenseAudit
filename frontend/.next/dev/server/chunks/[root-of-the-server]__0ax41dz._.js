module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Desktop/LicenseAudit/frontend/lib/mock-data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockDashboardData",
    ()=>mockDashboardData
]);
const mockDashboardData = {
    metrics: {
        totalDevices: 1284,
        totalSoftwareAssets: 8736,
        complianceAlerts: 47,
        potentialSavings: 184250
    },
    devices: [
        {
            id: "dev-001",
            deviceName: "FIN-WS-0142",
            os: "Windows",
            ipAddress: "10.4.12.87",
            lastAudit: "2026-06-08T09:14:00Z",
            status: "active"
        },
        {
            id: "dev-002",
            deviceName: "ENG-LNX-0031",
            os: "Linux",
            ipAddress: "10.4.20.14",
            lastAudit: "2026-06-08T08:52:00Z",
            status: "active"
        },
        {
            id: "dev-003",
            deviceName: "HR-WS-0088",
            os: "Windows",
            ipAddress: "10.4.12.41",
            lastAudit: "2026-06-07T22:03:00Z",
            status: "offline"
        },
        {
            id: "dev-004",
            deviceName: "OPS-LNX-0007",
            os: "Linux",
            ipAddress: "10.4.20.02",
            lastAudit: "2026-06-08T09:01:00Z",
            status: "active"
        },
        {
            id: "dev-005",
            deviceName: "SALES-WS-0210",
            os: "Windows",
            ipAddress: "10.4.13.110",
            lastAudit: "2026-06-08T07:46:00Z",
            status: "active"
        },
        {
            id: "dev-006",
            deviceName: "DEV-LNX-0119",
            os: "Linux",
            ipAddress: "10.4.21.55",
            lastAudit: "2026-06-06T18:30:00Z",
            status: "offline"
        },
        {
            id: "dev-007",
            deviceName: "EXEC-WS-0003",
            os: "Windows",
            ipAddress: "10.4.10.03",
            lastAudit: "2026-06-08T09:20:00Z",
            status: "active"
        },
        {
            id: "dev-008",
            deviceName: "QA-LNX-0064",
            os: "Linux",
            ipAddress: "10.4.21.88",
            lastAudit: "2026-06-08T06:12:00Z",
            status: "active"
        }
    ],
    software: [
        {
            id: "sw-001",
            applicationName: "Microsoft Office 365",
            version: "16.0.17328",
            totalInstallations: 842,
            licenseType: "Subscription",
            complianceStatus: "Over-licensed"
        },
        {
            id: "sw-002",
            applicationName: "Adobe Photoshop",
            version: "25.9.0",
            totalInstallations: 112,
            licenseType: "Subscription",
            complianceStatus: "Unlicensed"
        },
        {
            id: "sw-003",
            applicationName: "Google Chrome",
            version: "126.0.6478",
            totalInstallations: 1190,
            licenseType: "Freeware",
            complianceStatus: "Compliant"
        },
        {
            id: "sw-004",
            applicationName: "Slack",
            version: "4.38.121",
            totalInstallations: 654,
            licenseType: "Commercial",
            complianceStatus: "Compliant"
        },
        {
            id: "sw-005",
            applicationName: "JetBrains IntelliJ IDEA",
            version: "2026.1.2",
            totalInstallations: 88,
            licenseType: "Subscription",
            complianceStatus: "Over-licensed"
        },
        {
            id: "sw-006",
            applicationName: "VLC Media Player",
            version: "3.0.20",
            totalInstallations: 433,
            licenseType: "Open Source",
            complianceStatus: "Compliant"
        },
        {
            id: "sw-007",
            applicationName: "Autodesk AutoCAD",
            version: "2026.1",
            totalInstallations: 41,
            licenseType: "Commercial",
            complianceStatus: "Unlicensed"
        },
        {
            id: "sw-008",
            applicationName: "Docker Desktop",
            version: "4.31.0",
            totalInstallations: 207,
            licenseType: "Commercial",
            complianceStatus: "Over-licensed"
        },
        {
            id: "sw-009",
            applicationName: "Mozilla Firefox",
            version: "127.0.1",
            totalInstallations: 318,
            licenseType: "Open Source",
            complianceStatus: "Compliant"
        },
        {
            id: "sw-010",
            applicationName: "Zoom Workplace",
            version: "6.0.11",
            totalInstallations: 720,
            licenseType: "Commercial",
            complianceStatus: "Compliant"
        }
    ]
};
}),
"[project]/Desktop/LicenseAudit/frontend/lib/api.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "getDashboardData",
    ()=>getDashboardData,
    "getDevices",
    ()=>getDevices,
    "getSoftware",
    ()=>getSoftware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/lib/mock-data.ts [app-route] (ecmascript)");
;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.getlicenseaudit.com";
/** Simulates network latency so loading states are visible in development. */ function delay(value, ms = 600) {
    return new Promise((resolve)=>setTimeout(()=>resolve(value), ms));
}
async function getDashboardData() {
    // ----------------------------------------------------------------------
    // TODO: Replace the mock return below with a live call to FastAPI.
    //
    //   const res = await fetch(`${API_BASE_URL}/v1/dashboard`, {
    //     headers: { Authorization: `Bearer ${process.env.LICENSEAUDIT_API_TOKEN}` },
    //     // next: { revalidate: 60 }, // cache for 60s in an RSC
    //     cache: "no-store",
    //   })
    //   if (!res.ok) throw new Error(`Dashboard fetch failed: ${res.status}`)
    //   return (await res.json()) as DashboardData
    // ----------------------------------------------------------------------
    return delay(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockDashboardData"]);
}
async function getDevices() {
    // TODO:
    //   const res = await fetch(`${API_BASE_URL}/v1/devices`, { cache: "no-store" })
    //   if (!res.ok) throw new Error(`Devices fetch failed: ${res.status}`)
    //   return (await res.json()) as Device[]
    return delay(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockDashboardData"].devices);
}
async function getSoftware() {
    // TODO:
    //   const res = await fetch(`${API_BASE_URL}/v1/software`, { cache: "no-store" })
    //   if (!res.ok) throw new Error(`Software fetch failed: ${res.status}`)
    //   return (await res.json()) as SoftwareAsset[]
    return delay(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockDashboardData"].software);
}
}),
"[project]/Desktop/LicenseAudit/frontend/app/api/dashboard/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/lib/api.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDashboardData"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch (error) {
        console.log("[v0] /api/dashboard error:", error.message);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to load dashboard data"
        }, {
            status: 502
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ax41dz._.js.map