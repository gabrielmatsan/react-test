import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";

export type PaginationProps = {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination(props: PaginationProps) {
  const { pageIndex, totalCount, perPage, onPageChange } = props;

  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm">
          {" "}
          total de {totalCount} resultado(s)
        </span>

        <div className="flex items-center gap-6 lg:gap-8">
          <div className="flex items-center font-medium">
            Página {pageIndex + 1} de {pages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(0)}
              disabled={pageIndex === 0}
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only"> Primeira página</span>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(pageIndex - 1)}
              disabled={pageIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only"> Página anterior</span>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(pageIndex + 1)}
              disabled={pages <= pageIndex + 1}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only"> Próxima página</span>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(pages - 1)}
              disabled={pages <= pageIndex + 1}
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only"> Última página</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
