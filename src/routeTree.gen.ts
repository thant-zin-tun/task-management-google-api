/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as SignupImport } from "./routes/signup";
import { Route as SigninImport } from "./routes/signin";
import { Route as IndexImport } from "./routes/index";
import { Route as TasksIndexImport } from "./routes/tasks/index";
import { Route as TasksIdImport } from "./routes/tasks/$id";
import { Route as TasksUpdateIndexImport } from "./routes/tasks/update/index";

// Create/Update Routes

const SignupRoute = SignupImport.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => rootRoute,
} as any);

const SigninRoute = SigninImport.update({
  id: "/signin",
  path: "/signin",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const TasksIndexRoute = TasksIndexImport.update({
  id: "/tasks/",
  path: "/tasks/",
  getParentRoute: () => rootRoute,
} as any);

const TasksIdRoute = TasksIdImport.update({
  id: "/tasks/$id",
  path: "/tasks/$id",
  getParentRoute: () => rootRoute,
} as any);

const TasksUpdateIndexRoute = TasksUpdateIndexImport.update({
  id: "/tasks/update/",
  path: "/tasks/update/",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/signin": {
      id: "/signin";
      path: "/signin";
      fullPath: "/signin";
      preLoaderRoute: typeof SigninImport;
      parentRoute: typeof rootRoute;
    };
    "/signup": {
      id: "/signup";
      path: "/signup";
      fullPath: "/signup";
      preLoaderRoute: typeof SignupImport;
      parentRoute: typeof rootRoute;
    };
    "/tasks/$id": {
      id: "/tasks/$id";
      path: "/tasks/$id";
      fullPath: "/tasks/$id";
      preLoaderRoute: typeof TasksIdImport;
      parentRoute: typeof rootRoute;
    };
    "/tasks/": {
      id: "/tasks/";
      path: "/tasks";
      fullPath: "/tasks";
      preLoaderRoute: typeof TasksIndexImport;
      parentRoute: typeof rootRoute;
    };
    "/tasks/update/": {
      id: "/tasks/update/";
      path: "/tasks/update";
      fullPath: "/tasks/update";
      preLoaderRoute: typeof TasksUpdateIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/signin": typeof SigninRoute;
  "/signup": typeof SignupRoute;
  "/tasks/$id": typeof TasksIdRoute;
  "/tasks": typeof TasksIndexRoute;
  "/tasks/update": typeof TasksUpdateIndexRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/signin": typeof SigninRoute;
  "/signup": typeof SignupRoute;
  "/tasks/$id": typeof TasksIdRoute;
  "/tasks": typeof TasksIndexRoute;
  "/tasks/update": typeof TasksUpdateIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/signin": typeof SigninRoute;
  "/signup": typeof SignupRoute;
  "/tasks/$id": typeof TasksIdRoute;
  "/tasks/": typeof TasksIndexRoute;
  "/tasks/update/": typeof TasksUpdateIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | "/signin"
    | "/signup"
    | "/tasks/$id"
    | "/tasks"
    | "/tasks/update";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/signin" | "/signup" | "/tasks/$id" | "/tasks" | "/tasks/update";
  id:
    | "__root__"
    | "/"
    | "/signin"
    | "/signup"
    | "/tasks/$id"
    | "/tasks/"
    | "/tasks/update/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  SigninRoute: typeof SigninRoute;
  SignupRoute: typeof SignupRoute;
  TasksIdRoute: typeof TasksIdRoute;
  TasksIndexRoute: typeof TasksIndexRoute;
  TasksUpdateIndexRoute: typeof TasksUpdateIndexRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SigninRoute: SigninRoute,
  SignupRoute: SignupRoute,
  TasksIdRoute: TasksIdRoute,
  TasksIndexRoute: TasksIndexRoute,
  TasksUpdateIndexRoute: TasksUpdateIndexRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/signin",
        "/signup",
        "/tasks/$id",
        "/tasks/",
        "/tasks/update/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/signin": {
      "filePath": "signin.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/tasks/$id": {
      "filePath": "tasks/$id.tsx"
    },
    "/tasks/": {
      "filePath": "tasks/index.tsx"
    },
    "/tasks/update/": {
      "filePath": "tasks/update/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
