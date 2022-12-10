import { supabase } from "./DBClient";

export class HealthCare {
  static async create(userID, metadata) {
    const { data, error } = await supabase
      .from("health_care")
      .insert([{ user: userID, data: metadata }]);
    return data;
  }

  static async getByID(ID) {
    const { data, error } = await supabase
      .from("health_care")
      .select(
        "*, user_meta:user_data!health_care_user_fkey(meta), physician_meta:user_data!health_care_physician_fkey(meta)"
      )
      .eq("id", ID);
    if (error) {
      console.error(error);
      return false;
    }
    return data;
  }

  static async getFromMe(userID) {
    const { data, error } = await supabase
      .from("health_care")
      .select(
        "*, user_meta:user_data!health_care_user_fkey(meta), physician_meta:user_data!health_care_physician_fkey(meta)"
      )
      .eq("user", userID);
    if (error) {
      console.error(error);
      return false;
    }
    return data;
  }

  static async getFromPatients(userID) {
    const { data, error } = await supabase
      .from("health_care")
      .select(
        "*, user_meta:user_data!health_care_user_fkey(meta), physician_meta:user_data!health_care_physician_fkey(meta)"
      )
      .or(`physician.eq.${userID}, physician.is.null`);
    if (error) {
      console.error(error);
      return false;
    }

    return data;
  }

  static async assignPhysician(healthCareID, physicianID) {
    const { data, error } = await supabase
      .from("health_care")
      .update({ physician: physicianID })
      .eq("id", healthCareID);
    if (error) {
      console.error(error);
      return false;
    }
    return data;
  }
}
