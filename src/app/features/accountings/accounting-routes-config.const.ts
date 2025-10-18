import { RouteConfig } from "@ek/core/routing/models/route-config.models";

type RouteType = 'bankBooks' | 'cashBooks';

export const ACCOUNTING_ROUTES_CONFIG: Record<RouteType, RouteConfig> = {
    bankBooks: {
       path: 'bank-books',
       fullPath: '/accounting-books/bank-books'
    },
    cashBooks: {
        path: 'cash-books',
        fullPath: '/accounting-books/cash-books'
    }
};