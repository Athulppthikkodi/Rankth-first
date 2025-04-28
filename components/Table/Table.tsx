/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Checkbox from "@/components/Inputs/Checkbox/Checkbox";
import AvatarGroup from "@/components/DataDisplay/AvatarGroup/AvatarGroup";
import Avatar from "@/components/DataDisplay/Avatar/Avatar";
import Chip from "@/components/DataDisplay/Chip/Chip";

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
  {
    id: "1",
    name: "Add relevant structured data",
    assignees: ["S", "R", "R"],
    dueDate: "29 Sep, 2024",
    taskType: "Link Building",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "2",
    name: "Optimize for voice search",
    assignees: ["S", "R", "B"],
    dueDate: "29 Sep, 2024",
    taskType: "Link Building",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "3",
    name: "Track keyword rankings",
    assignees: ["V", "P", "R"],
    dueDate: "29 Sep, 2024",
    taskType: "Link Building",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "4",
    name: "Track keyword rankings",
    assignees: ["S", "R", "R"],
    dueDate: "29 Sep, 2024",
    taskType: "Link Building",
    priority: "High",
    status: "In Progress",
  },
];

// Styled Components
const TableContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #fff;
  text-align: left;
  padding: 6px;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: #202020;
  border-bottom: 1px solid #DBDBDB;

`;

const Td = styled.td`
  font-size: 13px;
  font-weight: 400;
  color: #202020;
  padding: 6px;
  line-height: 20px;
  border-bottom: 1px solid #DBDBDB;
`;

const Row = styled.tr`
  background:#fff;
  &:hover {
    background: #f9fafb;
  }
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
    header: () => <Checkbox size="medium" />,
    cell: () => <Checkbox size="medium" />,
  },
  {
    accessorKey: "name",
    header: "Task Name",
  },
  {
    accessorKey: "assignees",
    header: "Assignee",
    cell: ({ getValue }) => (
      <AvatarGroup max={3} spacing={-8}>
        {getValue<string[]>().map((initial, index) => (
          <Avatar 
            key={index} 
            size="small" 
            fallback={initial}
            sx={{ backgroundColor: "#e0e4ea", color: "#444", fontWeight: 600 }}
          />
        ))}
      </AvatarGroup>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "taskType",
    header: "Task Type",
    cell: ({ getValue }) => (
      <Chip type="link-building" text={getValue<string>()} />
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ getValue }) => {
      const priority = getValue<Task["priority"]>();
      return <Chip type={priority.toLowerCase() as "high" | "medium" | "low"} text={priority} />;
    },
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
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
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
