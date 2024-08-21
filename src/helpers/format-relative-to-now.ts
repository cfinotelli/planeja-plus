import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatRelativeToNow(createdAt: string) {
  return formatRelative(createdAt, new Date(), {
    locale: ptBR,
  });
}
