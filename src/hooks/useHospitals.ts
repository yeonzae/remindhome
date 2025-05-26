
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Hospital = Tables<"hospitals">;

export const useHospitals = (filters?: {
  specialty?: string;
  dementiaSpecialist?: boolean;
}) => {
  return useQuery({
    queryKey: ["hospitals", filters],
    queryFn: async () => {
      let query = supabase.from("hospitals").select("*");
      
      if (filters?.specialty && filters.specialty !== "all") {
        if (filters.specialty === "dementia-doctor") {
          query = query.eq("dementia_specialist", true);
        } else if (filters.specialty === "neurology") {
          query = query.ilike("specialty", "%신경과%");
        } else if (filters.specialty === "psychiatry") {
          query = query.ilike("specialty", "%정신건강의학과%");
        }
      }
      
      const { data, error } = await query.order("name");
      
      if (error) {
        console.error("Error fetching hospitals:", error);
        throw error;
      }
      
      return data as Hospital[];
    },
  });
};
