defmodule BackendWeb.ClassView do
  use BackendWeb, :view

  def render("get_class.json", %{class: class}) do
    IO.inspect(class)

    %{
      id: class.id,
      description: class.description,
      responsable: class.responsable.name,
      responsable_id: class.responsable.id,
      starting_hour: class.starting_hour,
      type: class.type,
      students: Enum.map(class.students, fn student -> student.name end),
      frequency: class.frequency
    }
  end
end
