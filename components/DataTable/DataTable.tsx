import { useContext, useState } from "react";

import { Tank } from "@/hooks/useTankData";
import { AuthContext } from "@/contexts/AuthContext";

import styles from "./DataTable.module.css";
import SortButton from "../SortButton/SortButton";

type DataTableProps = {
  data?: Tank[];
};

export enum Sort {
  ASC,
  DESC,
}

const sortData = (data: Tank[], sortKey: string, direction: Sort) => {
  const sorted = data.sort((a: Tank, b: Tank) => a.name.localeCompare(b.name));

  if (direction === Sort.DESC) {
    return sorted.reverse();
  }

  return sorted;
};

const DataTable = ({ data }: DataTableProps) => {
  const { user } = useContext(AuthContext);
  const [tankData, setTankData] = useState(data);
  const [sort, setSort] = useState<Sort>(Sort.ASC);
  const [sortColumn, setSortColumn] = useState("Name");

  const isEditor = user?.role === "editor";

  const onSortClick = (text: string) => {
    if (text !== sortColumn) {
      setSortColumn(text);

      return;
    }

    setSort((sort) => {
      setTankData(sortData(tankData, text, sort));

      return sort === Sort.ASC ? Sort.DESC : Sort.ASC;
    });
  };

  return (
    <table className={styles.dataTable}>
      <thead>
        <tr>
          <td className={styles.heading}>
            <SortButton
              text="Name"
              isEditor={isEditor}
              onClick={onSortClick}
              sort={sort}
              sortColumn={sortColumn}
            />
          </td>
          <td className={styles.heading}>
            <SortButton
              text="Year"
              isEditor={isEditor}
              onClick={onSortClick}
              sort={sort}
              sortColumn={sortColumn}
            />
          </td>
        </tr>
      </thead>

      <tbody>
        {tankData?.map((row) => (
          <tr key={row.name}>
            <td className={styles.dataCell}>{row.name}</td>
            <td className={styles.dataCell}>{row.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
