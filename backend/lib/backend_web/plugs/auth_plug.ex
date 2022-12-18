defmodule BackendWeb.AuthPlug do
  import Plug.Conn

  alias BackendWeb.Token
  alias Phoenix.Controller

  @header_key "authorization"

  def init(opts), do: opts

  def call(conn, _) do
    with ["Bearer " <> token] <- get_req_header(conn, @header_key),
         {:ok, email} <- Token.verify(token) do
      assign(conn, :email, email)
    else
      _ -> handle_error(conn)
    end
  end

  defp handle_error(conn) do
    conn
    |> put_status(:unauthorized)
    |> Controller.put_view(BackendWeb.ErrorView)
    |> Controller.render("401.json")
    |> halt()
  end
end
