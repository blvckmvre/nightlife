import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../store/store";

export const useTypeDispatch = () => useDispatch<DispatchType>();
export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;