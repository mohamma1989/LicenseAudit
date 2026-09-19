"use client"

import { useMemo, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ComplianceBadge } from "@/components/status-badges"
import { Search } from "lucide-react"
import type { ComplianceStatus, SoftwareAsset } from "@/lib/types"

const complianceFilters: (ComplianceStatus | "All")[] = [
  "All",
  "Compliant",
  "Over-licensed",
  "Unlicensed",
]

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n)
}

export function SoftwareTable({ software }: { software: SoftwareAsset[] }) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<(typeof complianceFilters)[number]>("All")

  const filtered = useMemo(() => {
    return software.filter((app) => {
      const matchesQuery = app.applicationName
        .toLowerCase()
        .includes(query.trim().toLowerCase())
      const matchesFilter =
        filter === "All" || app.complianceStatus === filter
      return matchesQuery && matchesFilter
    })
  }, [software, query, filter])

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-base">Software Inventory</CardTitle>
            <CardDescription>
              All applications discovered across the network.
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search applications..."
                className="pl-8 sm:w-56"
                aria-label="Search applications"
              />
            </div>
            <Select
              value={filter}
              onValueChange={(v) =>
                setFilter(v as (typeof complianceFilters)[number])
              }
            >
              <SelectTrigger className="sm:w-44" aria-label="Filter by compliance">
                <SelectValue placeholder="Compliance" />
              </SelectTrigger>
              <SelectContent>
                {complianceFilters.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f === "All" ? "All statuses" : f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Application Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead className="text-right">Installations</TableHead>
                <TableHead>License Type</TableHead>
                <TableHead>Compliance Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No applications match your search.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium text-foreground">
                      {app.applicationName}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {app.version}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNumber(app.totalInstallations)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {app.licenseType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ComplianceBadge status={app.complianceStatus} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="px-6 pt-4 text-xs text-muted-foreground">
          Showing {filtered.length} of {software.length} applications
        </div>
      </CardContent>
    </Card>
  )
}
