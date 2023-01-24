defmodule MyApp.ClassStudent do
  use Ecto.Schema

  @timestamps_opts [type: :utc_datetime]
  schema "class_student" do
    belongs_to :student, Backend.Models.User
    belongs_to :class, Backend.Models.Class
    timestamps()
  end
end
