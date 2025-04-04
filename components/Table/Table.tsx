/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

// Task type definition
type Task = {
  id: string;
  name: string;
  assignees: string[];
  dueDate: string;
  taskType: string;
  priority: "High" | "Medium" | "Low";
  status: "In Progress" | "Completed" | "Pending";
};

// Sample Data
const data: Task[] = [
  { id: "1", name: "Add relevant structured data", assignees: ["S", "R", "R"], dueDate: "29 Sep, 2024", taskType: "Link Building", priority: "High", status: "In Progress" },
  { id: "2", name: "Optimize for voice search", assignees: ["S", "R", "B"], dueDate: "29 Sep, 2024", taskType: "Link Building", priority: "High", status: "In Progress" },
  { id: "3", name: "Track keyword rankings", assignees: ["V", "P", "R"], dueDate: "29 Sep, 2024", taskType: "Link Building", priority: "High", status: "In Progress" },
  { id: "4", name: "Track keyword rankings", assignees: ["S", "R", "R"], dueDate: "29 Sep, 2024", taskType: "Link Building", priority: "High", status: "In Progress" },
];

// Styled Components
const TableContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #f5f7fa;
  text-align: left;
  padding: 12px;
  font-weight: 600;
  color: #7a869a;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eaeaea;
`;

const Row = styled.tr`
  &:hover {
    background: #f9fafb;
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const AssigneeGroup = styled.div`
  display: flex;
  gap: 6px;
`;

const Assignee = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e0e4ea;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #444;
`;

const TaskType = styled.a`
  color: #2f80ed;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
`;

const PriorityLabel = styled.span<{ priority: "High" | "Medium" | "Low" }>`
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background: ${({ priority }) =>
    priority === "High"
      ? "#F87171"
      : priority === "Medium"
      ? "#FBBF24"
      : "#34D399"};
`;

const Status = styled.span`
  font-weight: 500;
  color: #374151;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
`;

// Column Definitions
const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "select",
    header: () => <Checkbox type="checkbox" />,
    cell: () => <Checkbox type="checkbox" />,
  },
  {
    accessorKey: "name",
    header: "Task Name",
  },
  {
    accessorKey: "assignees",
    header: "Assignee",
    cell: ({ getValue }) => (
      <AssigneeGroup>
        {getValue<string[]>().map((initial, index) => (
          <Assignee key={index}>{initial}</Assignee>
        ))}
      </AssigneeGroup>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "taskType",
    header: "Task Type",
    cell: ({ getValue }) => <TaskType href="#">{getValue<string>()}</TaskType>,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ getValue }) => (
      <PriorityLabel priority={getValue<Task["priority"]>()}>
        ● {getValue<Task["priority"]>()}
      </PriorityLabel>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <Status>{getValue<string>()}</Status>,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => (
      <MoreButton>
        <MoreHorizontal size={18} />
      </MoreButton>
    ),
  },
];

const TaskTable: React.FC = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer>
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Row>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
