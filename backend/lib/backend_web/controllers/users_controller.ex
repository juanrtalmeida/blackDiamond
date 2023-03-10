defmodule BackendWeb.UsersController do
  use BackendWeb, :controller
  alias Backend.Repo
  alias Backend.Models.User
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
    email = conn.assigns[:user_info].email

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
    email = conn.assigns[:user_info].email
    user = Infos.infos(email) |> Repo.preload([:classes, [:checkins, checkins: [:class]]])
    IO.inspect(user)

    conn
    |> put_status(:accepted)
    |> render("infos.json", user: user)
  end

  def admin_infos(conn, params) do
    user =
      Repo.get_by(User, id: params["id"])
      |> Repo.preload([:classes, :month_payments, [:checkins, checkins: [:class]]])

    conn
    |> put_status(:accepted)
    |> render("infos_admin.json", user: user)
  end
end
