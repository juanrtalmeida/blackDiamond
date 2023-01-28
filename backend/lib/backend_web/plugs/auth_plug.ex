defmodule BackendWeb.AuthPlug do
  import Plug.Conn

  alias BackendWeb.Token
  alias Phoenix.Controller
  alias Backend.Repo
  alias Backend.Models.User

  @header_key "authorization"

  def init(opts), do: opts

  def call(conn, _) do
    with ["Bearer " <> token] <- get_req_header(conn, @header_key),
         {:ok, email} <- Token.verify(token) do
      assign(conn, :user_info, %{email: email, id: Repo.get_by(User, email: email).id})
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
