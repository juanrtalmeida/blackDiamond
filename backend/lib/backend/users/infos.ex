defmodule Backend.Users.Infos do
  alias Backend.{Repo}
  alias Backend.Models.User

  def infos(email) do
    Repo.get_by!(User, email: email)
  end
end
