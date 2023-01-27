defmodule Backend.Class.Add do
  alias Backend.Models.{ClassStudent}
  alias Backend.Repo

  def call(params) do
    params
    |> ClassStudent.create_changeset()
    |> Repo.insert()
  end
end
