import { Sort } from "../DataTable/DataTable";

type SortButtonProps = {
  text: string;
  isEditor: boolean;
  onClick: (text: string) => void;
  sort: Sort;
  sortColumn: string;
};

const SortButton = ({
  text,
  isEditor,
  onClick,
  sort,
  sortColumn,
}: SortButtonProps) => (
  <button onClick={() => onClick(text)}>
    {text} {isEditor && sort === Sort.ASC && sortColumn === text && "v"}
    {isEditor && sort === Sort.DESC && sortColumn === text && "^"}
  </button>
);

export default SortButton;
