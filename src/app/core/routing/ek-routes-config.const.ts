import { RouteConfig } from "./models/route-config.models";

type RouteType = 'main' | 'dashboard' | 'accountingBooks';

export const EK_ROUTES_CONFIG: Record<RouteType, RouteConfig> = {
    main: {
        path: '',
        fullPath: '/',
    },
    dashboard: {
        path: 'dashboard',
        fullPath: '/dashboard'
    },
    accountingBooks: {
        path: 'accounting-books',
        fullPath: '/accounting-books'
    }
};