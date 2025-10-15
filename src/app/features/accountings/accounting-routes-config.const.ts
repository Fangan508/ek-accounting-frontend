import { RouteConfig } from "@ek/core/routing/models/route-config.models";

type RouteType = 'bankBooks';

export const ACCOUNTING_ROUTES_CONFIG: Record<RouteType, RouteConfig> = {
    bankBooks: {
       path: 'bank-books',
       fullPath: '/accounting-books/bank-books'
    }
};