export * from "./config";
import { PostgrestError } from "@supabase/supabase-js";

export interface ResponseActionType {
  success: boolean;
  data?: any;
  error?: PostgrestError;
}
