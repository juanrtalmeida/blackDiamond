defmodule BackendWeb.AdminPlug do
  import Plug.Conn
  alias Backend.Repo
  alias Phoenix.Controller
  alias Backend.Models.User

  def init(opts), do: opts

  def call(conn, _) do
    with {:ok} <- search_permissions(conn.assigns.email) do
      conn
    else
      _ -> handle_error(conn)
    end
  end

  defp search_permissions(email) do
    user = Repo.get_by!(User, email: email)

    case user.privilages do
      :admin -> {:ok}
      :owner -> {:ok}
      _ -> {:fail}
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
