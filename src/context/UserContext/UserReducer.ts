import { UseAction, UserContextState, USER_CONTEXT_ACTIONS } from "./types";

export const userReducer = (state: UserContextState, action: UseAction) => {
  switch (action.type) {
    case USER_CONTEXT_ACTIONS.USER_PROFILE:
      return { ...state, userProfile: action?.payload };
  }
};
