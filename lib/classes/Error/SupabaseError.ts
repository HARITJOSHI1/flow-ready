class SupabaseError extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: Record<string, any>,
    public name: string = "SupabaseError"
  ) {
    super(message);
  }

  public static isSupabaseError(error: any): boolean {
    return (
      error?.message &&
      (error.message.includes("JWT") ||
        error.message.includes("RLS") ||
        error.message.includes("permission") ||
        error?.code === "PGRST")
    );
  }

  private static handleSupabaseError(error: any) {
    const message = error.message?.toLowerCase() || "";

    if (message.includes("jwt") || message.includes("token")) {
      return {
        code: "AUTH_TOKEN_INVALID",
        message: "Authentication token is invalid or expired",
        statusCode: 401,
      };
    }

    if (
      message.includes("rls") ||
      message.includes("policy") ||
      message.includes("permission")
    ) {
      return {
        code: "INSUFFICIENT_PERMISSIONS",
        message: "You do not have permission to perform this action",
        statusCode: 403,
      };
    }

    return {
      code: "SUPABASE_ERROR",
      message: error.message || "Supabase service error",
      statusCode: 500,
    };
  }
}
