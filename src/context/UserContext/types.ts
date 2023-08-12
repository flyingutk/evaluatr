export interface UserContextProviderProps {
    children: React.ReactNode;
  }
  
  export interface UserContextState {
    userProfile: UserProfile | {};
  }
  export const UserFunctions = {
    setUSerProfile: (userProfile: UserProfile) => {},
    afterLogout: () => {
    },
    afterLoginSuccess: () => {},
    fetchUserProfile: () => Promise<UserProfile | undefined | null>,
  };
  
  export type UserContextFunctions = typeof UserFunctions;
  
  export enum USER_CONTEXT_ACTIONS {
    USER_PROFILE = "USER_PROFILE",
  }
  
  export interface UseAction {
    type: USER_CONTEXT_ACTIONS;
    payload: any;
  }
  export type UserProfile = {
    id: number;
    created_on?: string;
    last_updated_on?: string;
    created_by?: string;
    last_updated_by?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    gender?: string;
    phone: string;
    agent_role?: string;
    fk_user?: number;
  };
  