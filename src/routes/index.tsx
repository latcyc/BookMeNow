import FirstScreen from "../pages/FirstScreen";


export interface routeInterface {
    path: string;
    name: string;
    header?: string;
    exact?: boolean;
    component?: any;
    breadcrumb?: Record<string, string>[];
    children?: Array<routeInterface>;
}

const firstScreen: routeInterface = {
    path: "/",
    name: "",
    header: "",
    component: FirstScreen,
};

export const screens: Array<routeInterface> = [
    firstScreen
];

export const page404Route: Array<routeInterface> = [];
