export interface Param {
    name: string;
    type: string;
    required: boolean;
  }
  
  export interface Api {
    name: string;
    endpoint: string;
    method: string;
    requiresAuth: boolean;
    params?: Param[];
  }
  
  export interface ApiCategory {
    category: string;
    apis: Api[];
  }
  
  export interface ApiData {
    domain: string;
    categories: ApiCategory[];
  }
  