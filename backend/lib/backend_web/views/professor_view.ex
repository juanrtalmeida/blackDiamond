defmodule BackendWeb.ProfessorView do
  use BackendWeb, :view

  def render("professor_created.json", %{message: message}),
    do: %{message: message}

  def render("error.json", %{message: message, error: error}), do: ''
end
