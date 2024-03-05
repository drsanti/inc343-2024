import { QNetSystemParams } from "qnetbrowsersocket";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const SystemParamsTable = ({ data }: { data: QNetSystemParams }) => {
  const isClientId = (v: string) => v.toString().includes(`websocket-socket-`);
  const getClientId = (v: any) => {
    const ss = v.toString().split("-");
    return ss[ss.length - 1];
  };
  return (
    <div className="my-8 min-w-full px-4">
      <h1 className="text-xl text-grey-800 font-medium py-2">
        System Parameter
      </h1>
      {/* <table className="divide-red-200 min-w-full">
        <thead className="bg-blue-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
              Key
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Object.entries(data).map(([key, value], index) => (
            <tr
              key={key}
              className={index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"}
            >
              <td className="px-6 py-4 whitespace-nowrap">{key}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {isClientId(value) ? getClientId(value) : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <Table className="min-w-full">
        <TableCaption>System Parameter</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Parameter Name</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(data).map(([key, value], index) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>
                {isClientId(value) ? getClientId(value) : value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
