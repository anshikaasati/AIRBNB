"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { OverlayState, OverlayView } from "../types/listing";

type OverlayAction =
  | { type: "OPEN"; view: OverlayView; index?: number; returnTo?: OverlayView | null }
  | { type: "CLOSE" }
  | { type: "SET_INDEX"; index: number };

const initialState: OverlayState = {
  view: "none",
  activePhotoIndex: 0,
  returnTo: null,
};

const OverlayContext = createContext<{
  state: OverlayState;
  openOverlay: (view: OverlayView, index?: number, returnTo?: OverlayView | null) => void;
  closeOverlay: () => void;
  setPhotoIndex: (index: number) => void;
} | undefined>(undefined);

function overlayReducer(state: OverlayState, action: OverlayAction): OverlayState {
  switch (action.type) {
    case "OPEN":
      return {
        view: action.view,
        activePhotoIndex: action.index !== undefined ? action.index : state.activePhotoIndex,
        returnTo: action.returnTo !== undefined ? action.returnTo : null,
      };
    case "CLOSE":
      if (state.view === "lightbox" && state.returnTo === "photoTour") {
        return {
          view: "photoTour",
          activePhotoIndex: state.activePhotoIndex,
          returnTo: null,
        };
      }
      return {
        view: "none",
        activePhotoIndex: 0,
        returnTo: null,
      };
    case "SET_INDEX":
      return {
        ...state,
        activePhotoIndex: action.index,
      };
    default:
      return state;
  }
}

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(overlayReducer, initialState);

  const openOverlay = (view: OverlayView, index?: number, returnTo?: OverlayView | null) => {
    dispatch({ type: "OPEN", view, index, returnTo });
  };

  const closeOverlay = () => {
    dispatch({ type: "CLOSE" });
  };

  const setPhotoIndex = (index: number) => {
    dispatch({ type: "SET_INDEX", index });
  };

  return (
    <OverlayContext.Provider value={{ state, openOverlay, closeOverlay, setPhotoIndex }}>
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
}
