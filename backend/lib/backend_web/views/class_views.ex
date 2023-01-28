defmodule BackendWeb.ClassView do
  use BackendWeb, :view

  def render("get_class.json", %{class: class}) do
    %{
      id: class.id,
      description: class.description,
      responsable: class.responsable.name,
      responsable_id: class.responsable.id,
      starting_hour: class.starting_hour,
      type: class.type,
      warnings:
        Enum.map(class.warns, fn warning ->
          %{
            title: warning.title,
            description: warning.description,
            author: warning.user.name,
            date:
              NaiveDateTime.to_string(
                warning.inserted_at
                |> DateTime.add(-3, :hour)
                |> DateTime.to_naive()
              )
          }
        end),
      checkins:
        Enum.map(class.checkins, fn checkin ->
          %{
            student: checkin.user.name,
            date:
              NaiveDateTime.to_string(
                checkin.inserted_at
                |> DateTime.add(-3, :hour)
                |> DateTime.to_naive()
              )
          }
        end),
      students: Enum.map(class.students, fn student -> student.name end),
      frequency: class.frequency
    }
  end

  def render("get_all_classes.json", %{classes: classes}) do
    Enum.map(classes, fn class ->
      %{
        id: class.id,
        description: class.description,
        responsable: class.responsable.name,
        responsable_id: class.responsable.id,
        starting_hour: class.starting_hour,
        type: class.type,
        warnings:
          Enum.map(class.warns, fn warning ->
            %{
              title: warning.title,
              description: warning.description,
              author: warning.user.name,
              date:
                NaiveDateTime.to_string(
                  warning.inserted_at
                  |> DateTime.add(-3, :hour)
                  |> DateTime.to_naive()
                )
            }
          end),
        checkins:
          Enum.map(class.checkins, fn checkin ->
            %{
              student: checkin.user.name,
              date:
                NaiveDateTime.to_string(
                  checkin.inserted_at
                  |> DateTime.add(-3, :hour)
                  |> DateTime.to_naive()
                )
            }
          end),
        students: Enum.map(class.students, fn student -> student.name end),
        frequency: class.frequency
      }
    end)
  end

  def render("create_warning.json", %{message: message}), do: %{message: message}
end
