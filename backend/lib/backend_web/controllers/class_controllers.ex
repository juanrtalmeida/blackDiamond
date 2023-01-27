defmodule BackendWeb.ClassController do
  use BackendWeb, :controller
  alias Backend.Models.Class
  alias Backend.Class.{Create, Add}
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
      |> Repo.preload([:students, :responsable])

    conn
    |> put_status(:ok)
    |> render("get_class.json", class: classes)
  end
end
