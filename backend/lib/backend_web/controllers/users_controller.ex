defmodule BackendWeb.UsersController do
  use BackendWeb, :controller

  alias Backend.Users.{Create, Login, Infos, EmailRegister, Validation}
  alias BackendWeb.{Token}

  def create(conn, params) do
    with {:ok, user} <- Create.call(params) do
      EmailRegister.send(user)

      conn
      |> put_status(:created)
      |> render("create.json", user: user)
    end
  end

  def login(conn, params) do
    case Login.call(params) do
      {:ok, email} ->
        conn
        |> put_status(:accepted)
        |> put_resp_header("token", Token.create(email))
        |> render("login.json", %{})

      {:fail} ->
        conn
        |> put_status(:not_acceptable)
        |> render(:password_wrong, %{})
    end
  end

  def validation(conn, params) do
    email = conn.assigns[:email]

    with {:ok} <- Validation.call(params, email) do
      conn
      |> put_status(:accepted)
      |> render("validation_accepted.json", %{})
    else
      {:fail} ->
        conn
        |> put_status(:not_acceptable)
        |> render("validation_fail.json", %{})
    end
  end

  def infos(conn, _) do
    email = conn.assigns[:email]
    user = Infos.infos(email)

    conn
    |> put_status(:accepted)
    |> render("infos.json", user: user)
  end
end
