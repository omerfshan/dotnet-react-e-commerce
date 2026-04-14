import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// useDispatch yerine bunu kullan → dispatch tip güvenli olur
export const useAppDispatch = () => useDispatch<AppDispatch>();

// useSelector yerine bunu kullan → state otomatik RootState tipinde olur
export const useAppSelector = useSelector.withTypes<RootState>();