import { RouteConfig } from "@ek/core/routing/models/route-config.models";

type RouteType = 'createBankBook' | 'bankBooks' | 'cashBooks' | 'bankBookDetails';

export const ACCOUNTING_ROUTES_CONFIG: Record<RouteType, RouteConfig> = {
    createBankBook: {
        path: 'create-bank-book',
        fullPath: '/accounting-books/create-bank-book'
    },
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