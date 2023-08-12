import React, { useReducer, createContext, useMemo, useCallback, useContext, ReactNode, Reducer } from "react";
import userService from "../../apis/services/userService";
import { clearStorage,retrieveData, STORAGE_CONSTANT  } from "../../helpers/storageHelpers";
import { restartApp } from "../../utils/layout/layout.utils";
import {
  UseAction,
  UserContextFunctions,
  UserContextProviderProps,
  UserContextState,
  UserFunctions,
  UserProfile,
  USER_CONTEXT_ACTIONS,
} from "./types";
import { userReducer } from "./UserReducer";

const initialState: UserContextState = { userProfile: {} };

export const UserContext = createContext<UserContextState & UserContextFunctions>({
  ...initialState,
  ...UserFunctions,
});

const UserContextProvider = ({ children }: UserContextProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer<UserContextState, UseAction>>(userReducer, initialState);

  const { userProfile } = state;

  const setUSerProfile = useCallback((userProfile: UserProfile) => {
    dispatch({ type: USER_CONTEXT_ACTIONS.USER_PROFILE, payload: userProfile });
  }, []);
  const fetchUserProfile = useCallback(async (): Promise<UserProfile | undefined | null> => {
    try {
      const agentId = await retrieveData(STORAGE_CONSTANT.AGENT_ID);
      if (!agentId) {
        return undefined;
      }
      const userProfile = await userService.fetchAgentUserProfile(agentId);
      setUSerProfile(userProfile[0]);
      return userProfile[0];
    } catch (e) {}
  }, []);

  const afterLoginSuccess = useCallback(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const afterLogout = useCallback(async () => {
    console.log("coming here .in log iuyt ")
    await clearStorage();
    restartApp();
  }, []);

  return (
    <UserContext.Provider value={{ userProfile, setUSerProfile, afterLogout, afterLoginSuccess, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext<UserContextState & UserContextFunctions>(UserContext);
};

export default UserContextProvider;
