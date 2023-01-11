defmodule BackendWeb.ProfessorController do
  use BackendWeb, :controller
  alias Backend.Users.Create

  def create(conn, params) do
    with {:ok, _} <- Create.call(params, "professor") do
      conn
      |> put_status(:created)
      |> render("professor_created.json", %{message: "Professor created"})
    else
      %{result: error, status: _} ->
        IO.inspect(error)

        conn
        |> put_status(:bad_request)
        |> render("error.json", %{message: "Professor not created", error: error})
    end
  end
end
