import { supabase } from "./DBClient";

export class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.user = null;
    this.session = null;
  }

  async register(metadata) {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signUp({
      email: this.username,
      password: this.password,
    });

    if (error) {
      console.log(error);
      return false;
    }
    this.user = user;
    this.session = session;
    console.log({ user, session, error });
    this.addMetadata(metadata);

    return { user, session };
  }

  async addMetadata(metadata) {
    const { data, error } = await supabase.from("user_data").insert([
      {
        user: this.user.id,
        meta: metadata,
      },
    ]);
  }

  static async getMetadata() {
    try {
      const { data, error } = await supabase
        .from("user_data")
        .select("*")
        .eq("user", this.user.id);
      return data[0].meta;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  }

  static async getUser() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      this.user = user;
      return {
        user: this.user,
        meta: await this.getMetadata(),
      };
    } catch (ex) {
      console.error(ex);
      return {
        user: null,
        meta: null,
      };
    }
  }

  static async getUserID() {
    const user = this.getUser();
    return user.id;
  }

  async login() {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: this.username,
      password: this.password,
    });

    if (error) {
      return false;
    }
    return { user, session };
  }
}
