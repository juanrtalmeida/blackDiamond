defmodule BackendWeb.ClassController do
  use BackendWeb, :controller
  alias Backend.Models.{Class}
  alias Backend.Class.{Create, Add, Checkin, Warning}
  alias Phoenix.Controller
  alias Backend.Repo

  def handle_creation(conn, params) do
    with {:ok, _} <- Create.call(params) do
      conn
      |> put_status(:created)
      |> json(%{message: "Turma criada com sucesso"})
    else
      :error ->
        conn
        |> put_status(:bad_request)
        |> Controller.put_view(BackendWeb.ErrorView)
        |> Controller.render("401.json")
    end
  end

  def add_student(conn, params) do
    with {:ok, _} <- Add.call(params) do
      conn
      |> put_status(:created)
      |> json(%{message: "Aluno adicionado com sucesso"})
    else
      :error ->
        conn
        |> put_status(:bad_request)
        |> Controller.put_view(BackendWeb.ErrorView)
        |> Controller.render("401.json")
    end
  end

  def get_class(conn, params) do
    class = Repo.get_by(Class, id: params["id"])

    classes =
      class
      |> Repo.preload([
        [:students, students: [:month_payments]],
        :responsable,
        [:warns, warns: [:user]],
        [:checkins, checkins: [:user]]
      ])

    conn
    |> put_status(:ok)
    |> render("get_class.json", class: classes)
  end

  def get_all_classes(conn, _params) do
    classes = Repo.all(Class)

    loaded_classes =
      classes
      |> Repo.preload([
        [:students, students: [:month_payments]],
        :responsable,
        [:warns, warns: [:user]],
        [:checkins, checkins: [:user]]
      ])

    conn
    |> put_status(:ok)
    |> render("get_all_classes.json", classes: loaded_classes)
  end

  def checkin(conn, params) do
    with {:ok, _} <- Checkin.call(params |> Map.put("user_id", conn.assigns[:user_id])) do
      conn
      |> put_status(:created)
      |> json(%{message: "Checkin realizado com sucesso"})
    else
      :error ->
        conn
        |> put_status(:bad_request)
        |> Controller.put_view(BackendWeb.ErrorView)
        |> Controller.render("401.json")
    end
  end

  def create_warning(conn, params) do
    with :ok <- Warning.call(params |> Map.put("user_id", conn.assigns[:user_info].id)) do
      IO.inspect(conn.assigns[:user_info].id)

      conn
      |> put_status(:created)
      |> render("create_warning.json", message: "Aviso criado com sucesso")
    else
      :error ->
        conn
        |> put_status(:bad_request)
        |> Controller.put_view(BackendWeb.ErrorView)
        |> Controller.render("400.json")
    end
  end
end