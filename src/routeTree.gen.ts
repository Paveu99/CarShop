/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as WrapperImport } from './routes/_wrapper'
import { Route as IndexImport } from './routes/index'
import { Route as HistoryIndexImport } from './routes/history/index'
import { Route as CategoriesIndexImport } from './routes/categories/index'
import { Route as WrapperCreatorIndexImport } from './routes/_wrapper/creator/index'
import { Route as WrapperCreatorSummaryImport } from './routes/_wrapper/creator/summary'
import { Route as WrapperCreatorIdImport } from './routes/_wrapper/creator/$id'

// Create/Update Routes

const WrapperRoute = WrapperImport.update({
  id: '/_wrapper',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const HistoryIndexRoute = HistoryIndexImport.update({
  id: '/history/',
  path: '/history/',
  getParentRoute: () => rootRoute,
} as any)

const CategoriesIndexRoute = CategoriesIndexImport.update({
  id: '/categories/',
  path: '/categories/',
  getParentRoute: () => rootRoute,
} as any)

const WrapperCreatorIndexRoute = WrapperCreatorIndexImport.update({
  id: '/creator/',
  path: '/creator/',
  getParentRoute: () => WrapperRoute,
} as any)

const WrapperCreatorSummaryRoute = WrapperCreatorSummaryImport.update({
  id: '/creator/summary',
  path: '/creator/summary',
  getParentRoute: () => WrapperRoute,
} as any)

const WrapperCreatorIdRoute = WrapperCreatorIdImport.update({
  id: '/creator/$id',
  path: '/creator/$id',
  getParentRoute: () => WrapperRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_wrapper': {
      id: '/_wrapper'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof WrapperImport
      parentRoute: typeof rootRoute
    }
    '/categories/': {
      id: '/categories/'
      path: '/categories'
      fullPath: '/categories'
      preLoaderRoute: typeof CategoriesIndexImport
      parentRoute: typeof rootRoute
    }
    '/history/': {
      id: '/history/'
      path: '/history'
      fullPath: '/history'
      preLoaderRoute: typeof HistoryIndexImport
      parentRoute: typeof rootRoute
    }
    '/_wrapper/creator/$id': {
      id: '/_wrapper/creator/$id'
      path: '/creator/$id'
      fullPath: '/creator/$id'
      preLoaderRoute: typeof WrapperCreatorIdImport
      parentRoute: typeof WrapperImport
    }
    '/_wrapper/creator/summary': {
      id: '/_wrapper/creator/summary'
      path: '/creator/summary'
      fullPath: '/creator/summary'
      preLoaderRoute: typeof WrapperCreatorSummaryImport
      parentRoute: typeof WrapperImport
    }
    '/_wrapper/creator/': {
      id: '/_wrapper/creator/'
      path: '/creator'
      fullPath: '/creator'
      preLoaderRoute: typeof WrapperCreatorIndexImport
      parentRoute: typeof WrapperImport
    }
  }
}

// Create and export the route tree

interface WrapperRouteChildren {
  WrapperCreatorIdRoute: typeof WrapperCreatorIdRoute
  WrapperCreatorSummaryRoute: typeof WrapperCreatorSummaryRoute
  WrapperCreatorIndexRoute: typeof WrapperCreatorIndexRoute
}

const WrapperRouteChildren: WrapperRouteChildren = {
  WrapperCreatorIdRoute: WrapperCreatorIdRoute,
  WrapperCreatorSummaryRoute: WrapperCreatorSummaryRoute,
  WrapperCreatorIndexRoute: WrapperCreatorIndexRoute,
}

const WrapperRouteWithChildren =
  WrapperRoute._addFileChildren(WrapperRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof WrapperRouteWithChildren
  '/categories': typeof CategoriesIndexRoute
  '/history': typeof HistoryIndexRoute
  '/creator/$id': typeof WrapperCreatorIdRoute
  '/creator/summary': typeof WrapperCreatorSummaryRoute
  '/creator': typeof WrapperCreatorIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof WrapperRouteWithChildren
  '/categories': typeof CategoriesIndexRoute
  '/history': typeof HistoryIndexRoute
  '/creator/$id': typeof WrapperCreatorIdRoute
  '/creator/summary': typeof WrapperCreatorSummaryRoute
  '/creator': typeof WrapperCreatorIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_wrapper': typeof WrapperRouteWithChildren
  '/categories/': typeof CategoriesIndexRoute
  '/history/': typeof HistoryIndexRoute
  '/_wrapper/creator/$id': typeof WrapperCreatorIdRoute
  '/_wrapper/creator/summary': typeof WrapperCreatorSummaryRoute
  '/_wrapper/creator/': typeof WrapperCreatorIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/categories'
    | '/history'
    | '/creator/$id'
    | '/creator/summary'
    | '/creator'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/categories'
    | '/history'
    | '/creator/$id'
    | '/creator/summary'
    | '/creator'
  id:
    | '__root__'
    | '/'
    | '/_wrapper'
    | '/categories/'
    | '/history/'
    | '/_wrapper/creator/$id'
    | '/_wrapper/creator/summary'
    | '/_wrapper/creator/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  WrapperRoute: typeof WrapperRouteWithChildren
  CategoriesIndexRoute: typeof CategoriesIndexRoute
  HistoryIndexRoute: typeof HistoryIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  WrapperRoute: WrapperRouteWithChildren,
  CategoriesIndexRoute: CategoriesIndexRoute,
  HistoryIndexRoute: HistoryIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_wrapper",
        "/categories/",
        "/history/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_wrapper": {
      "filePath": "_wrapper.tsx",
      "children": [
        "/_wrapper/creator/$id",
        "/_wrapper/creator/summary",
        "/_wrapper/creator/"
      ]
    },
    "/categories/": {
      "filePath": "categories/index.tsx"
    },
    "/history/": {
      "filePath": "history/index.tsx"
    },
    "/_wrapper/creator/$id": {
      "filePath": "_wrapper/creator/$id.tsx",
      "parent": "/_wrapper"
    },
    "/_wrapper/creator/summary": {
      "filePath": "_wrapper/creator/summary.tsx",
      "parent": "/_wrapper"
    },
    "/_wrapper/creator/": {
      "filePath": "_wrapper/creator/index.tsx",
      "parent": "/_wrapper"
    }
  }
}
ROUTE_MANIFEST_END */
