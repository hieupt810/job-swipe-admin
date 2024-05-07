'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useConstantManagementHook from '@/container/constant-management/ConstantManagement.hook';
import { ChevronDown } from 'lucide-react';

export default function ConstantManagementContainer() {
  const {
    tableHeaders,
    prefixConstants,
    selectedPrefix,
    setSelectedPrefix,
    constants,
  } = useConstantManagementHook();

  return (
    <main className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-semibold">Constants in System</h1>

        <div className="flex flex-row items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto capitalize">
                {selectedPrefix ? (
                  <span>
                    {prefixConstants
                      .find((item) => item.value === selectedPrefix)
                      ?.prefix.split('_')
                      .join(' ')}
                  </span>
                ) : (
                  <span>Type</span>
                )}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={selectedPrefix}
                onValueChange={setSelectedPrefix}
              >
                {prefixConstants.map((item) => (
                  <DropdownMenuRadioItem
                    key={item.value}
                    value={item.value}
                    className="capitalize"
                  >
                    {item.prefix.split('_').join(' ')}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {selectedPrefix && (
        <div className="overflow-hidden rounded-lg">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="!bg-pink-800">
                {tableHeaders.map((header, id) => {
                  return (
                    <TableHead key={id} className="truncate text-white">
                      {header}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>

            <TableBody>
              {constants.map((constant, idx) => {
                return (
                  <TableRow key={idx} className="!bg-white odd:!bg-pink-100">
                    <TableCell>{constant.constant_id}</TableCell>
                    <TableCell>{constant.constant_type}</TableCell>
                    <TableCell>{constant.constant_name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
}