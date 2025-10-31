import { RouteConfig } from "@ek/core/routing/models/route-config.models";

type RouteType = 'bankBooks' | 'cashBooks' | 'bankBookDetails';

export const ACCOUNTING_ROUTES_CONFIG: Record<RouteType, RouteConfig> = {
    bankBooks: {
       path: 'bank-books',
       fullPath: '/accounting-books/bank-books'
    },
    bankBookDetails: {
        path: ':bankBookId',
        fullPath: '/accounting-books/bank-books/:bankBookId'
    },
    cashBooks: {
        path: 'cash-books',
        fullPath: '/accounting-books/cash-books'
    }
};