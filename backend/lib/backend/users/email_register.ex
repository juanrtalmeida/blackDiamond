defmodule Backend.Users.EmailRegister do
  use Bamboo.Template, view: BackendWeb.View
  alias Backend.Mailer
  import Bamboo.Email

  def send(user) do
    user
    |> email_creation()
    |> Mailer.deliver_later()
  end

  defp email_creation(user) do
    new_email
    |> to(user.email)
    |> from("OwariRagServer@owari.com.br")
    |> subject("Your new Account")
    |> put_html_layout({BackendWeb.LayoutView, "email.html"})
    |> assign(:validation_number, user.validation_number)
    |> assign(:name, user.name)
    |> render("validation.html")
  end
end
