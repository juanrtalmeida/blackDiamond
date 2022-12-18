defmodule BackendWeb.Token do
  alias Phoenix.Token

  @salt "be_salted"

  def create(email) do
    Token.sign(BackendWeb.Endpoint, @salt, email)
  end

  def verify(token) do
    case Token.verify(BackendWeb.Endpoint, @salt, token, max_age: 86400) do
      {:ok, _} = response -> response
      _ -> {:error, :unauthorized}
    end
  end
end
