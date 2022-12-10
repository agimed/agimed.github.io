import { supabase } from "./DBClient";

export class Message {
  static async send(user, health_care, metadata) {
    const { data, error } = await supabase.from("message").insert([
      {
        user,
        health_care,
        metadata,
      },
    ]);
    return data;
  }

  static async getMessages(user, health_care) {
    const { data, error } = await supabase
      .from("message")
      .select("*, user_data(meta->nomeCompleto)")
      .eq("health_care", health_care)
      .order("id", { ascending: true });
    return data;
  }
}
