import { Table } from 'console-table-printer';

export function printUsersTable(users: Array<{ id: number; name: string; email: string }>) {
  const table = new Table({
    title: 'Generated Users',
    columns: [
      { name: 'id', alignment: 'left' },
      { name: 'name', alignment: 'left' },
      { name: 'email', alignment: 'left' },
    ],
  });

  users.forEach((user) => table.addRow(user, { color: 'green' }));
  table.printTable();
}
