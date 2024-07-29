import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatRelativeToNow(createdAt: Date) {
  return formatRelative(createdAt, new Date(), {
    locale: ptBR,
  });
}
