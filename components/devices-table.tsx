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
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/status-badges"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Device } from "@/lib/types"

type SortKey = keyof Pick<
  Device,
  "deviceName" | "os" | "ipAddress" | "lastAudit" | "status"
>

const columns: { key: SortKey; label: string }[] = [
  { key: "deviceName", label: "Device Name" },
  { key: "os", label: "OS" },
  { key: "ipAddress", label: "IP Address" },
  { key: "lastAudit", label: "Last Audit" },
  { key: "status", label: "Status" },
]

function formatTimestamp(iso: string) {
  // Pin the time zone so server and client render identical strings (avoids hydration mismatch).
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  })
}

export function DevicesTable({ devices }: { devices: Device[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("lastAudit")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const sorted = useMemo(() => {
    const copy = [...devices]
    copy.sort((a, b) => {
      let result = 0
      if (sortKey === "lastAudit") {
        result =
          new Date(a.lastAudit).getTime() - new Date(b.lastAudit).getTime()
      } else {
        result = String(a[sortKey]).localeCompare(String(b[sortKey]))
      }
      return sortDir === "asc" ? result : -result
    })
    return copy
  }, [devices, sortKey, sortDir])

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Monitored Devices</CardTitle>
        <CardDescription>
          Client machines reporting to the audit agent. Click a column to sort.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {columns.map((col) => {
                  const isActive = sortKey === col.key
                  return (
                    <TableHead key={col.key} className="whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => toggleSort(col.key)}
                        className="inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {col.label}
                        {isActive ? (
                          sortDir === "asc" ? (
                            <ArrowUp className="size-3.5" />
                          ) : (
                            <ArrowDown className="size-3.5" />
                          )
                        ) : (
                          <ChevronsUpDown className="size-3.5 opacity-50" />
                        )}
                      </button>
                    </TableHead>
                  )
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-medium text-foreground">
                    {device.deviceName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "font-normal",
                        device.os === "Windows"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent text-accent-foreground",
                      )}
                    >
                      {device.os}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {device.ipAddress}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatTimestamp(device.lastAudit)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={device.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
