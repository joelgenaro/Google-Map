type Property = {
  id: string
  type: "Acquisition" | "Assessment"
  property: string
  value: number
  status: "On-Market" | "Sold" | "Assessed" | "Acquised"
}

export const peroperties: Property[] = [
  {
    id: "728ed52f",
    type: "Acquisition",
    property: "Example",
    value: 100,
    status: "On-Market"
  },
  {
    id: "489e1d42",
    type: "Assessment",
    property: "Example",
    value: 1000,
    status: "Assessed"
  },
  {
    id: "728ed52f",
    type: "Acquisition",
    property: "Example",
    value: 700,
    status: "On-Market"
  },
  {
    id: "728ed52f",
    type: "Acquisition",
    property: "Example",
    value: 200,
    status: "Sold"
  },
  {
    id: "728ed52f",
    type: "Assessment",
    property: "Example",
    value: 2000,
    status: "On-Market"
  },
  {
    id: "728ed52f",
    type: "Assessment",
    property: "Example",
    value: 1000,
    status: "Assessed"
  },
  {
    id: "728ed52f",
    type: "Acquisition",
    property: "Example",
    value: 950,
    status: "Sold"
  },
  {
    id: "728ed52f",
    type: "Assessment",
    property: "Example",
    value: 1800,
    status: "Acquised"
  },
]
